"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormState = {
    firstName: string
    email: string
    message: string
    website: string // honeypot
}

const initialState: FormState = {
    firstName: "",
    email: "",
    message: "",
    website: "",
}

export default function ContactPage() {
    const [form, setForm] = useState<FormState>(initialState)
    const [status, setStatus] = useState<
        "idle" | "pending" | "success" | "error"
    >("idle")
    const [error, setError] = useState<string>("")

    const isSubmitting = status === "pending"

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus("pending")
        setError("")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await response.json().catch(() => null)

            if (!response.ok) {
                setStatus("error")
                setError(
                    data?.error ??
                        "Unable to send your message. Please try again."
                )
                return
            }

            setStatus("success")
            setForm(initialState)
        } catch (err) {
            console.error("[contact form] submit error", err)
            setStatus("error")
            setError("Something went wrong. Please try again.")
        }
    }

    function updateField<K extends keyof FormState>(
        key: K,
        value: FormState[K]
    ) {
        setForm(prev => ({ ...prev, [key]: value }))
        if (status === "success") {
            setStatus("idle")
        }
    }

    return (
        <main className="mx-auto flex max-w-5xl flex-col px-4 py-12">
            <div className="max-w-2xl space-y-3">
                <h1 className="text-3xl font-semibold">Get in touch</h1>
                <p className="text-muted-foreground">
                    I run this business out of my living room in South Jordan,
                    UT, which is where my "storefront" is. If you're interested
                    in stopping by to check out what I have to offer, please
                    send me a message via the form below with a short note.
                    This sends me an email directly, and I can get in touch with
                    you from there to get you my details!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid max-w-xl gap-5">
                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="firstName">
                        First name
                    </label>
                    <Input
                        id="firstName"
                        name="firstName"
                        required
                        maxLength={80}
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={event =>
                            updateField("firstName", event.target.value)
                        }
                        aria-invalid={status === "error" && !!error}
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="email">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        value={form.email}
                        onChange={event =>
                            updateField("email", event.target.value)
                        }
                        aria-invalid={status === "error" && !!error}
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="message">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        required
                        maxLength={2000}
                        rows={5}
                        value={form.message}
                        onChange={event =>
                            updateField("message", event.target.value)
                        }
                        aria-invalid={status === "error" && !!error}
                    />
                </div>

                <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={event =>
                            updateField("website", event.target.value)
                        }
                        aria-hidden="true"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send message"}
                    </Button>
                    {status === "success" && (
                        <span className="text-sm text-green-600">
                            Message sent. We&apos;ll be in touch soon.
                        </span>
                    )}
                    {status === "error" && (
                        <span className="text-sm text-destructive" role="alert">
                            {error}
                        </span>
                    )}
                </div>
            </form>
        </main>
    )
}
