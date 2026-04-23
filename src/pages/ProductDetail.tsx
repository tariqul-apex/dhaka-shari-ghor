import { Link, useParams } from "react-router-dom";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Heart, Truck, Recycle, ShieldCheck, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/ProductCard";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem } = useCart();
  const [color, setColor] = useState(product?.colors[0].name ?? "");
  const [size, setSize] = useState<string>("");
  const [openAcc, setOpenAcc] = useState<string | null>("details");

  if (!product) return <NotFound />;

  const related = products.filter((p) => p.segment === product.segment && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!size) { setSize(""); return; }
    addItem({ product, size, color, quantity: 1 });
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

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl">${product.price}</span>
            {product.compareAt && (
              <>
                <span className="text-muted-foreground line-through">${product.compareAt}</span>
                <span className="text-primary font-semibold text-sm">
                  Save ${product.compareAt - product.price}
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
                  onClick={() => setColor(c.name)}
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
              <button className="text-muted-foreground underline">Size guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 rounded-xl text-sm font-semibold transition-all ${
                    size === s
                      ? "bg-foreground text-background"
                      : "bg-muted hover:bg-muted/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="hero" size="lg" className="flex-1" onClick={handleAdd}>
              {size ? `Add to bag — $${product.price}` : "Select size"}
            </Button>
            <Button variant="outline" size="icon" className="size-14" aria-label="Wishlist">
              <Heart className="size-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pt-2">
            <div className="flex flex-col items-center text-center gap-1.5"><Truck className="size-4" />Free over $80</div>
            <div className="flex flex-col items-center text-center gap-1.5"><Recycle className="size-4" />30-day returns</div>
            <div className="flex flex-col items-center text-center gap-1.5"><ShieldCheck className="size-4" />Secure checkout</div>
          </div>

          {/* accordion */}
          <div className="border-t border-border">
            {[
              { id: "details", title: "Details & fabric", body: `${product.fabric}. ${product.description}` },
              { id: "care", title: "Care", body: product.care },
              { id: "ship", title: "Shipping & returns", body: "Standard 3–5 business days. Free over $80. 30-day free returns on unworn items." },
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

      {/* related */}
      <section className="container py-16">
        <h2 className="font-display font-black text-3xl md:text-4xl mb-8">You might also love</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
