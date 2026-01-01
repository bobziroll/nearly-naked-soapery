import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a product type string to a URL-friendly slug
 * e.g., "Face Cream" -> "face-cream"
 */
export function slugifyProductType(productType: string): string {
  return productType
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
}

/**
 * Converts a slug back to a product type (for display purposes)
 * This is a simple implementation - you may want to store the mapping in Airtable
 */
export function deslugifyProductType(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
