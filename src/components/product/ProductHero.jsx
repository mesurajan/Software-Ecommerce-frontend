import React from "react";
import { Sparkles } from "lucide-react";

const ProductHero = () => {
  return (
<section className="relative bg-gradient-to-br from-[#96a6ed] via-[#c0c7e3] to-[#f1f1f1] pt-10 pb-20 overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">New Collection 2024</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Discover Your Perfect
            <span className="block text-primary mt-2">Living Space</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Explore our curated collection of premium furniture pieces designed to transform your home into a sanctuary of style and comfort.
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "500+", label: "Products" },
              { value: "50+", label: "Brands" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 39 480 54 576 60.2C672 66.3 768 63.7 864 54.8C960 46 1056 31 1152 28.2C1248 25.3 1344 34.7 1392 39.3L1440 44V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="currentColor" className="text-background"/>
        </svg>
      </div>
    </section>
  );
};

export default ProductHero;
