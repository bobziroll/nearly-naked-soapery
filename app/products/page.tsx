import Image from "next/image"

import ProductsGrid from "./products-grid"
import { loadProducts } from "./load-products"

export default async function ProductsPage() {
    const products = await loadProducts()

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

            <ProductsGrid products={products} />
        </main>
    )
}
