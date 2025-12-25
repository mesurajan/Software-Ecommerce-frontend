// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div {...props} className={`border rounded shadow p-4 bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div {...props} className={`border-b p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 {...props} className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}
