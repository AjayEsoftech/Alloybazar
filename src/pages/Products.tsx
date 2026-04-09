import { useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-4">
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>{" "}
              <span className="mx-2">/</span>
              <span className="text-foreground">Products</span>
            </div>
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">All products</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Browse the full alloy steel catalogue across categories, grades, and product forms.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            {categories.map((category) => (
              <div key={category.slug} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{category.title}</h2>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    )}
                  </div>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View category
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
