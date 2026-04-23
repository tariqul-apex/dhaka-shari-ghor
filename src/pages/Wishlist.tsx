import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { items } = useWishlist();

  return (
    <div className="container py-10 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="font-display font-black text-4xl md:text-5xl">Wishlist</h1>
        <p className="text-muted-foreground mt-2">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
      </div>

      {items.length === 0 ? (
        <div className="py-20 flex flex-col items-center gap-5 text-center">
          <div className="size-24 rounded-full bg-foreground grid place-items-center">
            <Heart className="size-10 text-background" />
          </div>
          <h2 className="font-display font-bold text-2xl">Nothing saved yet</h2>
          <p className="text-muted-foreground max-w-sm">
            Tap the heart on any product to save it here. Your wishlist is saved across sessions.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/shop">Start browsing <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
