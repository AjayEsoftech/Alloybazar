import type { Product } from "./CategorySection";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex items-start gap-3 bg-white rounded-xl border border-zinc-200 p-3 hover:shadow-md hover:border-amber-brand/40 transition-all"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-lg bg-zinc-100 shrink-0"
      />
      <div className="min-w-0">
        <h3 className="font-semibold text-sm text-zinc-950 group-hover:text-amber-brand transition-colors">
          {product.name}
        </h3>
        <ul className="mt-1 space-y-0.5">
          {product.subcategories.map((sub) => (
            <li key={sub}>
              <span className="text-xs text-zinc-500">{sub}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default ProductCard;
