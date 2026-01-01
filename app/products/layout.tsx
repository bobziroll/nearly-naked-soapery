import { Suspense } from "react"

import ProductsSidebar from "./products-sidebar"
import { loadProducts } from "./load-products"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"

async function SidebarWrapper() {
    const products = await loadProducts()

    // Extract unique Product Types
    const productTypes = Array.from(
        new Set(
            products
                .map(p => p.fields[PRODUCT_FIELDS.PRODUCT_TYPE])
                .filter((type): type is string => typeof type === "string")
        )
    ).sort()

    return <ProductsSidebar productTypes={productTypes} />
}

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mx-auto flex min-h-screen max-w-7xl gap-8 px-4 pb-24 pt-8">
            <Suspense
                fallback={
                    <aside className="w-64 shrink-0">
                        <div className="sticky top-24">
                            <div className="mb-4 h-7 w-24 animate-pulse rounded bg-neutral-200" />
                            <div className="space-y-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div
                                        key={i}
                                        className="h-9 w-full animate-pulse rounded-md bg-neutral-100"
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>
                }
            >
                <SidebarWrapper />
            </Suspense>
            <main className="flex-1">{children}</main>
        </div>
    )
}

