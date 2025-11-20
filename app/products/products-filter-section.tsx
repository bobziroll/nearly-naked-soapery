"use client"

import { useState } from "react"

import ProductViewToggle, { type ToggleOption } from "./product-view-toggle"
import FilterList from "./filter-list"

type ProductsFilterSectionProps = {
    productTypes: string[]
    productNames: string[]
}

export default function ProductsFilterSection({
    productTypes,
    productNames,
}: ProductsFilterSectionProps) {
    const [active, setActive] = useState<ToggleOption>("Products")

    return (
        <div className="flex w-full flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                    Browse by:
                </p>
                <ProductViewToggle active={active} onChange={setActive} />
            </div>

            {active === "Products" && (
                <FilterList items={productTypes} layout="horizontal" />
            )}

            {active === "Collections" && (
                <FilterList items={productNames} layout="horizontal" />
            )}
        </div>
    )
}

