import Image from "next/image"

import { PRODUCT_FIELDS } from "@/lib/airtableFields"
import type { ProductsPromise } from "./load-products"

type ProductsGridProps = {
    productsPromise: ProductsPromise
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
})

export default async function ProductsGrid({
    productsPromise,
}: ProductsGridProps) {
    const products = await productsPromise

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/865404e1-389b-41f2-8abb-4e6e30c2ff63',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'run1',hypothesisId:'H3',location:'app/products/products-grid.tsx:ProductsGrid',message:'rendering products',data:{count:products.length},timestamp:Date.now()})}).catch(()=>{})
    // #endregion

    return (
        <section className="w-full">
            <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(product => {
                    const fields = product.fields
                    const productName = fields[PRODUCT_FIELDS.PRODUCT_NAME]
                    const productType = fields[PRODUCT_FIELDS.PRODUCT_TYPE]
                    const scentNotes = fields[PRODUCT_FIELDS.SCENT_NOTES]
                    const price = fields[PRODUCT_FIELDS.PRICE]
                    const attachments = fields[PRODUCT_FIELDS.IMAGES]
                    const attachment = attachments?.[0]
                    const thumbnail =
                        attachment?.thumbnails?.large ?? attachment ?? null

                    const title = [productName, productType]
                        .filter(Boolean)
                        .join(" ")
                    const priceLabel =
                        typeof price === "number"
                            ? currencyFormatter.format(price)
                            : null

                    return (
                        <article
                            key={product.id}
                            className="flex flex-col overflow-hidden rounded-3xl border border-[#f1e7d8] bg-[#fffdf7] shadow-[0_10px_35px_rgba(51,27,0,0.08)]"
                        >
                            <div className="relative w-full overflow-hidden bg-[#f7efe3]">
                                <div className="relative aspect-square w-full">
                                    {thumbnail ? (
                                        <Image
                                            src={thumbnail.url}
                                            alt={
                                                title ||
                                                productName ||
                                                "Handmade product"
                                            }
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            className="object-cover"
                                            priority={false}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-[#f0e7d8] text-sm text-neutral-400">
                                            Image coming soon
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col items-center gap-2 px-6 pb-8 pt-6 text-center">
                                <p className="text-lg font-semibold text-neutral-900">
                                    {title || "Untitled Product"}
                                </p>
                                {scentNotes && (
                                    <p className="text-sm text-neutral-500">
                                        {scentNotes}
                                    </p>
                                )}
                                {priceLabel && (
                                    <p className="text-base font-semibold text-neutral-900">
                                        {priceLabel}
                                    </p>
                                )}
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

