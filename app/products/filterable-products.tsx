"use client"

import { useMemo, useState, useTransition, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import FilterDropdown from "./filter-dropdown"
import ProductsGrid from "./products-grid"
import type { ProductRecord } from "./load-products"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"

type FilterableProductsProps = {
    products: ProductRecord[]
    productTypes: string[]
    productNames: string[]
}

function parseParamList(searchParams: URLSearchParams, key: string) {
    const raw = searchParams.getAll(key)
    if (raw.length === 0) return []
    return raw
        .flatMap(item => item.split(","))
        .map(v => v.trim())
        .filter(Boolean)
}

function setParamList(
    searchParams: URLSearchParams,
    key: string,
    values: string[]
) {
    searchParams.delete(key)
    if (values.length) {
        searchParams.set(key, values.join(","))
    }
}

export default function FilterableProducts({
    products,
    productTypes,
    productNames,
}: FilterableProductsProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedNames, setSelectedNames] = useState<string[]>([])

    // Hydrate from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        setSelectedTypes(parseParamList(params, "type"))
        setSelectedNames(parseParamList(params, "name"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateUrl = (types: string[], names: string[]) => {
        const params = new URLSearchParams(searchParams.toString())
        setParamList(params, "type", types)
        setParamList(params, "name", names)
        const qs = params.toString()
        startTransition(() => {
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        })
    }

    const toggleType = (value: string) => {
        setSelectedTypes(prev => {
            const next = prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
            updateUrl(next, selectedNames)
            return next
        })
    }

    const toggleName = (value: string) => {
        setSelectedNames(prev => {
            const next = prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
            updateUrl(selectedTypes, next)
            return next
        })
    }

    const clearFilters = () => {
        setSelectedTypes([])
        setSelectedNames([])
        updateUrl([], [])
    }

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const fields = product.fields
            const type = fields[PRODUCT_FIELDS.PRODUCT_TYPE]
            const name = fields[PRODUCT_FIELDS.PRODUCT_NAME]

            const typeMatch =
                selectedTypes.length === 0 ||
                (typeof type === "string" && selectedTypes.includes(type))

            const nameMatch =
                selectedNames.length === 0 ||
                (typeof name === "string" && selectedNames.includes(name))

            return typeMatch && nameMatch
        })
    }, [products, selectedNames, selectedTypes])

    return (
        <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                <div className="flex flex-wrap items-center gap-3">
                    <FilterDropdown
                        label="Products"
                        options={productTypes}
                        selected={selectedTypes}
                        onToggle={toggleType}
                    />
                    <FilterDropdown
                        label="Collections"
                        options={productNames}
                        selected={selectedNames}
                        onToggle={toggleName}
                    />
                </div>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-neutral-500 underline underline-offset-4 transition hover:text-neutral-800"
                >
                    Clear filters
                </button>
            </div>

            {isPending && (
                <p className="text-sm text-neutral-500">Updating filters…</p>
            )}

            <ProductsGrid products={filteredProducts} />
        </div>
    )
}

