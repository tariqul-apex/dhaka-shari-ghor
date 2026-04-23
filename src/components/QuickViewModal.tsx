import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product, getStockForVariant } from "@/data/products";
import { fmt } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, open, onClose }: Props) => {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const activeColor = color || (product?.colors[0].name ?? "");
  const stockQty = product ? getStockForVariant(product, activeColor, size) : 0;

  const handleAdd = () => {
    if (!product || !size) {
      toast.error("Please select a size");
      return;
    }
    addItem({ product, size, color: activeColor, quantity: 1 });
    toast.success(`${product.name} added to bag`);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl gap-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 size-8 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="aspect-[4/5] sm:aspect-auto bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh] sm:max-h-none">
            {product.badge && (
              <span className="self-start bg-foreground text-background text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
              <h2 className="font-display font-black text-2xl leading-tight mt-0.5">{product.name}</h2>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl">{fmt(product.price)}</span>
              {product.compareAt && (
                <>
                  <span className="text-muted-foreground line-through text-sm">{fmt(product.compareAt)}</span>
                  <span className="text-primary font-semibold text-xs">Save {fmt(product.compareAt - product.price)}</span>
                </>
              )}
            </div>

            {/* colors */}
            <div>
              <p className="text-sm font-medium mb-2">Color — <span className="text-muted-foreground font-normal">{activeColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setColor(c.name); setSize(""); }}
                    className={`size-8 rounded-full ring-2 transition-all ${activeColor === c.name ? "ring-foreground scale-110" : "ring-transparent hover:ring-border"}`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* sizes */}
            <div>
              <p className="text-sm font-medium mb-2">Size</p>
              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((s) => {
                  const qty = getStockForVariant(product, activeColor, s);
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      disabled={qty === 0}
                      className={`h-10 rounded-lg text-xs font-semibold transition-all relative ${
                        size === s
                          ? "bg-foreground text-background"
                          : qty === 0
                            ? "bg-muted text-muted-foreground/40 line-through cursor-not-allowed"
                            : "bg-muted hover:bg-muted/60"
                      }`}
                    >
                      {s}
                      {qty > 0 && qty <= 3 && (
                        <span className="absolute -top-1.5 -right-1.5 size-3 rounded-full bg-primary" title="Low stock" />
                      )}
                    </button>
                  );
                })}
              </div>
              {size && stockQty > 0 && stockQty <= 3 && (
                <p className="text-xs text-primary mt-1.5 font-medium">Only {stockQty} left in this size!</p>
              )}
            </div>

            <div className="flex gap-2 mt-auto pt-2">
              <Button variant="hero" className="flex-1" onClick={handleAdd}>
                {size ? `Add to bag` : "Select size"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-11"
                onClick={() => toggle(product)}
                aria-label="Wishlist"
              >
                <Heart className={`size-4 transition-all ${isWishlisted(product.id) ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View full details <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
