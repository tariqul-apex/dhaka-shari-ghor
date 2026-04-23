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
  },
];

export const segmentMeta: Record<Segment, { title: string; tagline: string; gradient: string; emoji: string }> = {
  women: { title: "Women", tagline: "Soft power, loud color.", gradient: "gradient-coral", emoji: "🌸" },
  men: { title: "Men", tagline: "Easy tailoring, sun-baked color.", gradient: "gradient-sunny", emoji: "🌞" },
  kids: { title: "Kids", tagline: "Built for jumping, spinning, climbing.", gradient: "gradient-mint", emoji: "🎈" },
};

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getBySegment = (s: Segment) => products.filter((p) => p.segment === s);
