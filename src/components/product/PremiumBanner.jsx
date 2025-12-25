// src/components/product/PremiumBanner.jsx
import React from "react";
import { Button } from "../../components/ui/button"; 
import { ArrowRight } from "lucide-react";
import premiumsection from "../../assets/Products/premiumsection.png"
import { Link } from "react-router-dom";

const PremiumBanner = () => {
  const stats = [
    { value: "15K+", label: "Happy Customers" },
    { value: "500+", label: "Products" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
<section
  className="relative py-10 overflow-hidden mt-6"
  style={{
    backgroundImage: `url(${premiumsection})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0A174E]/80 via-[#1A2A6C]/70 to-[#3B4CCA]/60" />

  {/* Subtle radial gradients for depth */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0A174E]/30 via-transparent to-transparent" />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1A2A6C]/20 via-transparent to-transparent" />

  {/* Floating blurred lights */}
  <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-[#96A6ED]/20 rounded-full blur-3xl animate-pulse-slow" />
  <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#3B4CCA]/25 rounded-full blur-2xl animate-pulse-slower" />
  <div className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-[#0A174E]/20 rounded-full blur-3xl animate-pulse-slow" />

  {/* Decorative Elements */}
  <div className="absolute top-10 left-10 w-32 h-32 border border-[#1A2A6C]/20 rounded-full" />
  <div className="absolute bottom-10 right-10 w-48 h-48 border border-[#3B4CCA]/20 rounded-full" />
  <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#3B4CCA]/40 rounded-full animate-pulse" />
  <div
    className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#1A2A6C]/30 rounded-full animate-pulse"
    style={{ animationDelay: "1s" }}
  />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <span className="inline-block px-4 py-1.5 bg-[#1A2A6C]/20 text-[#96A6ED] text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
        ✨ Limited Time Offer
      </span>

      <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
        Transform Your Space
        <br />
        <span className="text-[#96A6ED]">Save Up to 40%</span>
      </h2>

      <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
        Discover our curated collection of premium furniture designed to elevate your home. Free shipping on orders over $500.
      </p>

      {/* Buttons */}
     <div className="flex flex-col sm:flex-row gap-4 justify-center pb-4">
                <Link to="/product">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-[#0A174E] hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
    
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-[#0A174E] hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
        {[
          { value: '15K+', label: 'Happy Customers' },
          { value: '500+', label: 'Products' },
          { value: '4.9★', label: 'Rating' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl md:text-3xl font-display font-bold text-[#96A6ED]">{stat.value}</div>
            <div className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
  );
};

export default PremiumBanner;
