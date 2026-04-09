import type { Product } from "./CategorySection";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="flex items-start gap-3 bg-card rounded-lg border border-im-border p-3 hover:shadow-md transition-shadow"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md bg-muted shrink-0"
      />
      <div className="min-w-0">
        <h3 className="font-semibold text-sm text-foreground hover:text-primary transition-colors">
          {product.name}
        </h3>
        <ul className="mt-1 space-y-0.5">
          {product.subcategories.map((sub) => (
            <li key={sub}>
              <span className="text-xs text-im-blue-light">{sub}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default ProductCard;
