import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export const CartDrawer = () => {
  const { isOpen, setOpen, items, removeItem, updateQty, subtotal } = useCart();
  const shipping = subtotal > 80 || subtotal === 0 ? 0 : 8;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="font-display text-2xl">Your bag ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="size-20 rounded-full gradient-sunny grid place-items-center">
              <ShoppingBag className="size-8" />
            </div>
            <p className="text-muted-foreground">Your bag is empty — let's fix that.</p>
            <Button variant="hero" onClick={() => setOpen(false)}>Start shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((it, i) => (
                <div key={i} className="flex gap-4">
                  <img src={it.product.image} alt={it.product.name} className="size-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-medium leading-tight">{it.product.name}</h4>
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

            <div className="border-t border-border p-6 space-y-3 bg-muted/40">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span>${subtotal + shipping}</span>
              </div>
              <Button variant="hero" size="lg" className="w-full">Checkout</Button>
              <Button variant="ghost" className="w-full" onClick={() => setOpen(false)}>Keep shopping</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
