import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const RESEND_FROM = "Nearly Naked Soapery <onboarding@resend.dev>"
const RESEND_TO = "nancygrisel@gmail.com"
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null
const isDev = process.env.NODE_ENV !== "production"
const requestLog = new Map<string, number[]>()

type ContactPayload = {
    firstName?: unknown
    email?: unknown
    message?: unknown
    website?: unknown // honeypot
}

function escapeHtml(input: string) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

function normalizeNewlines(value: string) {
    return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
}

function toClientId(request: NextRequest) {
    const forwarded = request.headers.get("x-forwarded-for")
    if (forwarded) {
        const [ip] = forwarded.split(",").map(part => part.trim())
        if (ip) return ip
    }
    const realIp = request.headers.get("x-real-ip")
    if (realIp) return realIp
    return "unknown"
}

function isRateLimited(id: string) {
    const now = Date.now()
    const windowStart = now - RATE_WINDOW_MS
    const timestamps = requestLog.get(id)?.filter(ts => ts > windowStart) ?? []

    if (timestamps.length >= RATE_LIMIT) {
        requestLog.set(id, timestamps)
        return true
    }

    timestamps.push(now)
    requestLog.set(id, timestamps)
    return false
}

function validatePayload(body: ContactPayload) {
    const errors: string[] = []
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""
    const honeypot = typeof body.website === "string" ? body.website.trim() : ""

    if (!firstName) errors.push("First name is required.")
    if (firstName.length > 80) errors.push("First name is too long.")

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailPattern.test(email)) errors.push("Valid email is required.")
    if (email.length > 254) errors.push("Email is too long.")

    if (!message) errors.push("Message is required.")
    if (message.length > 2000) errors.push("Message is too long.")

    if (honeypot) errors.push("Invalid submission.")

    return {
        errors,
        firstName,
        email,
        message,
        honeypot,
    }
}

function buildEmailHtml(firstName: string, email: string, message: string) {
    const safeName = escapeHtml(firstName)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(normalizeNewlines(message)).replace(/\n/g, "<br />")

    return `
      <div style="font-family: Arial, sans-serif; color: #0f172a;">
        <h2>New contact request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `
}

export async function POST(request: NextRequest) {
    const clientId = toClientId(request)

    if (isRateLimited(clientId)) {
        return NextResponse.json({ error: "Too many requests. Please try again soon." }, { status: 429 })
    }

    let body: ContactPayload = {}
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
    }

    const { errors, firstName, email, message } = validatePayload(body)
    if (errors.length) {
        return NextResponse.json({ error: errors.join(" ") }, { status: 400 })
    }

    const html = buildEmailHtml(firstName, email, message)
    const emailPayload = {
        from: RESEND_FROM,
        to: RESEND_TO,
        subject: `New contact from ${firstName}`,
        html,
        reply_to: email,
    }

    if (isDev) {
        console.info("[contact] dev preview email", emailPayload)
        return NextResponse.json({ ok: true, preview: true })
    }

    if (!resend) {
        return NextResponse.json({ error: "Email service not configured." }, { status: 500 })
    }

    try {
        const result = await resend.emails.send(emailPayload)
        if (result.error) {
            console.error("[contact] resend error", result.error)
            return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error("[contact] unexpected error", error)
        return NextResponse.json({ error: "Unexpected error sending email." }, { status: 500 })
    }
}

