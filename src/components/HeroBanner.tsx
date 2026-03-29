import { ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroBanner = () => (
  <section className="hero-gradient py-20 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
        <Zap className="h-4 w-4 text-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground">New arrivals every week</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 tracking-tight">
        Tech Store
      </h1>
      <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
        Discover the latest in tech. Premium gadgets, unbeatable prices.
      </p>
      <Button
        size="lg"
        variant="secondary"
        className="rounded-full px-8 text-base font-semibold gap-2"
        onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ShoppingBag className="h-5 w-5" />
        Shop Now
      </Button>
    </div>
  </section>
);

export default HeroBanner;
