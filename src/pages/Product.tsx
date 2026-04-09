import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import BulletIcon from "@/components/icons/BulletIcon";

const ProductPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const match = (() => {
    for (const category of categories) {
      const product = category.products.find((p) => p.slug === slug);
      if (product) return { category, product };
    }
    return null;
  })();

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="max-w-5xl mx-auto px-4 py-16 space-y-3">
            <p className="text-sm text-muted-foreground">Product not found.</p>
            <Link className="text-primary underline" to="/">
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { category, product } = match;

  const specRows: Array<{ label: string; value?: string }> = [
    { label: "Grade", value: product.grade },
    { label: "Standards", value: product.standards?.join(", ") },
    { label: "Product form", value: product.productForm?.join(", ") },
    { label: "Size range", value: product.sizeRange },
    { label: "Supply condition", value: product.supplyCondition?.join(", ") },
    { label: "MOQ", value: product.moq },
    { label: "Lead time", value: product.leadTime },
  ].filter((r) => r.value);

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
              <Link to={`/category/${category.slug}`} className="hover:text-foreground transition-colors">
                {category.title}
              </Link>{" "}
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </div>

            <div className="grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[240px] aspect-square object-cover rounded-xl border bg-muted"
              />

              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">{product.name}</h1>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                  {product.notes?.[0] ??
                    "Specification overview to help you align grade, form, condition, testing and documentation before requesting a quote."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.subcategories.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild>
                    <Link to="/#lead">Request a quote / early access</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/category/${category.slug}`}>Back to {category.title}</Link>
                  </Button>
                </div>
              </div>
            </div>

            {specRows.length > 0 && (
              <div className="pt-6">
                <h2 className="text-lg font-semibold">Key specifications</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {specRows.map((r) => (
                    <div key={r.label} className="rounded-lg border bg-background p-3">
                      <div className="text-xs text-muted-foreground">{r.label}</div>
                      <div className="text-sm font-medium">{r.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(product.typicalChemistry || product.typicalMechanical) && (
              <div className="pt-8 grid gap-6 md:grid-cols-2">
                {product.typicalChemistry && (
                  <section className="rounded-xl border bg-background p-4">
                    <h2 className="text-base font-semibold">Typical chemistry (wt.%)</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Typical ranges; actual values depend on mill and heat.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {Object.entries(product.typicalChemistry).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">{k}</span>
                          <span className="font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {product.typicalMechanical && (
                  <section className="rounded-xl border bg-background p-4">
                    <h2 className="text-base font-semibold">Typical mechanical properties</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Highly dependent on heat treatment and section size.
                    </p>
                    <div className="mt-3 space-y-2 text-sm">
                      {Object.entries(product.typicalMechanical).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">{k}</span>
                          <span className="font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {(product.applications || product.testing || product.documentation || product.packaging || product.notes) && (
              <div className="pt-8 grid gap-6 md:grid-cols-2">
                {product.applications && (
                  <section className="rounded-xl border bg-background p-4">
                    <h2 className="text-base font-semibold">Applications</h2>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {product.applications.map((a) => (
                        <li key={a} className="flex gap-2">
                          <BulletIcon className="mt-1" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {(product.testing || product.documentation) && (
                  <section className="rounded-xl border bg-background p-4">
                    <h2 className="text-base font-semibold">Testing & documentation</h2>
                    <div className="mt-3 space-y-4 text-sm">
                      {product.testing && (
                        <div>
                          <div className="text-xs text-muted-foreground">Testing</div>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            {product.testing.map((t) => (
                              <li key={t} className="flex gap-2">
                                <BulletIcon className="mt-1" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {product.documentation && (
                        <div>
                          <div className="text-xs text-muted-foreground">Documentation</div>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            {product.documentation.map((d) => (
                              <li key={d} className="flex gap-2">
                                <BulletIcon className="mt-1" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </section>
                )}
                {product.packaging && (
                  <section className="rounded-xl border bg-background p-4">
                    <h2 className="text-base font-semibold">Packaging</h2>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {product.packaging.map((p) => (
                        <li key={p} className="flex gap-2">
                          <BulletIcon className="mt-1" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {product.notes && product.notes.length > 1 && (
                  <section className="rounded-xl border bg-background p-4">
                    <h2 className="text-base font-semibold">Notes</h2>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {product.notes.slice(1).map((n) => (
                        <li key={n} className="flex gap-2">
                          <BulletIcon className="mt-1" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
