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
}

export type ProductRecord = {
    id: string
    fields: ProductFields
}

export async function loadProducts(): Promise<ProductRecord[]> {
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

export type ProductsPromise = ReturnType<typeof loadProducts>

