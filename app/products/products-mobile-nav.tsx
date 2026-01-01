"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronsUpDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { slugifyProductType } from "@/lib/utils"

type ProductsMobileNavProps = {
    productTypes: string[]
}

export default function ProductsMobileNav({
    productTypes,
}: ProductsMobileNavProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const currentValue = useMemo(() => {
        if (pathname === "/products") return "all"
        if (pathname?.startsWith("/products/")) {
            return pathname.replace("/products/", "")
        }
        return "all"
    }, [pathname])

    const options = useMemo(
        () => [
            { label: "All Products", value: "all" },
            ...productTypes.map(type => ({
                label: type,
                value: slugifyProductType(type),
            })),
        ],
        [productTypes]
    )

    const handleSelect = (value: string) => {
        setOpen(false)
        if (value === "all") {
            router.push("/products")
            return
        }
        router.push(`/products/${value}`)
    }

    const currentLabel =
        options.find(option => option.value === currentValue)?.label ??
        "Select category"

    return (
        <div className="relative w-full md:hidden">
            <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-900 shadow-sm transition hover:border-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
            >
                <span>{currentLabel}</span>
                <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
                    {options.map(option => {
                        const isActive = option.value === currentValue
                        return (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    className={cn(
                                        "flex w-full items-center justify-between px-4 py-3 text-sm transition hover:bg-neutral-50 focus:outline-none focus-visible:bg-neutral-50",
                                        isActive
                                            ? "font-semibold text-neutral-900"
                                            : "text-neutral-700"
                                    )}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    <span>{option.label}</span>
                                    {isActive && (
                                        <Check className="h-4 w-4 text-neutral-600" />
                                    )}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}


