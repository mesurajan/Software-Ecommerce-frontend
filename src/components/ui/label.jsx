export function Label({ children, ...props }) {
  return <label {...props} className="block font-medium mb-1">{children}</label>;
}
