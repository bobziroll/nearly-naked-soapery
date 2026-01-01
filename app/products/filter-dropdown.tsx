"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

type FilterDropdownProps = {
    label: string
    options: string[]
    selected: string[]
    onToggle: (value: string) => void
}

export default function FilterDropdown({
    label,
    options,
    selected,
    onToggle,
}: FilterDropdownProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300"
            >
                <span>{label}</span>
                {open ? (
                    <ChevronUp className="h-4 w-4 text-neutral-400" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                )}
            </button>

            {open && (
                <div className="absolute left-0 z-20 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl">
                    <div className="flex flex-wrap gap-2">
                        {options.map(option => {
                            const active = selected.includes(option)
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => onToggle(option)}
                                    className={cn(
                                        "rounded-full border px-3 py-1 text-xs font-medium transition",
                                        active
                                            ? "border-neutral-700 bg-neutral-900 text-white"
                                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                                    )}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

