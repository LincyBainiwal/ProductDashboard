import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function ProductForm({ formState, handleChange, onSubmit, submitText }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formState.title} onChange={handleChange} required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" value={formState.price} onChange={handleChange} required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" value={formState.category} onChange={handleChange} required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" name="stock" type="number" value={formState.stock} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">{submitText}</Button>
    </form>
  );
}
