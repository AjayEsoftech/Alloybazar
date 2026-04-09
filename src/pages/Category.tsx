import { Link, useParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/categories";

const CategoryPage = () => {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="max-w-5xl mx-auto px-4 py-16 space-y-3">
            <p className="text-sm text-muted-foreground">Category not found.</p>
            <Link className="text-primary underline" to="/">
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-4">
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>{" "}
              <span className="mx-2">/</span>
              <span className="text-foreground">{category.title}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">{category.title}</h1>
            <div className="flex flex-wrap gap-2">
              {category.sideLinks.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;

