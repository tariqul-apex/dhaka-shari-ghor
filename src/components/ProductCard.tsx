import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Heart } from "lucide-react";
import { useState } from "react";

export const ProductCard = ({ product }: { product: Product }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block animate-fade-up"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-card">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
          className="absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className={`size-4 transition-all ${liked ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="bg-background/95 backdrop-blur rounded-full px-5 py-3 text-center text-sm font-semibold shadow-soft">
            Quick view
          </div>
        </div>
      </div>
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
        <div className="text-right">
          <div className="font-display font-semibold">${product.price}</div>
          {product.compareAt && (
            <div className="text-xs text-muted-foreground line-through">${product.compareAt}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
