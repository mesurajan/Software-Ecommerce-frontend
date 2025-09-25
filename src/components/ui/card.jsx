export function Card({ children, ...props }) {
  return <div {...props} className="border rounded shadow p-4">{children}</div>;
}

export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
