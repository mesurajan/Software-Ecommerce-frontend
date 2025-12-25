import React from "react";
import { cn } from "../../lib/utils"; // use your utils or a classNames function

const CategoryShowcase = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Browse our wide selection of furniture</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category._id;

            return (
              <button
                key={category._id}
                onClick={() => onSelectCategory(category._id)}
                className={cn(
                  "group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-elegant animate-fade-in",
                  isSelected
                    ? "border-primary bg-[#d7dbf0] shadow-elegant"
                    : "border-border/50 bg-card hover:border-primary/50"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className={cn(
                  "font-semibold text-center mb-1 transition-colors",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {category.name}
                </h3>

                <p className="text-sm text-muted-foreground text-center">{category.count} items</p>

                {isSelected && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary animate-scale-in" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
