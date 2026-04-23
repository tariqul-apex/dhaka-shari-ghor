import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useRef, useEffect } from "react";
import { products } from "@/data/products";
import { fmt } from "@/lib/currency";

const segments = [
  { label: "Women", to: "/women" },
  { label: "Men", to: "/men" },
  { label: "Kids", to: "/kids" },
];

export const Header = () => {
  const { setOpen, count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const suggestions = searchQuery.trim().length > 1
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-lg border-b border-border">
      {/* announcement bar */}
      <div className="bg-foreground text-background text-xs sm:text-sm py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-12 px-6">
              <span>✨ Free shipping over ৳8,000</span>
              <span>🎉 New Spring drop is live</span>
              <span>↩️ Free 30-day returns</span>
              <span>🌍 Shipping nationwide</span>
              <span>💌 Sign up for 10% off</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container flex items-center justify-between h-16 md:h-20 gap-4">
        <button className="md:hidden p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="font-display font-black text-2xl md:text-3xl tracking-tight">
          Dhaka Shari Ghor
          {/* <span className="text-primary">.</span> */}
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
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
            <Search className="size-5" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex" asChild>
            <Link to="/account"><User className="size-5" /></Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex relative" asChild>
            <Link to="/wishlist">
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-5 grid place-items-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
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

      {/* search bar overlay */}
      {searchOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur">
          <div className="container py-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, fabrics…"
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X className="size-4" />
              </button>
            </form>

            {suggestions.length > 0 && (
              <div className="mt-2 bg-background border border-border rounded-2xl shadow-pop overflow-hidden">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSuggestionClick(p.slug)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                  >
                    <img src={p.image} alt={p.name} className="size-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{p.segment} · {p.category}</p>
                    </div>
                    <span className="ml-auto text-sm font-semibold">{fmt(p.price)}</span>
                  </button>
                ))}
                <button
                  onClick={() => { navigate(`/search?q=${encodeURIComponent(searchQuery)}`); setSearchOpen(false); setSearchQuery(""); }}
                  className="w-full px-4 py-3 text-sm text-primary font-medium hover:bg-muted transition-colors border-t border-border text-left"
                >
                  See all results for &ldquo;{searchQuery}&rdquo; →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-2">
            {segments.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setMobileOpen(false)} className="py-2 text-lg font-medium">
                {s.label}
              </Link>
            ))}
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="py-2 text-lg font-medium">Shop all</Link>
            <div className="border-t border-border my-2" />
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="py-2 text-base flex items-center gap-2">
              <Heart className="size-4" />Wishlist {wishlistCount > 0 && <span className="bg-primary text-primary-foreground rounded-full px-1.5 text-xs">{wishlistCount}</span>}
            </Link>
            <Link to="/account" onClick={() => setMobileOpen(false)} className="py-2 text-base flex items-center gap-2">
              <User className="size-4" />Account
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
