import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { fmt, FREE_SHIPPING_THRESHOLD, SHIPPING_STANDARD } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Mail, ArrowRight } from "lucide-react";

const OrderConfirmed = () => {
  const { items, subtotal } = useCart();
  const orderNumber = `BLM-${Date.now().toString().slice(-6)}`;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_STANDARD;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-16 max-w-2xl text-center min-h-[70vh]">
      <div className="size-20 rounded-full bg-primary/10 grid place-items-center mx-auto mb-6">
        <CheckCircle2 className="size-10 text-primary" />
      </div>

      <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Order confirmed!</h1>
      <p className="text-muted-foreground text-lg mb-2">Thank you for shopping with bloom.</p>
      <p className="text-sm text-muted-foreground mb-8">
        Order <span className="font-semibold text-foreground">{orderNumber}</span>
      </p>

      <div className="bg-muted/50 rounded-3xl p-6 mb-8 text-left space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="size-5 text-primary shrink-0" />
          <span>A confirmation email has been sent to your inbox.</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Package className="size-5 text-primary shrink-0" />
          <span>Your order will be dispatched within 1–2 business days.</span>
        </div>
      </div>

      {items.length > 0 && (
        <div className="bg-background border border-border rounded-3xl p-6 mb-8 text-left">
          <h3 className="font-display font-bold text-lg mb-4">What you ordered</h3>
          <div className="space-y-3">
            {items.map((it, i) => (
              <div key={i} className="flex gap-3 items-center">
                <img src={it.product.image} alt={it.product.name} className="size-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{it.product.name}</p>
                  <p className="text-xs text-muted-foreground">{it.color} · {it.size} · Qty {it.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{fmt(it.product.price * it.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 text-sm space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span><span>{shipping === 0 ? "Free" : fmt(shipping)}</span>
            </div>
            <div className="flex justify-between font-display text-base pt-1 border-t border-border">
              <span>Total</span><span>{fmt(subtotal + shipping)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="hero" size="lg">
          <Link to="/shop">Keep shopping <ArrowRight className="ml-1 size-4" /></Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmed;
