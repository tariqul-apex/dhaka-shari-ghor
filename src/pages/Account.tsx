import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";

const Account = () => {
  const { count: wishlistCount } = useWishlist();

  return (
    <div className="container py-10 max-w-2xl min-h-[60vh]">
      <div className="flex items-center gap-4 mb-10">
        <div className="size-16 rounded-full bg-foreground grid place-items-center">
          <User className="size-7 text-background" />
        </div>
        <div>
          <h1 className="font-display font-black text-3xl">My account</h1>
          <p className="text-muted-foreground text-sm">Guest — <Link to="/checkout" className="text-primary underline">sign in or create account</Link></p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            icon: Package,
            title: "Orders",
            body: "Track your orders and view your order history.",
            to: "/checkout",
            cta: "View orders",
          },
          {
            icon: Heart,
            title: `Wishlist (${wishlistCount})`,
            body: "Items you've saved for later.",
            to: "/wishlist",
            cta: "View wishlist",
          },
          {
            icon: MapPin,
            title: "Saved addresses",
            body: "Manage your delivery addresses.",
            to: "/checkout",
            cta: "Manage addresses",
          },
          {
            icon: User,
            title: "Account details",
            body: "Update your email, password, and preferences.",
            to: "/checkout",
            cta: "Edit details",
          },
        ].map(({ icon: Icon, title, body, to, cta }) => (
          <Link
            key={title}
            to={to}
            className="block p-6 bg-muted/50 hover:bg-muted rounded-3xl transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="size-10 rounded-2xl bg-foreground grid place-items-center mb-3">
                  <Icon className="size-5 text-background" />
                </div>
                <h3 className="font-display font-bold text-lg">{title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{body}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors mt-1 shrink-0" />
            </div>
            <span className="inline-block mt-4 text-sm text-primary font-medium">{cta}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-5 bg-muted/30 rounded-3xl text-center">
        <p className="text-sm text-muted-foreground mb-3">Create an account to save your order history, wishlist, and addresses across devices.</p>
        <Button asChild variant="hero">
          <Link to="/checkout">Create account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Account;
