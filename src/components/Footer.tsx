import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => (
  <footer className="mt-24 bg-foreground text-background">
    <div className="container py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2 space-y-4">
        <div className="font-display font-black text-3xl">Dhaka Shari Ghor
          {/* <span className="text-primary">.</span> */}
          </div>
        <p className="text-background/70 max-w-sm">
          Color-forward, joyfully made clothing for women, men and kids. Designed in our studio, made by people we know.
        </p>
        <form className="flex gap-2 max-w-sm pt-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            placeholder="your@email.com"
            className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full"
          />
          <Button type="submit" variant="hero">Join</Button>
        </form>
      </div>
      <div>
        <h4 className="font-display text-lg mb-4">Shop</h4>
        <ul className="space-y-2 text-background/70 text-sm">
          <li><Link to="/women" className="hover:text-primary">Women</Link></li>
          <li><Link to="/men" className="hover:text-primary">Men</Link></li>
          <li><Link to="/kids" className="hover:text-primary">Kids</Link></li>
          <li><Link to="/shop" className="hover:text-primary">All clothing</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg mb-4">Help</h4>
        <ul className="space-y-2 text-background/70 text-sm">
          <li><Link to="/policy/shipping" className="hover:text-primary">Shipping policy</Link></li>
          <li><Link to="/policy/returns" className="hover:text-primary">Returns & exchanges</Link></li>
          <li><Link to="/policy/privacy" className="hover:text-primary">Privacy policy</Link></li>
          <li><Link to="/policy/terms" className="hover:text-primary">Terms of service</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-background/10">
      <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/60">
        <p>© 2026 Dhaka Shari Ghor. All rights reserved.</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-background/10" aria-label="Instagram"><Instagram className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="hover:bg-background/10" aria-label="Twitter"><Twitter className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="hover:bg-background/10" aria-label="Facebook"><Facebook className="size-4" /></Button>
        </div>
      </div>
    </div>
  </footer>
);
