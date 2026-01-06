/**
 * Airtable field ID mappings for the Products table.
 * These constants provide human-readable names for Airtable field IDs.
 */
export const PRODUCT_FIELDS = {
    PRODUCT_TYPE: "fldyZL40YQycqnz2b",
    PRODUCT_NAME: "fld5JzdkMX1jC3n3U",
    PRICE: "fldNEiN2OJwTKz7ow",
    DESCRIPTION: "flduy1ZxMOz1vQ3xN",
    SCENT_NOTES: "flde5vZZaueXFjplm",
    IMAGES: "fldA5ZauEbTdVW56d",
    NAKED: "fldDuifvUby3Rrg8i",
    ACTIVE: "fld17IyGrIaB1thAO",
    PRODUCT_BADGE: "fldsAEQ5uHlVl7W5H",
} as const

/**
 * Type helper for accessing product field values by field ID
 */
export type ProductFieldId = (typeof PRODUCT_FIELDS)[keyof typeof PRODUCT_FIELDS]

