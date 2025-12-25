// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart, Shield, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import AppBreadcrumbs from "../components/Breadcrumbs";
import WhatshopOffers from "./home/utils/WhatshopOffers";

// Images
import heroImage from "../assets/aboutus/hero-furniture.jpg";
import craftsmanshipImage from "../assets/aboutus/craftsmanship.jpg";
import materialsImage from "../assets/aboutus/materials.jpg";
import premiumsection from "../assets/Products/premiumsection.png"

const AboutUs = () => {
  const stats = [
    { number: "15K+", label: "Happy Customers" },
    { number: "2,500", label: "Products Curated" },
    { number: "50+", label: "Expert Designers" },
    { number: "7", label: "Years of Excellence" },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description:
        "We partner with eco-conscious manufacturers and use responsibly sourced materials to minimize our environmental footprint.",
    },
    {
      icon: Heart,
      title: "Crafted with Love",
      description:
        "Every piece in our collection is handpicked by our design team, ensuring quality and aesthetic excellence.",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "We stand behind every product with our comprehensive warranty and hassle-free return policy.",
    },
    {
      icon: Sparkles,
      title: "Timeless Design",
      description:
        "Our furniture transcends trends, offering pieces that remain beautiful and functional for generations.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A174E] container">

      {/* Breadcrumb & Header */}
      <div className="bg-backgroundlite py-4 pt-20">
        <h1 className="text-3xl font-bold px-4 text-mainbackground">About Us</h1>
        <AppBreadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden ">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="HEKTO furniture showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A174E]/90 via-[#0A174E]/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-20 text-white px-10">
          <div className="max-w-2xl ">
            <span className="inline-block text-secondary font-body text-sm uppercase tracking-[0.3em] mb-4 ">
              Est. 2025
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Crafting Spaces,
              <br />
              <span className="text-secondary">Creating Stories</span>
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed max-w-xl">
              At HEKTO, we believe furniture is more than just objects — it's the
              foundation of your home's story. Every piece we curate is designed
              to inspire, comfort, and endure.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0A174E]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-body text-sm md:text-base uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


        {/* Values Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 ">
            <span className="inline-block text-[#0A174E] font-body text-sm uppercase tracking-[0.3em] mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Our commitment to excellence goes beyond beautiful furniture — it's
              woven into everything we do.
            </p>
          </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group p-8 bg-[#0A174E] rounded-lg shadow-soft
                        hover:shadow-elevated hover:-translate-y-2 hover:scale-105
                        transition-all duration-300 ease-in-out"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center  mb-6
                              group-hover:bg-white/20 transition-all duration-300 ease-in-out">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-xl text-white mb-3">
                {value.title}
              </h3>
              <p className="text-white font-body leading-relaxed text-left tracking-wide">
                {value.description}
              </p>
            </div>
          ))}
      </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-[#0A174E] font-body text-sm uppercase tracking-[0.3em] mb-4">
                Our Story
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-[#0A174E] mb-6">
                From Passion to Purpose
              </h2>
              <div className="space-y-4 text-muted-foreground font-body text-lg leading-relaxed">
                <p>
                  HEKTO was born from a simple belief: everyone deserves a home
                  that reflects their unique story. What started in 2025 as a
                  small curated collection has grown into a beloved destination
                  for discerning homeowners.
                </p>
                <p>
                  Our founders, passionate about design and sustainability, set
                  out to bridge the gap between premium craftsmanship and
                  accessible luxury. Today, we continue that mission by
                  partnering with artisans and manufacturers who share our
                  vision.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={craftsmanshipImage}
                  alt="Craftsmanship"
                  className="w-full h-64 md:h-72 lg:h-80 rounded-lg shadow-elevated object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-lg -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-secondary/30 rounded-lg -z-10" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="relative">
                <img
                  src={materialsImage}
                  alt="Premium Materials"
                  className="w-full h-64 md:h-72 lg:h-80 rounded-lg shadow-elevated object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
              </div>
            </div>
            <div>
              <span className="inline-block text-secondary font-body text-sm uppercase tracking-[0.3em] mb-4">
                Our Commitment
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                Premium Materials, Conscious Choices
              </h2>
              <div className="space-y-4 text-muted-foreground font-body text-lg leading-relaxed">
                <p>
                  Every piece of furniture tells a story through its materials.
                  We source premium hardwoods from certified sustainable forests,
                  upholstery from ethical suppliers, and finishes that are both
                  durable and eco-friendly.
                </p>
                <p>
                  Our quality control process ensures that each item meets our
                  rigorous standards before it reaches your home. Because we
                  believe that true luxury lies in longevity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* CTA Section */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
         backgroundImage: `url(${premiumsection})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A174E]/90 via-[#0A174E]/80 to-[#0A174E]/80"></div>

        <div className="container relative z-10 text-center px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-white/80 font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Discover our curated collection of furniture that combines timeless
            design with modern comfort. Your dream home is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

        </div>
      </section>
    </div>
  );
};

export default AboutUs;
