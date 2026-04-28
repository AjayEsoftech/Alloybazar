import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export type Product = {
  slug: string;
  name: string;
  image: string;
  subcategories: string[];
  grade?: string;
  standards?: string[];
  productForm?: string[];
  sizeRange?: string;
  supplyCondition?: string[];
  applications?: string[];
  typicalChemistry?: Record<string, string>;
  typicalMechanical?: Record<string, string>;
  testing?: string[];
  documentation?: string[];
  packaging?: string[];
  moq?: string;
  leadTime?: string;
  notes?: string[];
};

type CategorySectionProps = {
  slug: string;
  title: string;
  sideLinks: string[];
  products: Product[];
};

const CategorySection = ({ slug, title, sideLinks, products }: CategorySectionProps) => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="border-t-2 border-amber-brand pt-4">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-950 mb-2 tracking-tight">
            <Link to={`/category/${slug}`} className="hover:text-amber-brand transition-colors">
              {title}
            </Link>
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
            {sideLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                {link}
              </a>
            ))}
            <Link to={`/category/${slug}`} className="text-xs font-bold text-amber-brand hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
