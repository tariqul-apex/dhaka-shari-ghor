import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search as SearchIcon, X } from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.segment.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q),
    );
  }, [query]);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container py-10 min-h-[60vh]">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-8">Search</h1>

      <div className="relative max-w-2xl mb-10">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for products, categories, fabrics…"
          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-muted border border-border text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {query && (
          <button
            onClick={() => handleChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {!query && (
        <div className="py-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-muted-foreground text-lg">Start typing to discover products</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {["knitwear", "trousers", "jacket", "kids", "organic cotton", "outerwear"].map((s) => (
              <button
                key={s}
                onClick={() => handleChange(s)}
                className="px-4 py-2 rounded-full bg-muted hover:bg-muted/70 text-sm font-medium capitalize transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-muted-foreground text-lg">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-muted-foreground text-sm mt-2">Try checking your spelling or browsing our collections instead.</p>
        </div>
      )}

      {query && results.length > 0 && (
        <>
          <p className="text-muted-foreground mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
