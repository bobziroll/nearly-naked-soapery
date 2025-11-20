"use client"

import { cn } from "@/lib/utils"

type FilterListProps = {
    items: string[]
    layout?: "horizontal" | "vertical"
    className?: string
}

export default function FilterList({
    items,
    layout = "horizontal",
    className,
}: FilterListProps) {
    if (items.length === 0) {
        return null
    }

    return (
        <div
            className={cn(
                "flex w-full max-w-4xl flex-wrap gap-3",
                layout === "vertical" && "flex-col",
                className
            )}
        >
            {items.map(item => (
                <button
                    key={item}
                    type="button"
                    className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                >
                    {item}
                </button>
            ))}
        </div>
    )
}

