import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, Tag, Truck } from "lucide-react";
import { toast } from "sonner";

const FREE_SHIPPING_THRESHOLD = 80;

const PROMO_CODES: Record<string, number> = {
  BLOOM10: 10,
  SPRING15: 15,
  WELCOME20: 20,
};

export const CartDrawer = () => {
  const { isOpen, setOpen, items, removeItem, updateQty, subtotal } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const shippingThreshold = FREE_SHIPPING_THRESHOLD;
  const progressPct = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remaining = Math.max(shippingThreshold - subtotal, 0);

  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 8;
  const discount = appliedPromo ? Math.floor((subtotal * appliedPromo.discount) / 100) : 0;
  const total = subtotal + shipping - discount;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, discount: PROMO_CODES[code] });
      setPromoInput("");
      toast.success(`Code ${code} applied — ${PROMO_CODES[code]}% off!`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    toast("Promo code removed");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="font-display text-2xl">Your bag ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="size-20 rounded-full bg-muted grid place-items-center">
              <ShoppingBag className="size-8" />
            </div>
            <p className="text-muted-foreground">Your bag is empty — let's fix that.</p>
            <Button variant="hero" onClick={() => setOpen(false)}>Start shopping</Button>
          </div>
        ) : (
          <>
            {/* free shipping progress */}
            <div className="px-6 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-xs font-medium mb-2">
                <Truck className="size-3.5 text-primary" />
                {remaining === 0 ? (
                  <span className="text-primary">You've unlocked free shipping! 🎉</span>
                ) : (
                  <span>Add <span className="text-primary font-bold">${remaining}</span> more for free shipping</span>
                )}
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((it, i) => (
                <div key={i} className="flex gap-4">
                  <Link to={`/product/${it.product.slug}`} onClick={() => setOpen(false)}>
                    <img src={it.product.image} alt={it.product.name} className="size-24 rounded-2xl object-cover hover:opacity-80 transition-opacity" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/product/${it.product.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-medium leading-tight hover:text-primary transition-colors"
                      >
                        {it.product.name}
                      </Link>
                      <button onClick={() => removeItem(i)} aria-label="Remove">
                        <X className="size-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{it.color} · {it.size}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => updateQty(i, it.quantity - 1)} className="p-2" aria-label="Decrease">
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{it.quantity}</span>
                        <button onClick={() => updateQty(i, it.quantity + 1)} className="p-2" aria-label="Increase">
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <div className="font-semibold">${it.product.price * it.quantity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-6 space-y-4 bg-muted/40">
              {/* promo code */}
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-primary/10 rounded-xl px-4 py-2.5 text-sm">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Tag className="size-4" />
                    {appliedPromo.code} — {appliedPromo.discount}% off
                  </div>
                  <button onClick={removePromo} className="text-muted-foreground hover:text-foreground">
                    <X className="size-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                    placeholder="Promo code"
                    className="flex-1 h-10 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="outline" size="sm" onClick={applyPromo} className="h-10 px-4 rounded-xl">
                    Apply
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Discount ({appliedPromo?.discount}%)</span>
                    <span>−${discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <Button asChild variant="hero" size="lg" className="w-full">
                <Link to="/checkout" onClick={() => setOpen(false)}>Checkout</Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setOpen(false)}>Keep shopping</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
