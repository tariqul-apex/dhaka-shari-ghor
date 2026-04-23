import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, segmentMeta } from "@/data/products";
import heroWomen from "@/assets/hero-women.jpg";
import heroMen from "@/assets/hero-men.jpg";
import heroKids from "@/assets/hero-kids.jpg";
import { ArrowRight, Truck, Recycle, Heart } from "lucide-react";

const segmentImages = { women: heroWomen, men: heroMen, kids: heroKids } as const;

const Index = () => {
  const featured = products.slice(0, 8);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-secondary/40 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-24 size-96 rounded-full bg-primary/40 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="container relative pt-12 pb-20 md:pt-20 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Spring '26 collection is here
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
              Wear the<br />
              <span className="italic text-primary">happy</span> stuff.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-md">
              Color-forward clothing for women, men and the kids who set the tone. Made joyfully, in small batches.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">Shop the drop <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/women">Womenswear</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[460px] md:h-[600px] hidden lg:block">
            <img
              src={heroWomen}
              alt="Coral knit and cream trousers flat lay"
              width={1200}
              height={1500}
              className="absolute top-0 right-12 w-72 rounded-3xl shadow-pop rotate-[-6deg] hover:rotate-0 transition-transform duration-500"
            />
            <img
              src={heroMen}
              alt="Mustard polo on mint backdrop"
              loading="lazy"
              width={1200}
              height={1500}
              className="absolute bottom-12 left-0 w-64 rounded-3xl shadow-pop rotate-[5deg] hover:rotate-0 transition-transform duration-500"
            />
            <img
              src={heroKids}
              alt="Kids in colorful stripes jumping"
              loading="lazy"
              width={1200}
              height={1500}
              className="absolute bottom-0 right-0 w-56 rounded-3xl shadow-pop rotate-[-3deg] hover:rotate-0 transition-transform duration-500"
            />
          </div>

          {/* mobile collage */}
          <div className="grid grid-cols-3 gap-3 lg:hidden">
            <img src={heroWomen} alt="" className="rounded-2xl aspect-[3/4] object-cover shadow-soft rotate-[-3deg]" />
            <img src={heroKids} alt="" loading="lazy" className="rounded-2xl aspect-[3/4] object-cover shadow-soft mt-6" />
            <img src={heroMen} alt="" loading="lazy" className="rounded-2xl aspect-[3/4] object-cover shadow-soft rotate-[3deg]" />
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl">Pick your aisle</h2>
            <p className="text-muted-foreground mt-2">Three worlds, one wardrobe philosophy.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {(["women", "men", "kids"] as const).map((seg, i) => (
            <Link
              key={seg}
              to={`/${seg}`}
              className={`group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card hover:shadow-pop transition-all duration-500 hover:-translate-y-1`}
            >
              <img
                src={segmentImages[seg]}
                alt={segmentMeta[seg].title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-background">
                <span className="text-3xl mb-2">{segmentMeta[seg].emoji}</span>
                <h3 className="font-display font-black text-4xl md:text-5xl">{segmentMeta[seg].title}</h3>
                <p className="text-background/85 mt-1">{segmentMeta[seg].tagline}</p>
                <span className="inline-flex items-center gap-2 mt-4 font-semibold">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container py-12">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl">This week's bloom</h2>
            <p className="text-muted-foreground mt-2">Editor-picked pieces, hand-on-heart approved.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">Shop all <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* LOOKBOOK STRIP */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-[2.5rem] overflow-hidden gradient-mint p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center shadow-pop">
            <div className="space-y-5 text-foreground">
              <span className="inline-block bg-foreground text-background text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Lookbook
              </span>
              <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95]">
                A year of <span className="italic">color</span>, no apologies.
              </h2>
              <p className="text-foreground/80 text-lg max-w-md">
                Our spring story: 24 looks built around four hero hues — coral, mustard, terracotta and teal.
              </p>
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link to="/shop">See the lookbook</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={heroKids} alt="" loading="lazy" className="rounded-2xl aspect-[3/4] object-cover" />
              <img src={heroMen} alt="" loading="lazy" className="rounded-2xl aspect-[3/4] object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="container py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Free shipping over $80", body: "Anywhere in the continental US." },
            { icon: Recycle, title: "30-day easy returns", body: "Don't love it? Send it back, on us." },
            { icon: Heart, title: "Made in small batches", body: "By people we know, paid fairly." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-8 rounded-3xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="size-12 rounded-2xl gradient-coral grid place-items-center text-primary-foreground mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display font-bold text-xl mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
