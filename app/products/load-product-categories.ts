import type { FieldSet } from "airtable"
import { cacheLife } from "next/cache"

import { fetchAirtableRecords } from "@/lib/controllers/airtableRecords"
import { CATEGORY_FIELDS } from "@/lib/airtableFields"

export type ProductCategory = {
    id: string
    name: string
}

type CategoryFields = FieldSet & {
    [CATEGORY_FIELDS.NAME]?: string
    [CATEGORY_FIELDS.PRODUCT_IDS]?: readonly string[]
}

const TABLE_ID = "tblU1a38vJgaPqrIN"
const VIEW_ID = "viwNHXjSIbVxsOTQT"

export async function loadProductCategories(): Promise<ProductCategory[]> {
    "use cache"

    cacheLife({
        stale: 120,
        revalidate: 120,
        expire: 300,
    })

    const records = await fetchAirtableRecords<CategoryFields>({
        tableName: TABLE_ID,
        view: VIEW_ID,
        returnFieldsByFieldId: true,
    })

    return records
        .map(record => {
            const name = record.fields[CATEGORY_FIELDS.NAME]
            const productIds = record.fields[CATEGORY_FIELDS.PRODUCT_IDS]

            const ids =
                Array.isArray(productIds) && productIds.every(id => typeof id === "string")
                    ? (productIds as string[])
                    : []

            if (typeof name !== "string") return null
            if (ids.length === 0) return null

            return { id: record.id, name }
        })
        .filter((value): value is ProductCategory => Boolean(value))
}
