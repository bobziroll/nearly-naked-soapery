import { Suspense } from "react"

import ProductsGrid from "./products-grid"
import { loadProducts } from "./load-products"

export default function ProductsPage() {
    const productsPromise = loadProducts()

    return (
        <div className="flex w-full flex-col items-center gap-8">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                    All Products
                </h1>
            </div>

            <Suspense
                fallback={
                    <div className="w-full max-w-4xl text-sm text-neutral-500">
                        Loading products...
                    </div>
                }
            >
                <ProductsGrid productsPromise={productsPromise} />
            </Suspense>
        </div>
    )
}
