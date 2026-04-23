import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, Lock, CreditCard, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { fmt, FREE_SHIPPING_THRESHOLD, SHIPPING_STANDARD, SHIPPING_EXPRESS } from "@/lib/currency";

type Step = "contact" | "shipping" | "payment";

const steps: { id: Step; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const initialForm: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  shippingMethod: "standard",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
    />
  </div>
);

const Checkout = () => {
  const { items, subtotal, setOpen } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("contact");
  const [form, setForm] = useState<FormData>(initialForm);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_STANDARD;
  const total = subtotal + shipping;
  const currentIdx = steps.findIndex((s) => s.id === step);

  const handleChange = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "contact") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else {
      navigate("/order-confirmed");
    }
  };

  const handleBack = () => {
    if (step === "shipping") setStep("contact");
    else if (step === "payment") setStep("shipping");
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center min-h-[60vh]">
        <p className="text-muted-foreground text-lg mb-4">Your bag is empty.</p>
        <Button asChild variant="hero"><Link to="/shop">Continue shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 max-w-6xl">
        {/* header */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="font-display font-black text-2xl tracking-tight">
            bloom<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Lock className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Secure checkout</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* left */}
          <div>
            {/* step progress */}
            <div className="flex items-center gap-3 mb-8">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <button
                    onClick={() => i < currentIdx && setStep(s.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      s.id === step
                        ? "text-foreground"
                        : i < currentIdx
                          ? "text-primary hover:text-primary/80 cursor-pointer"
                          : "text-muted-foreground cursor-default"
                    }`}
                  >
                    <span
                      className={`size-6 rounded-full grid place-items-center text-xs font-bold ${
                        i < currentIdx
                          ? "bg-primary text-primary-foreground"
                          : s.id === step
                            ? "bg-foreground text-background"
                            : "bg-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {i < currentIdx ? "✓" : i + 1}
                    </span>
                    {s.label}
                  </button>
                  {i < steps.length - 1 && <ChevronRight className="size-4 text-muted-foreground" />}
                </div>
              ))}
            </div>

            {/* mobile order summary toggle */}
            <button
              className="lg:hidden w-full flex justify-between items-center bg-background border border-border rounded-2xl p-4 mb-6 text-sm font-medium"
              onClick={() => setOrderSummaryOpen((v) => !v)}
            >
              <span className="flex items-center gap-2">
                <span>Order summary</span>
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">{items.length}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="font-display">{fmt(total)}</span>
                {orderSummaryOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </span>
            </button>

            {orderSummaryOpen && (
              <div className="lg:hidden bg-background border border-border rounded-2xl p-4 mb-6 space-y-4">
                {items.map((it, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative">
                      <img src={it.product.image} alt={it.product.name} className="size-16 rounded-xl object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-muted-foreground text-background text-[10px] font-bold grid place-items-center">{it.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-snug">{it.product.name}</p>
                      <p className="text-xs text-muted-foreground">{it.color} · {it.size}</p>
                    </div>
                    <p className="text-sm font-semibold">{fmt(it.product.price * it.quantity)}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleNext} className="bg-background rounded-3xl border border-border p-6 md:p-8 space-y-5">
              {step === "contact" && (
                <>
                  <h2 className="font-display font-bold text-2xl mb-2">Contact information</h2>
                  <InputField label="Email address" name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@email.com" required />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="First name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" required />
                    <InputField label="Last name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Smith" required />
                  </div>
                  <InputField label="Phone number" name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" />
                </>
              )}

              {step === "shipping" && (
                <>
                  <h2 className="font-display font-bold text-2xl mb-2">Shipping address</h2>
                  <InputField label="Street address" name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street, Apt 4B" required />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="City" name="city" value={form.city} onChange={handleChange} placeholder="New York" required />
                    <InputField label="State / Province" name="state" value={form.state} onChange={handleChange} placeholder="NY" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="ZIP / Postal code" name="zip" value={form.zip} onChange={handleChange} placeholder="10001" required />
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Country <span className="text-primary">*</span></label>
                      <select
                        value={form.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      >
                        {["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Bangladesh", "India"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3">Shipping method</p>
                    <div className="space-y-2">
                      {[
                        { id: "standard", label: "Standard shipping", sub: "3–5 business days", price: subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : fmt(SHIPPING_STANDARD) },
                        { id: "express", label: "Express shipping", sub: "1–2 business days", price: fmt(SHIPPING_EXPRESS) },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                            form.shippingMethod === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={opt.id}
                              checked={form.shippingMethod === opt.id}
                              onChange={() => handleChange("shippingMethod", opt.id)}
                              className="text-primary"
                            />
                            <div>
                              <p className="text-sm font-medium">{opt.label}</p>
                              <p className="text-xs text-muted-foreground">{opt.sub}</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold">{opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === "payment" && (
                <>
                  <h2 className="font-display font-bold text-2xl mb-2">Payment</h2>
                  <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="size-4 shrink-0" />
                    All transactions are secure and encrypted.
                  </div>
                  <InputField label="Cardholder name" name="cardName" value={form.cardName} onChange={handleChange} placeholder="Jane Smith" required />
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Card number <span className="text-primary">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={(e) => handleChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                        className="w-full h-12 pl-4 pr-12 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiry date" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM / YY" required />
                    <InputField label="CVV" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" required />
                  </div>

                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-sm font-medium mb-3">Or pay with</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["PayPal", "Apple Pay", "Google Pay"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          className="h-12 rounded-xl border border-border bg-muted hover:bg-muted/70 text-sm font-medium transition-colors"
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                {step !== "contact" && (
                  <Button type="button" variant="outline" size="lg" onClick={handleBack} className="w-32">
                    Back
                  </Button>
                )}
                <Button type="submit" variant="hero" size="lg" className="flex-1">
                  {step === "payment" ? (
                    <span className="flex items-center gap-2"><Lock className="size-4" />Place order — {fmt(total)}</span>
                  ) : (
                    <span className="flex items-center gap-2">Continue <ChevronRight className="size-4" /></span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* right: order summary (desktop) */}
          <div className="hidden lg:block">
            <div className="bg-background border border-border rounded-3xl p-6 sticky top-28">
              <h3 className="font-display font-bold text-xl mb-5">Order summary</h3>
              <div className="space-y-4 mb-5">
                {items.map((it, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img src={it.product.image} alt={it.product.name} className="size-16 rounded-xl object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-muted-foreground text-background text-[10px] font-bold grid place-items-center">{it.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug truncate">{it.product.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{it.color} · {it.size}</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0">${it.product.price * it.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : fmt(shipping)}</span>
                </div>
                <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="size-3.5" />
                {subtotal >= FREE_SHIPPING_THRESHOLD ? "You qualify for free shipping!" : `Add ${fmt(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
