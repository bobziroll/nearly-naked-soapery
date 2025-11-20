import type { FieldSet } from "airtable"
import { Suspense } from "react"
import { cacheLife } from "next/cache"
import Image from "next/image"

import ProductsFilterSection from "./products-filter-section"
import { fetchAirtableRecords } from "@/lib/controllers/airtableRecords"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"

type ProductFields = FieldSet & {
    [PRODUCT_FIELDS.PRODUCT_NAME]?: string
    [PRODUCT_FIELDS.PRODUCT_TYPE]?: string
    [PRODUCT_FIELDS.PRICE]?: number
    [PRODUCT_FIELDS.DESCRIPTION]?: string
    [PRODUCT_FIELDS.SCENT_NOTES]?: string[]
    [PRODUCT_FIELDS.IMAGES]?: Array<{ url: string }>
    [PRODUCT_FIELDS.NAKED]?: boolean
}

async function loadProducts() {
    "use cache"

    cacheLife({
        stale: 0,
        revalidate: 60,
        expire: 120,
    })

    const records = await fetchAirtableRecords<ProductFields>({
        tableName: "Products",
        view: "All Products",
        returnFieldsByFieldId: true,
    })

    return records.map(record => ({
        id: record.id,
        fields: record.fields,
    }))
}

async function ProductsFilterWrapper() {
    const products = await loadProducts()

    // Extract unique Product Types
    const productTypes = Array.from(
        new Set(
            products
                .map(p => p.fields[PRODUCT_FIELDS.PRODUCT_TYPE])
                .filter((type): type is string => typeof type === "string")
        )
    ).sort()

    // Extract unique Product Names
    const productNames = Array.from(
        new Set(
            products
                .map(p => p.fields[PRODUCT_FIELDS.PRODUCT_NAME])
                .filter((name): name is string => typeof name === "string")
        )
    ).sort()

    return (
        <ProductsFilterSection
            productTypes={productTypes}
            productNames={productNames}
        />
    )
}

export default function ProductsPage() {
    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-8 px-4 pb-24 text-center">
            <Image
                src="/assets/products_header.png"
                alt="Products header"
                width={1200}
                height={800}
                className="w-full max-w-lg"
                priority
            />
            <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                    All Products
                </h1>
            </div>

            <Suspense
                fallback={
                    <div className="w-full max-w-4xl text-sm text-neutral-500">
                        Loading filters...
                    </div>
                }
            >
                <ProductsFilterWrapper />
            </Suspense>
        </main>
    )
}
