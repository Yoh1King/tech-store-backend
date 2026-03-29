import { Monitor, ShoppingCart } from "lucide-react";

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Monitor className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-foreground">Tech Store</span>
      </div>
      <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
        <ShoppingCart className="h-5 w-5 text-foreground" />
      </button>
    </div>
  </nav>
);

export default Navbar;
