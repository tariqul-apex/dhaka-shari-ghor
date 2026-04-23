import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { products, segmentMeta, Segment } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const validSegments: (Segment | "all")[] = ["women", "men", "kids", "all"];

const Shop = () => {
  const { segment } = useParams();
  const seg = (segment ?? "all") as Segment | "all";
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Featured");

  const segmentTitle = seg === "all" ? "Shop all" : segmentMeta[seg as Segment].title;
  const tagline = seg === "all" ? "The full bloom collection." : segmentMeta[seg as Segment].tagline;
  const gradient = seg === "all" ? "gradient-hero" : segmentMeta[seg as Segment].gradient;

  const list = useMemo(() => {
    let l = seg === "all" ? products : products.filter((p) => p.segment === seg);
    if (category !== "All") l = l.filter((p) => p.category === category);
    if (sort === "Price: Low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "Price: High") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [seg, category, sort]);

  const categories = useMemo(() => {
    const base = seg === "all" ? products : products.filter((p) => p.segment === seg);
    return ["All", ...Array.from(new Set(base.map((p) => p.category)))];
  }, [seg]);

  if (segment && !validSegments.includes(seg)) return null;

  return (
    <div>
      <section className={`${gradient} py-16 md:py-24`}>
        <div className="container">
          <p className="text-foreground/70 mb-3">Shop /</p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-balance">{segmentTitle}</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-xl">{tagline}</p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === c
                    ? "bg-foreground text-background"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-muted rounded-full px-4 py-2 text-sm font-medium border-0 cursor-pointer"
          >
            <option>Featured</option>
            <option>Price: Low</option>
            <option>Price: High</option>
          </select>
        </div>

        {list.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No products in this view yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg">Load more</Button>
        </div>
      </section>
    </div>
  );
};

export default Shop;
