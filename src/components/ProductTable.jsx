import { Button } from "./ui/button";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return <div className="text-gray-500 text-center py-6">No products found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Title</th>
            <th className="border px-3 py-2 text-left">Price</th>
            <th className="border px-3 py-2 text-left">Category</th>
            <th className="border px-3 py-2 text-left">Stock</th>
            <th className="border px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{product.title}</td>
              <td className="border px-3 py-2">${product.price}</td>
              <td className="border px-3 py-2">{product.category}</td>
              <td className="border px-3 py-2">{product.stock}</td>
              <td className="border px-3 py-2 space-x-2">
                <Button size="sm" onClick={() => onEdit(product)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
