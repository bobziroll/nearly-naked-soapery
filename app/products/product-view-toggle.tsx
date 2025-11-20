"use client"

import { cn } from "@/lib/utils"

const OPTIONS = ["Products", "Collections"] as const

export type ToggleOption = (typeof OPTIONS)[number]

type ProductViewToggleProps = {
    active: ToggleOption
    onChange: (option: ToggleOption) => void
}

export default function ProductViewToggle({
    active,
    onChange,
}: ProductViewToggleProps) {

    return (
        <div className="relative w-full max-w-md rounded-full bg-[#f7f0e6] p-1 shadow-sm">
            <span
                className="pointer-events-none absolute top-1 bottom-1 w-[calc(50%-8px)] rounded-full bg-white shadow transition-[left] duration-300 ease-out"
                style={{ left: active === "Products" ? "4px" : "calc(50% + 4px)" }}
            />
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[#5c3b27]">
                {OPTIONS.map(option => (
                    <button
                        key={option}
                        type="button"
                        aria-pressed={active === option}
                        onClick={() => onChange(option)}
                        className={cn(
                            "relative z-10 flex cursor-pointer items-center justify-center rounded-full px-4 py-2 transition-colors",
                            active === option ? "text-[#3a2517]" : "text-[#8c6b4a]"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

