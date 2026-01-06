"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { slugifyProductType } from "@/lib/utils"

type ProductsSidebarProps = {
    productTypes: string[]
}

export default function ProductsSidebar({
    productTypes,
}: ProductsSidebarProps) {
    const pathname = usePathname()
    const isAllProducts = pathname === "/products"

    return (
        <aside className="w-64 shrink-0 md:sticky md:top-24 md:self-start">
            <nav>
                <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                    Products
                </h2>
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/products"
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                isAllProducts
                                    ? "bg-neutral-100 font-semibold text-neutral-900"
                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                        >
                            All Products
                        </Link>
                    </li>
                    {productTypes.map(type => {
                        const slug = slugifyProductType(type)
                        const href = `/products/${slug}`
                        const isActive = pathname === href

                        return (
                            <li key={type}>
                                <Link
                                    href={href}
                                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                        isActive
                                            ? "bg-neutral-100 font-semibold text-neutral-900"
                                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                    }`}
                                >
                                    {type}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}

