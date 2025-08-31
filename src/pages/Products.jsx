import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../api/products";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [formState, setFormState] = useState({ title: "", price: "", category: "", stock: "" });

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, search],
    queryFn: () => fetchProducts({ page, search }),
    keepPreviousData: true,
  });

  const addMutation = useMutation({ mutationFn: addProduct, onSuccess: () => { queryClient.invalidateQueries(["products"]); setOpenAddDialog(false); } });
  const updateMutation = useMutation({ mutationFn: updateProduct, onSuccess: () => { queryClient.invalidateQueries(["products"]); setEditingProduct(null); setOpenEditDialog(false); } });
  const deleteMutation = useMutation({ mutationFn: deleteProduct, onSuccess: () => queryClient.invalidateQueries(["products"]) });

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });
  const handleAddSave = (e) => { e.preventDefault(); addMutation.mutate({ ...formState, price: Number(formState.price), stock: Number(formState.stock) }); };
  const handleEditSave = (e) => { e.preventDefault(); updateMutation.mutate({ ...formState, id: editingProduct.id, price: Number(formState.price), stock: Number(formState.stock) }); };
  const handleDelete = (id) => { if (window.confirm("Are you sure?")) deleteMutation.mutate(id); };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="p-6 md:p-10 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Products</CardTitle>
          <div className="flex space-x-4">
            <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 rounded-md" />
            <Button onClick={() => setOpenAddDialog(true)}>Add Product</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProductTable products={data.products} onEdit={(p) => { setEditingProduct(p); setFormState(p); setOpenEditDialog(true); }} onDelete={handleDelete} />
          <div className="flex justify-between mt-4">
            <Button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>Previous</Button>
            <Button disabled={data.products.length < 10} onClick={() => setPage((old) => old + 1)}>Next</Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Product</DialogTitle></DialogHeader>
          <ProductForm formState={formState} handleChange={handleChange} onSubmit={handleAddSave} submitText="Save" />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
          <ProductForm formState={formState} handleChange={handleChange} onSubmit={handleEditSave} submitText="Update" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
