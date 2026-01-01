import { Suspense } from "react"
import { notFound } from "next/navigation"

import ProductsGrid from "../products-grid"
import { loadProducts } from "../load-products"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"
import { deslugifyProductType, slugifyProductType } from "@/lib/utils"

async function FilteredProductsGrid({
    productTypeSlug,
}: {
    productTypeSlug: string
}) {
    const products = await loadProducts()

    // Filter products by comparing slugs for case-insensitive matching
    const filteredProducts = products.filter(product => {
        const type = product.fields[PRODUCT_FIELDS.PRODUCT_TYPE]
        if (typeof type !== "string") return false
        return slugifyProductType(type) === productTypeSlug
    })

    // If no products found, show 404
    if (filteredProducts.length === 0) {
        notFound()
    }

    return <ProductsGrid productsPromise={Promise.resolve(filteredProducts)} />
}

async function ProductTypeTitle({
    productTypeSlug,
}: {
    productTypeSlug: string
}) {
    const products = await loadProducts()

    // Find the actual product type name from the first matching product
    const matchingProduct = products.find(product => {
        const type = product.fields[PRODUCT_FIELDS.PRODUCT_TYPE]
        if (typeof type !== "string") return false
        return slugifyProductType(type) === productTypeSlug
    })

    const productType =
        matchingProduct?.fields[PRODUCT_FIELDS.PRODUCT_TYPE] ??
        deslugifyProductType(productTypeSlug)

    return (
        <div className="space-y-4 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                {typeof productType === "string" ? productType : "Products"}
            </h1>
        </div>
    )
}

export default async function ProductTypePage({
    params,
}: {
    params: { "product-type": string }
}) {
    const productTypeSlug = params["product-type"]

    return (
        <div className="flex w-full flex-col items-center gap-8">
            <Suspense
                fallback={
                    <div className="space-y-4 text-center">
                        <div className="h-12 w-48 animate-pulse rounded bg-neutral-200" />
                    </div>
                }
            >
                <ProductTypeTitle productTypeSlug={productTypeSlug} />
            </Suspense>

            <Suspense
                fallback={
                    <div className="w-full max-w-4xl text-sm text-neutral-500">
                        Loading products...
                    </div>
                }
            >
                <FilteredProductsGrid productTypeSlug={productTypeSlug} />
            </Suspense>
        </div>
    )
}

