
export function Dialog({ children, open, onOpenChange }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
export function DialogContent({ children }) {
  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-md mx-auto">
      {children}
    </div>
  );
}
export function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}
export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}