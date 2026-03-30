import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await api.orders.create();
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground">Add some products to get started.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-card rounded-xl p-4 card-shadow">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary shrink-0">
                {item.product.image ? (
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product.id}`} className="font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-1">
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">${Number(item.product.price).toFixed(2)}</p>

                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center text-foreground">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-bold text-card-foreground">${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            <Button size="lg">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
