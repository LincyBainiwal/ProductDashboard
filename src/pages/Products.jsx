import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react"; 

const fetchProducts = async (page, search) => {
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}&q=${search}`
  );
  return data;
};

const addProduct = async (newProduct) => {
  const { data } = await axios.post("https://dummyjson.com/products/add", newProduct);
  return data;
};

const updateProduct = async (updatedProduct) => {
  const { data } = await axios.put(
    `https://dummyjson.com/products/${updatedProduct.id}`,
    updatedProduct
  );
  return data;
};

const deleteProduct = async (id) => {
  const { data } = await axios.delete(`https://dummyjson.com/products/${id}`);
  return data;
};

export default function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [formState, setFormState] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingProduct) {
      setFormState({
        title: editingProduct.title,
        price: editingProduct.price,
        category: editingProduct.category,
        stock: editingProduct.stock,
      });
    }
  }, [editingProduct]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, search],
    queryFn: () => fetchProducts(page, search),
    keepPreviousData: true,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setOpenAddDialog(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditingProduct(null);
      setOpenEditDialog(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSave = (e) => {
    e.preventDefault();
    addMutation.mutate({
      title: formState.title,
      price: Number(formState.price),
      category: formState.category,
      stock: Number(formState.stock),
    });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      ...formState,
      id: editingProduct.id,
      price: Number(formState.price),
      stock: Number(formState.stock),
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
            <div className="relative w-full md:w-1/2">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Search className="h-5 w-5" />
              </span>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button
              onClick={() => setOpenAddDialog(true)}
              className="p-2 w-full md:w-auto md:ml-4 flex items-center rounded-md justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1 text-left">Title</th>
                  <th className="border px-2 py-1 text-left">Price</th>
                  <th className="border px-2 py-1 text-left">Category</th>
                  <th className="border px-2 py-1 text-left">Stock</th>
                  <th className="border px-2 py-1 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{product.title}</td>
                    <td className="border px-2 py-1">${product.price}</td>
                    <td className="border px-2 py-1">{product.category}</td>
                    <td className="border px-2 py-1">{product.stock}</td>
                    <td className="border px-2 py-1 space-x-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingProduct(product);
                          setOpenEditDialog(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
            >
              Previous
            </Button>
            <Button
              disabled={data.products.length < 10}
              onClick={() => setPage((old) => old + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form className="space-y-2" onSubmit={handleAddSave}>
            <Input name="title" placeholder="Title" required />
            <Input name="price" type="number" placeholder="Price" required />
            <Input name="category" placeholder="Category" required />
            <Input name="stock" type="number" placeholder="Stock" required />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form className="space-y-2" onSubmit={handleEditSave}>
            <Input
              name="title"
              placeholder="Title"
              value={formState.title}
              onChange={handleChange}
              required
            />
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formState.price}
              onChange={handleChange}
              required
            />
            <Input
              name="category"
              placeholder="Category"
              value={formState.category}
              onChange={handleChange}
              required
            />
            <Input
              name="stock"
              type="number"
              placeholder="Stock"
              value={formState.stock}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
