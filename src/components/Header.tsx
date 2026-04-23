import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const segments = [
  { label: "Women", to: "/women" },
  { label: "Men", to: "/men" },
  { label: "Kids", to: "/kids" },
];

export const Header = () => {
  const { setOpen, count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-lg border-b border-border">
      {/* announcement bar */}
      <div className="gradient-sunny text-foreground text-xs sm:text-sm py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-12 px-6">
              <span>✨ Free shipping over $80</span>
              <span>🎉 New Spring drop is live</span>
              <span>↩️ Free 30-day returns</span>
              <span>🌍 Shipping worldwide</span>
              <span>💌 Sign up for 10% off</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container flex items-center justify-between h-16 md:h-20 gap-4">
        <button className="md:hidden p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          <Menu className="size-5" />
        </button>

        <Link to="/" className="font-display font-black text-2xl md:text-3xl tracking-tight">
          bloom<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          {segments.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              className={({ isActive }) =>
                `relative py-2 transition-colors ${isActive ? "text-primary" : "hover:text-primary"}`
              }
            >
              {s.label}
            </NavLink>
          ))}
          <NavLink to="/shop" className={({ isActive }) => `py-2 ${isActive ? "text-primary" : "hover:text-primary"}`}>
            Shop all
          </NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search"><Search className="size-5" /></Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex"><User className="size-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex"><Heart className="size-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Cart" onClick={() => setOpen(true)} className="relative">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-5 grid place-items-center">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-2">
            {segments.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setMobileOpen(false)} className="py-2 text-lg font-medium">
                {s.label}
              </Link>
            ))}
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="py-2 text-lg font-medium">Shop all</Link>
          </div>
        </nav>
      )}
    </header>
  );
};
