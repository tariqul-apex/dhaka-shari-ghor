import { Link, useParams } from "react-router-dom";
import { getProduct, products, getStockForVariant } from "@/data/products";
import { fmt, FREE_SHIPPING_THRESHOLD, SHIPPING_STANDARD, SHIPPING_EXPRESS } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Heart, Truck, Recycle, ShieldCheck, ChevronDown, Star, Share2, BadgeCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import NotFound from "./NotFound";

const RECENTLY_VIEWED_KEY = "bloom-recently-viewed";

const SizeGuideModal = ({ segment, open, onClose }: { segment: string; open: boolean; onClose: () => void }) => {
  const isKids = segment === "kids";
  const isMen = segment === "men";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-2xl">Size Guide</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">All measurements are in centimeters (cm). For the best fit, measure your body and compare to the chart below.</p>
        {isKids ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold">Label</th>
                <th className="py-2 font-semibold">Age</th>
                <th className="py-2 font-semibold">Height (cm)</th>
                <th className="py-2 font-semibold">Chest (cm)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["2Y", "1.5–2.5 yrs", "86–92", "52–54"],
                ["3Y", "2.5–3.5 yrs", "92–98", "54–56"],
                ["4Y", "3.5–4.5 yrs", "98–104", "56–58"],
                ["5Y", "4.5–5.5 yrs", "104–110", "58–60"],
                ["6Y", "5.5–6.5 yrs", "110–116", "60–63"],
                ["7Y", "6.5–7.5 yrs", "116–122", "63–65"],
                ["8Y", "7.5–8.5 yrs", "122–128", "65–68"],
              ].map(([label, age, height, chest]) => (
                <tr key={label} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-2 font-medium">{label}</td>
                  <td className="py-2 text-center text-muted-foreground">{age}</td>
                  <td className="py-2 text-center text-muted-foreground">{height}</td>
                  <td className="py-2 text-center text-muted-foreground">{chest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold">Size</th>
                <th className="py-2 font-semibold">Chest (cm)</th>
                <th className="py-2 font-semibold">Waist (cm)</th>
                <th className="py-2 font-semibold">Hips (cm)</th>
              </tr>
            </thead>
            <tbody>
              {(isMen
                ? [
                    ["S", "88–92", "74–78", "90–94"],
                    ["M", "92–96", "78–82", "94–98"],
                    ["L", "96–100", "82–86", "98–102"],
                    ["XL", "100–104", "86–90", "102–106"],
                    ["XXL", "104–110", "90–96", "106–112"],
                  ]
                : [
                    ["XS", "80–84", "62–66", "88–92"],
                    ["S", "84–88", "66–70", "92–96"],
                    ["M", "88–92", "70–74", "96–100"],
                    ["L", "92–96", "74–78", "100–104"],
                    ["XL", "96–100", "78–82", "104–108"],
                  ]
              ).map(([size, chest, waist, hips]) => (
                <tr key={size} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-2 font-medium">{size}</td>
                  <td className="py-2 text-center text-muted-foreground">{chest}</td>
                  <td className="py-2 text-center text-muted-foreground">{waist}</td>
                  <td className="py-2 text-center text-muted-foreground">{hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="text-xs text-muted-foreground mt-3">If you're between sizes, we recommend sizing up for a more relaxed fit.</p>
      </DialogContent>
    </Dialog>
  );
};

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => (
  <div className={`flex gap-0.5 ${size === "lg" ? "scale-125 origin-left" : ""}`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`${size === "sm" ? "size-3.5" : "size-4"} ${i <= rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
      />
    ))}
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [color, setColor] = useState(product?.colors[0].name ?? "");
  const [size, setSize] = useState<string>("");
  const [openAcc, setOpenAcc] = useState<string | null>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<typeof products>([]);

  const wishlisted = product ? isWishlisted(product.id) : false;
  const stockQty = product && size ? getStockForVariant(product, color, size) : null;

  useEffect(() => {
    if (!product) return;
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) ?? "[]");
      const updated = [product.slug, ...stored.filter((s) => s !== product.slug)].slice(0, 8);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      const viewed = updated
        .filter((s) => s !== product.slug)
        .map((s) => products.find((p) => p.slug === s))
        .filter(Boolean) as typeof products;
      setRecentlyViewed(viewed.slice(0, 4));
    } catch {
      // ignore
    }
  }, [product]);

  if (!product) return <NotFound />;

  const related = products.filter((p) => p.segment === product.segment && p.id !== product.id).slice(0, 4);
  const reviews = product.reviews ?? [];
  const avgRating = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : null;

  const handleAdd = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    addItem({ product, size, color, quantity: 1 });
    toast.success(`${product.name} added to bag`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <div>
      <div className="container pt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to={`/${product.segment}`} className="hover:text-foreground capitalize">{product.segment}</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="container py-8 grid lg:grid-cols-2 gap-10">
        {/* gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-card">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <button key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted hover:ring-2 hover:ring-primary transition-all">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
          {product.badge && (
            <span className="inline-block bg-foreground text-background text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              {product.badge}
            </span>
          )}
          <div>
            <p className="text-muted-foreground">{product.category}</p>
            <h1 className="font-display font-black text-4xl md:text-5xl mt-1 leading-tight">{product.name}</h1>
          </div>

          {avgRating && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm font-medium">{avgRating}</span>
              <span className="text-sm text-muted-foreground">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
            </div>
          )}

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl">{fmt(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-muted-foreground line-through">{fmt(product.compareAt)}</span>
                <span className="text-primary font-semibold text-sm">
                  Save {fmt(product.compareAt - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          {/* color */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-3">
              <span>Color</span>
              <span className="text-muted-foreground">{color}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setColor(c.name); setSize(""); }}
                  className={`size-10 rounded-full ring-2 transition-all ${
                    color === c.name ? "ring-foreground scale-110" : "ring-transparent hover:ring-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* size */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-3">
              <span>Size</span>
              <button onClick={() => setSizeGuideOpen(true)} className="text-muted-foreground underline hover:text-foreground">
                Size guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => {
                const qty = getStockForVariant(product, color, s);
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    disabled={qty === 0}
                    title={qty === 0 ? "Out of stock" : undefined}
                    className={`h-12 rounded-xl text-sm font-semibold transition-all relative ${
                      size === s
                        ? "bg-foreground text-background"
                        : qty === 0
                          ? "bg-muted text-muted-foreground/40 line-through cursor-not-allowed"
                          : "bg-muted hover:bg-muted/60"
                    }`}
                  >
                    {s}
                    {qty > 0 && qty <= 3 && (
                      <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-primary" title="Low stock" />
                    )}
                  </button>
                );
              })}
            </div>
            {size && stockQty !== null && (
              <p className={`text-xs mt-2 font-medium ${stockQty === 0 ? "text-destructive" : stockQty <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                {stockQty === 0 ? "Out of stock in this size" : stockQty <= 3 ? `Only ${stockQty} left!` : "In stock"}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="hero" size="lg" className="flex-1" onClick={handleAdd}>
              {size ? `Add to bag — ${fmt(product.price)}` : "Select size"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-14"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggle(product)}
            >
              <Heart className={`size-5 transition-all ${wishlisted ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" className="size-14" aria-label="Share" onClick={handleShare}>
              <Share2 className="size-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pt-2">
            <div className="flex flex-col items-center text-center gap-1.5"><Truck className="size-4" />Free over ৳8,000</div>
            <div className="flex flex-col items-center text-center gap-1.5"><Recycle className="size-4" />30-day returns</div>
            <div className="flex flex-col items-center text-center gap-1.5"><ShieldCheck className="size-4" />Secure checkout</div>
          </div>

          {/* accordion */}
          <div className="border-t border-border">
            {[
              { id: "details", title: "Details & fabric", body: `${product.fabric}. ${product.description}` },
              { id: "care", title: "Care instructions", body: product.care },
              { id: "ship", title: "Shipping & returns", body: `Standard 3–5 business days. Free over ${fmt(FREE_SHIPPING_THRESHOLD)}. Express (1–2 days) ${fmt(SHIPPING_EXPRESS)}. 30-day free returns on unworn items with tags attached.` },
            ].map((item) => (
              <div key={item.id} className="border-b border-border">
                <button
                  onClick={() => setOpenAcc((v) => (v === item.id ? null : item.id))}
                  className="w-full flex justify-between items-center py-4 font-medium"
                >
                  {item.title}
                  <ChevronDown className={`size-4 transition-transform ${openAcc === item.id ? "rotate-180" : ""}`} />
                </button>
                {openAcc === item.id && (
                  <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="container py-12 border-t border-border">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-black text-3xl md:text-4xl">Customer reviews</h2>
              {avgRating && (
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={Math.round(avgRating)} size="lg" />
                  <span className="font-display font-bold text-2xl">{avgRating}</span>
                  <span className="text-muted-foreground text-sm">out of 5 · {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.id} className="bg-muted/50 rounded-3xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{r.author}</span>
                      {r.verified && (
                        <span className="flex items-center gap-0.5 text-xs text-primary">
                          <BadgeCheck className="size-3.5" />Verified
                        </span>
                      )}
                    </div>
                    <StarRating rating={r.rating} />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{new Date(r.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                </div>
                <p className="text-sm leading-relaxed">{r.body}</p>
                <p className="text-xs text-muted-foreground">Ordered: {r.sizeOrdered} · Usually wears: {r.sizeWorn}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="container py-16 border-t border-border">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-8">You might also love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="container py-12 border-t border-border">
          <h2 className="font-display font-black text-2xl md:text-3xl mb-6">Recently viewed</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyViewed.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <SizeGuideModal segment={product.segment} open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
};

export default ProductDetail;
