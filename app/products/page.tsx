import { Suspense } from "react"
import Image from "next/image"

import ProductsFilterSection from "./products-filter-section"
import ProductsGrid from "./products-grid"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"
import { loadProducts, type ProductsPromise } from "./load-products"

async function ProductsFilterWrapper({
    productsPromise,
}: {
    productsPromise: ProductsPromise
}) {
    const products = await productsPromise

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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/865404e1-389b-41f2-8abb-4e6e30c2ff63',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'run1',hypothesisId:'H2',location:'app/products/page.tsx:ProductsFilterWrapper',message:'computed filter lists',data:{productTypes:productTypes.length,productNames:productNames.length},timestamp:Date.now()})}).catch(()=>{})
    // #endregion

    return (
        <ProductsFilterSection
            productTypes={productTypes}
            productNames={productNames}
        />
    )
}

export default function ProductsPage() {
    const productsPromise = loadProducts()

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
                <ProductsFilterWrapper productsPromise={productsPromise} />
            </Suspense>

            <Suspense
                fallback={
                    <div className="w-full max-w-4xl text-sm text-neutral-500">
                        Loading products...
                    </div>
                }
            >
                <ProductsGrid productsPromise={productsPromise} />
            </Suspense>
        </main>
    )
}
