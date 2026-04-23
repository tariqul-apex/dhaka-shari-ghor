import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { products, segmentMeta, Segment, ageRanges, AgeRange } from "@/data/products";
import { fmt } from "@/lib/currency";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

const validSegments: (Segment | "all")[] = ["women", "men", "kids", "all"];

const FREE_SHIPPING_THRESHOLD = 80;

const Shop = () => {
  const { segment } = useParams();
  const seg = (segment ?? "all") as Segment | "all";

  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Featured");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<AgeRange[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const baseList = useMemo(
    () => (seg === "all" ? products : products.filter((p) => p.segment === seg)),
    [seg],
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(baseList.map((p) => p.category)))],
    [baseList],
  );

  const allSizes = useMemo(
    () => Array.from(new Set(baseList.flatMap((p) => p.sizes))),
    [baseList],
  );

  const allColors = useMemo(
    () => Array.from(new Map(baseList.flatMap((p) => p.colors).map((c) => [c.name, c])).values()),
    [baseList],
  );

  const list = useMemo(() => {
    let l = [...baseList];
    if (category !== "All") l = l.filter((p) => p.category === category);
    if (selectedSizes.length > 0) l = l.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
    if (selectedColors.length > 0) l = l.filter((p) => selectedColors.some((c) => p.colors.some((pc) => pc.name === c)));
    l = l.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (seg === "kids" && selectedAgeRanges.length > 0) {
      l = l.filter((p) => p.ageRange && selectedAgeRanges.includes(p.ageRange));
    }
    if (sort === "Price: Low") l = l.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High") l = l.sort((a, b) => b.price - a.price);
    else if (sort === "Newest") l = l.sort((a, b) => (a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0));
    else if (sort === "Sale") l = l.sort((a, b) => (a.compareAt ? -1 : b.compareAt ? 1 : 0));
    return l;
  }, [baseList, category, selectedSizes, selectedColors, priceRange, selectedAgeRanges, sort, seg]);

  const hasActiveFilters =
    category !== "All" ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 30000 ||
    selectedAgeRanges.length > 0;

  const clearAllFilters = () => {
    setCategory("All");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 300]);
    setSelectedAgeRanges([]);
  };

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleColor = (c: string) =>
    setSelectedColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const toggleAgeRange = (a: AgeRange) =>
    setSelectedAgeRanges((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  if (segment && !validSegments.includes(seg)) return null;

  const segmentTitle = seg === "all" ? "Shop all" : segmentMeta[seg as Segment].title;
  const tagline = seg === "all" ? "The full bloom collection." : segmentMeta[seg as Segment].tagline;
  const gradient = seg === "all" ? "gradient-hero" : segmentMeta[seg as Segment].gradient;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <p className="text-sm font-semibold mb-3 uppercase tracking-wider">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === c ? "bg-foreground text-background" : "bg-muted hover:bg-muted/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Kids age range */}
      {seg === "kids" && (
        <div>
          <p className="text-sm font-semibold mb-3 uppercase tracking-wider">Age range</p>
          <div className="flex flex-wrap gap-2">
            {ageRanges.map((a) => (
              <button
                key={a}
                onClick={() => toggleAgeRange(a)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedAgeRanges.includes(a) ? "bg-foreground text-background" : "bg-muted hover:bg-muted/70"
                }`}
              >
                {a} yrs
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      <div>
        <p className="text-sm font-semibold mb-3 uppercase tracking-wider">Size</p>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`min-w-[2.75rem] h-9 px-3 rounded-lg text-xs font-semibold transition-all ${
                selectedSizes.includes(s) ? "bg-foreground text-background" : "bg-muted hover:bg-muted/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <p className="text-sm font-semibold mb-3 uppercase tracking-wider">Color</p>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              title={c.name}
              className={`size-8 rounded-full ring-2 transition-all ${
                selectedColors.includes(c.name) ? "ring-foreground scale-110" : "ring-transparent hover:ring-border"
              }`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
            />
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-sm font-semibold mb-3 uppercase tracking-wider">
          Price — <span className="font-normal text-muted-foreground">{fmt(priceRange[0])} – {fmt(priceRange[1])}</span>
        </p>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={30000}
            step={500}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>৳0</span><span>৳30,000</span>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium"
        >
          <X className="size-3.5" />Clear all filters
        </button>
      )}
    </div>
  );

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
        {/* mobile: filter toggle + sort row */}
        <div className="flex items-center justify-between gap-4 mb-6 lg:hidden">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              hasActiveFilters ? "bg-foreground text-background" : "bg-muted hover:bg-muted/70"
            }`}
          >
            <SlidersHorizontal className="size-4" />
            Filters {hasActiveFilters && `(${[category !== "All", selectedSizes.length > 0, selectedColors.length > 0, priceRange[0] > 0 || priceRange[1] < 30000, selectedAgeRanges.length > 0].filter(Boolean).length})`}
            {filtersOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-muted rounded-full px-4 py-2 text-sm font-medium border-0 cursor-pointer"
          >
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low</option>
            <option>Price: High</option>
            <option>Sale</option>
          </select>
        </div>

        {/* mobile filter panel */}
        {filtersOpen && (
          <div className="lg:hidden bg-muted/40 rounded-3xl p-5 mb-6 border border-border">
            <FilterPanel />
          </div>
        )}

        <div className="flex gap-8">
          {/* desktop sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><SlidersHorizontal className="size-4" />Filters</h3>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs text-primary hover:text-primary/80">Clear all</button>
              )}
            </div>
            <FilterPanel />
          </aside>

          {/* products */}
          <div className="flex-1 min-w-0">
            <div className="hidden lg:flex items-center justify-between mb-6 gap-4">
              <p className="text-sm text-muted-foreground">{list.length} product{list.length !== 1 ? "s" : ""}</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-muted rounded-full px-4 py-2 text-sm font-medium border-0 cursor-pointer"
              >
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low</option>
                <option>Price: High</option>
                <option>Sale</option>
              </select>
            </div>

            {list.length === 0 ? (
              <div className="py-20 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-muted-foreground mb-3">No products match your filters.</p>
                <button onClick={clearAllFilters} className="text-sm text-primary underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {list.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            <div className="mt-16 text-center">
              <p className="text-xs text-muted-foreground">
                {list.length} of {baseList.length} products shown
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
