import { Suspense } from "react"
import { notFound } from "next/navigation"

import ProductsGrid from "../products-grid"
import { loadProducts } from "../load-products"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"
import { deslugifyProductType, slugifyProductType } from "@/lib/utils"

async function ProductTypeContent({
    paramsPromise,
}: {
    paramsPromise: Promise<{ "product-type": string }>
}) {
    const resolvedParams = await paramsPromise
    const productTypeSlug = resolvedParams["product-type"]
    const products = await loadProducts()

    // Derive title
    const matchingProduct = products.find(product => {
        const type = product.fields[PRODUCT_FIELDS.PRODUCT_TYPE]
        if (typeof type !== "string") return false
        return slugifyProductType(type) === productTypeSlug
    })
    const productType =
        matchingProduct?.fields[PRODUCT_FIELDS.PRODUCT_TYPE] ??
        deslugifyProductType(productTypeSlug)

    // Filter products by type
    const filteredProducts = products.filter(product => {
        const type = product.fields[PRODUCT_FIELDS.PRODUCT_TYPE]
        if (typeof type !== "string") return false
        return slugifyProductType(type) === productTypeSlug
    })

    if (filteredProducts.length === 0) {
        notFound()
    }

    return (
        <div className="flex w-full flex-col items-center gap-8">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                    {typeof productType === "string" ? productType : "Products"}
                </h1>
            </div>

            <ProductsGrid productsPromise={Promise.resolve(filteredProducts)} />
        </div>
    )
}

export default async function ProductTypePage({
    params,
}: {
    params: Promise<{ "product-type": string }>
}) {
    return (
        <Suspense
            fallback={
                <div className="space-y-4 text-center">
                    <div className="h-12 w-48 animate-pulse rounded bg-neutral-200" />
                </div>
            }
        >
            <ProductTypeContent paramsPromise={params} />
        </Suspense>
    )
}

