import type { FieldSet } from "airtable"
import { cacheLife } from "next/cache"

import { fetchAirtableRecords } from "@/lib/controllers/airtableRecords"
import { PRODUCT_FIELDS } from "@/lib/airtableFields"

type AirtableAttachment = {
    id: string
    url: string
    width: number
    height: number
    thumbnails?: {
        large?: {
            url: string
            width: number
            height: number
        }
    }
}

export type ProductFields = FieldSet & {
    [PRODUCT_FIELDS.PRODUCT_NAME]?: string
    [PRODUCT_FIELDS.PRODUCT_TYPE]?: string
    [PRODUCT_FIELDS.PRICE]?: number
    [PRODUCT_FIELDS.DESCRIPTION]?: string
    [PRODUCT_FIELDS.SCENT_NOTES]?: string
    [PRODUCT_FIELDS.IMAGES]?: AirtableAttachment[]
    [PRODUCT_FIELDS.NAKED]?: boolean
    [PRODUCT_FIELDS.FEATURED]?: boolean
    [PRODUCT_FIELDS.ACTIVE]?: boolean
    [PRODUCT_FIELDS.PRODUCT_BADGE]?: string
}

export type ProductRecord = {
    id: string
    fields: ProductFields
}

export async function loadProducts(): Promise<ProductRecord[]> {
    "use cache"

    cacheLife({
        stale: 120, // serve cached for 2 minutes
        revalidate: 120, // revalidate in the background after 2 minutes
        expire: 300, // hard expire after 5 minutes
    })

    const records = await fetchAirtableRecords<ProductFields>({
        // Use table ID so renaming the table will not break the integration.
        tableName: "tblAVJgfvuw4ZCHre",
        returnFieldsByFieldId: true,
        // Only active products
        filterByFormula: `{${PRODUCT_FIELDS.ACTIVE}}`,
    })

    const products = records.map(record => ({
        id: record.id,
        fields: record.fields,
    }))

    // Featured products first, otherwise preserve Airtable order
    products.sort((a, b) => {
        const aFeatured = a.fields[PRODUCT_FIELDS.FEATURED] === true ? 1 : 0
        const bFeatured = b.fields[PRODUCT_FIELDS.FEATURED] === true ? 1 : 0
        return bFeatured - aFeatured
    })

    return products
}

export type ProductsPromise = ReturnType<typeof loadProducts>

