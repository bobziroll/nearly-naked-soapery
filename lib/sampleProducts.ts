export type Product = {
  id: string;
  name: string;
  scentNotes: string[];
  description: string;
  price: number;
  weightOz: number;
  image: string;
  tag?: string;
  badges?: string[];
};

export type ProductReview = {
  id: string;
  productId: string;
  customer: string;
  location: string;
  quote: string;
  rating: number;
};

export type ProductAward = {
  id: string;
  productId: string;
  label: string;
  year: string;
};

export const products: Product[] = [
  {
    id: "matcha-green-bar",
    name: "Matcha Green Soap",
    scentNotes: ["Matcha Leaf", "Bergamot", "Lavender"],
    description:
      "A velvety bar infused with ceremonial-grade matcha, French green clay, and cold-pressed avocado oil to calm, brighten, and replenish every skin type.",
    price: 14,
    weightOz: 4.5,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    tag: "Top Choice",
    badges: ["Antioxidant-rich", "Vegan", "Small batch"],
  },
  {
    id: "citrus-blossom-bar",
    name: "Citrus Blossom",
    scentNotes: ["Sweet Orange", "Pink Grapefruit", "Vanilla"],
    description:
      "Sunny botanicals blended with coconut milk and meadowfoam seed oil for a creamy lather that leaves skin luminous.",
    price: 12,
    weightOz: 4,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    tag: "Limited",
    badges: ["Brightening", "Palm-free"],
  },
  {
    id: "lavender-honey-bar",
    name: "Lavender Honey",
    scentNotes: ["French Lavender", "Wild Honey", "Oat Milk"],
    description:
      "Our cozy bestseller with colloidal oats, raw honey, and shea butter to soften even the driest skin.",
    price: 11,
    weightOz: 4.2,
    image:
      "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?auto=format&fit=crop&w=900&q=80",
    badges: ["Soothing", "Family favorite"],
  },
];

export const featuredProductId = "matcha-green-bar";

export const productAwards: ProductAward[] = [
  {
    id: "award-2024",
    productId: "matcha-green-bar",
    label: "Best Soap",
    year: "2024",
  },
  {
    id: "award-2023",
    productId: "citrus-blossom-bar",
    label: "Top Natural",
    year: "2023",
  },
  {
    id: "award-2022",
    productId: "lavender-honey-bar",
    label: "High Quality",
    year: "2022",
  },
  {
    id: "award-2021",
    productId: "matcha-green-bar",
    label: "Best Choice",
    year: "2021",
  },
];

export const productReviews: ProductReview[] = [
  {
    id: "review-1",
    productId: "lavender-honey-bar",
    customer: "Ivy M.",
    location: "Portland, OR",
    quote:
      "My skin hasn’t felt this calm in ages. The lavender honey bar is a nightly ritual now.",
    rating: 5,
  },
  {
    id: "review-2",
    productId: "matcha-green-bar",
    customer: "Camille R.",
    location: "Austin, TX",
    quote:
      "The matcha soap smells like a mini spa day and the lather is unbelievably silky.",
    rating: 5,
  },
  {
    id: "review-3",
    productId: "citrus-blossom-bar",
    customer: "Brenda L.",
    location: "Napa, CA",
    quote:
      "Bright, fresh, and it never leaves my skin tight. I stock up every time.",
    rating: 4.5,
  },
];

