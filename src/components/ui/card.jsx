// src/components/ui/card.jsx
import React from "react";

// Utility for merging classNames (you can replace this with your existing cn function if you have one)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Old style exports (keeps backward compatibility)
export function Card({ children, className = "", ...props }) {
  return (
    <div {...props} className={cn("border rounded shadow p-4 bg-white", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div {...props} className={cn("border-b p-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 {...props} className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div {...props} className={cn(className)}>
      {children}
    </div>
  );
}

// New additions without affecting old ones
export function CardDescription({ children, className = "", ...props }) {
  return (
    <p {...props} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div {...props} className={cn("flex items-center p-4 pt-0", className)}>
      {children}
    </div>
  );
}
