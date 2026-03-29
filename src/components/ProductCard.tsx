import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-muted-foreground">{product.category.name}</span>
        <h3 className="font-semibold text-card-foreground mt-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-card-foreground">
            ${Number(product.price).toFixed(2)}
          </span>
          <Button
            size="sm"
            className="rounded-full gap-1.5"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.stock === 0 ? "Sold Out" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
