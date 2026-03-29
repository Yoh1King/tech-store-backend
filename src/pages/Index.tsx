import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { mockCategories, mockProducts } from "@/lib/mock-data";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredProducts = useMemo(
    () => mockProducts.filter((p) => p.featured),
    []
  );

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">⚡ Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-foreground mb-6">All Products</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter categories={mockCategories} selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 Tech Store. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
