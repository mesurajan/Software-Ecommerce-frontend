export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="bg-white p-6 rounded">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
