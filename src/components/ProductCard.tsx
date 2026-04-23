import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { QuickViewModal } from "./QuickViewModal";

export const ProductCard = ({ product }: { product: Product }) => {
  const { toggle, isWishlisted } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <>
      <div className="group block animate-fade-up">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-card">
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={1024}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full pointer-events-none">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggle(product); }}
            className="absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background transition-colors"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`size-4 transition-all ${wishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="w-full bg-background/95 backdrop-blur rounded-full px-5 py-3 text-center text-sm font-semibold shadow-soft hover:bg-background transition-colors"
            >
              Quick view
            </button>
          </div>
        </div>
        <Link to={`/product/${product.slug}`}>
          <div className="pt-4 px-1 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-medium leading-snug">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <div className="flex gap-1.5 mt-2">
                {product.colors.slice(0, 4).map((c) => (
                  <span
                    key={c.name}
                    className="size-3.5 rounded-full ring-1 ring-border"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display font-semibold">${product.price}</div>
              {product.compareAt && (
                <div className="text-xs text-muted-foreground line-through">${product.compareAt}</div>
              )}
            </div>
          </div>
        </Link>
      </div>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
