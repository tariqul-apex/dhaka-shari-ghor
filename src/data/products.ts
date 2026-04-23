import sweaterCoral from "@/assets/product-sweater-coral.jpg";
import trousersCream from "@/assets/product-trousers-cream.jpg";
import poloMustard from "@/assets/product-polo-mustard.jpg";
import trousersTerracotta from "@/assets/product-trousers-terracotta.jpg";
import kidsStripes from "@/assets/product-kids-stripes.jpg";
import kidsOveralls from "@/assets/product-kids-overalls.jpg";
import cardigan from "@/assets/product-cardigan.jpg";
import jacketTeal from "@/assets/product-jacket-teal.jpg";
import skirtPink from "@/assets/product-skirt-pink.jpg";

export type Segment = "women" | "men" | "kids";
export type AgeRange = "0-2" | "3-5" | "6-9" | "10-14";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  sizeOrdered: string;
  sizeWorn: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  segment: Segment;
  category: string;
  price: number;
  compareAt?: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: string;
  description: string;
  fabric: string;
  care: string;
  ageRange?: AgeRange;
  stock?: Record<string, number>;
  reviews?: Review[];
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "ribbed-coral-sweater",
    name: "Ribbed Coral Sweater",
    segment: "women",
    category: "Knitwear",
    price: 89,
    compareAt: 119,
    image: sweaterCoral,
    colors: [{ name: "Coral", hex: "#FF6B81" }, { name: "Cream", hex: "#F5EAD2" }, { name: "Teal", hex: "#2BB5A8" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Bestseller",
    description: "An oversized chunky knit in our signature coral. Cropped at the hip with a soft mock neck — built for layering or wearing solo.",
    fabric: "62% Cotton, 38% Recycled Wool",
    care: "Hand wash cold, lay flat to dry",
    stock: { "Coral-XS": 3, "Coral-S": 8, "Coral-M": 12, "Coral-L": 5, "Coral-XL": 2, "Cream-XS": 6, "Cream-S": 10, "Cream-M": 0, "Cream-L": 4, "Cream-XL": 7, "Teal-XS": 1, "Teal-S": 3, "Teal-M": 9, "Teal-L": 11, "Teal-XL": 5 },
    reviews: [
      { id: "r1", author: "Sophie M.", rating: 5, date: "2026-03-12", body: "Absolutely love this sweater. The color is even more vibrant in person!", sizeOrdered: "S", sizeWorn: "S", verified: true },
      { id: "r2", author: "Jasmine K.", rating: 4, date: "2026-02-28", body: "Great quality knit. Runs slightly large so I'd size down.", sizeOrdered: "M", sizeWorn: "S", verified: true },
      { id: "r3", author: "Priya N.", rating: 5, date: "2026-02-10", body: "The coziest thing I own. Washing held up perfectly too.", sizeOrdered: "S", sizeWorn: "S", verified: false },
    ],
  },
  {
    id: "p2",
    slug: "wide-leg-cream-trousers",
    name: "Wide-Leg Cream Trousers",
    segment: "women",
    category: "Bottoms",
    price: 124,
    image: trousersCream,
    colors: [{ name: "Cream", hex: "#F5EAD2" }, { name: "Black", hex: "#1A1A1A" }],
    sizes: ["XS", "S", "M", "L"],
    description: "High-waisted, fluid wide leg trousers with pleated front detail. Pair with the Ribbed Coral Sweater for the look.",
    fabric: "100% Tencel Lyocell",
    care: "Machine wash cold, hang dry",
    stock: { "Cream-XS": 4, "Cream-S": 6, "Cream-M": 8, "Cream-L": 3, "Black-XS": 5, "Black-S": 9, "Black-M": 2, "Black-L": 7 },
    reviews: [
      { id: "r4", author: "Elena R.", rating: 5, date: "2026-03-05", body: "Perfect trousers! The drape is incredible and they photograph beautifully.", sizeOrdered: "S", sizeWorn: "S", verified: true },
      { id: "r5", author: "Aiko T.", rating: 4, date: "2026-01-20", body: "Love the cut. Slightly see-through in cream so I wear a slip underneath.", sizeOrdered: "M", sizeWorn: "M", verified: true },
    ],
  },
  {
    id: "p3",
    slug: "cream-fisherman-cardigan",
    name: "Cream Fisherman Cardigan",
    segment: "women",
    category: "Knitwear",
    price: 148,
    image: cardigan,
    colors: [{ name: "Cream", hex: "#F5EAD2" }, { name: "Coral", hex: "#FF6B81" }],
    sizes: ["XS", "S", "M", "L"],
    badge: "New",
    description: "A heavyweight chunky cable-knit cardigan with deep front pockets. Slow-made in limited quantities.",
    fabric: "100% Organic Cotton",
    care: "Hand wash cold, lay flat to dry",
    stock: { "Cream-XS": 2, "Cream-S": 4, "Cream-M": 3, "Cream-L": 1, "Coral-XS": 5, "Coral-S": 7, "Coral-M": 6, "Coral-L": 4 },
    reviews: [
      { id: "r6", author: "Mara L.", rating: 5, date: "2026-03-18", body: "Worth every penny. The cable knit detail is stunning and the pockets are huge!", sizeOrdered: "S", sizeWorn: "S", verified: true },
    ],
  },
  {
    id: "p4",
    slug: "pink-pleated-midi-skirt",
    name: "Pink Pleated Midi Skirt",
    segment: "women",
    category: "Bottoms",
    price: 96,
    image: skirtPink,
    colors: [{ name: "Hot Pink", hex: "#FF3D8A" }, { name: "Mustard", hex: "#F2B91C" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A swishy accordion-pleated midi in a fearless pink. The kind of skirt that does the talking for you.",
    fabric: "100% Recycled Polyester",
    care: "Machine wash cold, hang dry",
    stock: { "Hot Pink-XS": 6, "Hot Pink-S": 8, "Hot Pink-M": 10, "Hot Pink-L": 4, "Hot Pink-XL": 3, "Mustard-XS": 2, "Mustard-S": 5, "Mustard-M": 7, "Mustard-L": 9, "Mustard-XL": 1 },
    reviews: [
      { id: "r7", author: "Zara H.", rating: 5, date: "2026-04-01", body: "The swish on this skirt is unmatched. I wore it to three events already!", sizeOrdered: "S", sizeWorn: "S", verified: true },
      { id: "r8", author: "Nadia C.", rating: 4, date: "2026-03-22", body: "Beautiful color, fits true to size. The pleats stay perfect all day.", sizeOrdered: "M", sizeWorn: "M", verified: true },
    ],
  },
  {
    id: "p5",
    slug: "mustard-knit-polo",
    name: "Mustard Knit Polo",
    segment: "men",
    category: "Tops",
    price: 78,
    image: poloMustard,
    colors: [{ name: "Mustard", hex: "#F2B91C" }, { name: "Mint", hex: "#A6E3C8" }, { name: "Ink", hex: "#1A1A2E" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    description: "A retro-leaning ribbed knit polo in warm mustard. Lightweight enough for spring, structured enough to dress up.",
    fabric: "85% Cotton, 15% Linen",
    care: "Machine wash cold, lay flat to dry",
    stock: { "Mustard-S": 7, "Mustard-M": 12, "Mustard-L": 9, "Mustard-XL": 5, "Mustard-XXL": 3, "Mint-S": 4, "Mint-M": 8, "Mint-L": 11, "Mint-XL": 6, "Mint-XXL": 2, "Ink-S": 9, "Ink-M": 14, "Ink-L": 10, "Ink-XL": 7, "Ink-XXL": 4 },
    reviews: [
      { id: "r9", author: "James T.", rating: 5, date: "2026-03-30", body: "Best polo I've bought in years. The mustard color is bold but incredibly wearable.", sizeOrdered: "M", sizeWorn: "M", verified: true },
      { id: "r10", author: "Carlos M.", rating: 4, date: "2026-03-15", body: "Great fabric blend. Slightly fitted so if between sizes, go up.", sizeOrdered: "L", sizeWorn: "L", verified: true },
    ],
  },
  {
    id: "p6",
    slug: "terracotta-relaxed-trousers",
    name: "Terracotta Relaxed Trousers",
    segment: "men",
    category: "Bottoms",
    price: 112,
    compareAt: 138,
    image: trousersTerracotta,
    colors: [{ name: "Terracotta", hex: "#D96B3F" }, { name: "Cream", hex: "#F5EAD2" }, { name: "Olive", hex: "#6B7B3A" }],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Easy, wide-cut trousers in a sun-baked terracotta. Elastic back, hidden side pockets, washable.",
    fabric: "100% Cotton Twill",
    care: "Machine wash cold, tumble dry low",
    stock: { "Terracotta-28": 3, "Terracotta-30": 8, "Terracotta-32": 6, "Terracotta-34": 4, "Terracotta-36": 2, "Cream-28": 5, "Cream-30": 9, "Cream-32": 7, "Cream-34": 3, "Cream-36": 1, "Olive-28": 0, "Olive-30": 4, "Olive-32": 10, "Olive-34": 6, "Olive-36": 3 },
    reviews: [
      { id: "r11", author: "Arjun P.", rating: 5, date: "2026-04-08", body: "Finally, comfortable trousers that look great too. The terracotta color is perfect for summer.", sizeOrdered: "32", sizeWorn: "32", verified: true },
    ],
  },
  {
    id: "p7",
    slug: "teal-denim-jacket",
    name: "Teal Denim Jacket",
    segment: "men",
    category: "Outerwear",
    price: 158,
    image: jacketTeal,
    colors: [{ name: "Teal", hex: "#2BB5A8" }, { name: "Indigo", hex: "#3B5998" }],
    sizes: ["S", "M", "L", "XL"],
    badge: "Limited",
    description: "Our classic trucker silhouette dyed in deep teal. Garment-washed for that already-loved hand feel.",
    fabric: "100% Organic Cotton Denim",
    care: "Machine wash cold inside out",
    stock: { "Teal-S": 2, "Teal-M": 3, "Teal-L": 1, "Teal-XL": 2, "Indigo-S": 4, "Indigo-M": 6, "Indigo-L": 5, "Indigo-XL": 3 },
    reviews: [
      { id: "r12", author: "Dylan W.", rating: 5, date: "2026-03-25", body: "This jacket is a conversation starter. The teal wash is unlike anything I've seen.", sizeOrdered: "M", sizeWorn: "M", verified: true },
      { id: "r13", author: "Leo B.", rating: 4, date: "2026-02-14", body: "Beautiful jacket. Fits a bit boxier than expected but that's the style.", sizeOrdered: "L", sizeWorn: "L", verified: false },
    ],
  },
  {
    id: "p8",
    slug: "rainbow-stripe-tee",
    name: "Rainbow Stripe Tee",
    segment: "kids",
    category: "Tops",
    price: 32,
    image: kidsStripes,
    colors: [{ name: "Multi", hex: "#FF3D8A" }, { name: "Sky", hex: "#9DD7F2" }],
    sizes: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"],
    badge: "Bestseller",
    description: "Bold horizontal stripes in our happiest colors. Soft-washed jersey that gets better every wear.",
    fabric: "100% Organic Cotton Jersey",
    care: "Machine wash cold",
    ageRange: "3-5",
    stock: { "Multi-2Y": 8, "Multi-3Y": 12, "Multi-4Y": 15, "Multi-5Y": 10, "Multi-6Y": 7, "Multi-7Y": 4, "Multi-8Y": 3, "Sky-2Y": 6, "Sky-3Y": 9, "Sky-4Y": 11, "Sky-5Y": 8, "Sky-6Y": 5, "Sky-7Y": 2, "Sky-8Y": 4 },
    reviews: [
      { id: "r14", author: "Rachel O.", rating: 5, date: "2026-03-10", body: "My daughter lives in this tee! The colors don't fade after washing — impressive quality.", sizeOrdered: "5Y", sizeWorn: "5Y", verified: true },
    ],
  },
  {
    id: "p9",
    slug: "heart-patch-overalls",
    name: "Heart Patch Overalls",
    segment: "kids",
    category: "Bottoms",
    price: 58,
    image: kidsOveralls,
    colors: [{ name: "Bluebell", hex: "#5BA0E8" }, { name: "Pink", hex: "#FF6B81" }],
    sizes: ["2Y", "3Y", "4Y", "5Y", "6Y"],
    badge: "New",
    description: "Bright denim overalls with a felt heart patch and adjustable straps. Reinforced knees for the long haul.",
    fabric: "100% Cotton Denim, Recycled Patch",
    care: "Machine wash cold, tumble dry low",
    ageRange: "3-5",
    stock: { "Bluebell-2Y": 5, "Bluebell-3Y": 7, "Bluebell-4Y": 9, "Bluebell-5Y": 4, "Bluebell-6Y": 2, "Pink-2Y": 6, "Pink-3Y": 8, "Pink-4Y": 10, "Pink-5Y": 5, "Pink-6Y": 3 },
    reviews: [
      { id: "r15", author: "Tim B.", rating: 5, date: "2026-04-12", body: "The cutest overalls! Great quality, the heart patch is so sweet. Bought in two colors.", sizeOrdered: "4Y", sizeWorn: "4Y", verified: true },
      { id: "r16", author: "Sara K.", rating: 4, date: "2026-03-28", body: "Good quality denim and easy to put on/take off. My toddler loves the heart.", sizeOrdered: "3Y", sizeWorn: "3Y", verified: true },
    ],
  },
];

export const segmentMeta: Record<Segment, { title: string; tagline: string; gradient: string; emoji: string }> = {
  women: { title: "Women", tagline: "Soft power, loud color.", gradient: "gradient-coral", emoji: "🌸" },
  men: { title: "Men", tagline: "Easy tailoring, sun-baked color.", gradient: "gradient-sunny", emoji: "🌞" },
  kids: { title: "Kids", tagline: "Built for jumping, spinning, climbing.", gradient: "gradient-mint", emoji: "🎈" },
};

export const ageRanges: AgeRange[] = ["0-2", "3-5", "6-9", "10-14"];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getBySegment = (s: Segment) => products.filter((p) => p.segment === s);

export const getStockForVariant = (product: Product, color: string, size: string): number => {
  const key = `${color}-${size}`;
  return product.stock?.[key] ?? 10;
};
