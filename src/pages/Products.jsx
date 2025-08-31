import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [formState, setFormState] = useState({ title: "", price: "", category: "", stock: "" });

  const queryClient = useQueryClient();


  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, search, category],
    queryFn: () => fetchProducts({ page, search, category, delay: 300 }),
    keepPreviousData: true,
  });


  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setOpenAddDialog(false);
      setFormState({ title: "", price: "", category: "", stock: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditingProduct(null);
      setOpenEditDialog(false);
      setFormState({ title: "", price: "", category: "", stock: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });
  const handleAddSave = (e) => {
    e.preventDefault();
    addMutation.mutate({
      ...formState,
      price: Number(formState.price),
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
    if (window.confirm("Are you sure?")) deleteMutation.mutate(id);
  };

  useEffect(() => setPage(1), [search, category]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6">Error loading products.</div>;
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "women-dresses",
    "women-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  return (
    <div className="p-4 md:p-8 space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <CardTitle>Products</CardTitle>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <Select onValueChange={(val) => setCategory(val)} value={category}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={() => { setPage(1); setSearch(searchTerm); setCategory(selectedCategory); }}>Search</Button>

            </div>

            <Button onClick={() => setOpenAddDialog(true)}>Add Product</Button>
          </div>
        </CardHeader>

        <CardContent>
          <ProductTable
            products={data.products}
            onEdit={(p) => {
              setEditingProduct(p);
              setFormState(p);
              setOpenEditDialog(true);
            }}
            onDelete={handleDelete}
          />

          <div className="flex justify-between mt-4">
            <Button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
              Previous
            </Button>
            <div className="text-gray-600 self-center">
              Page {page} / {Math.ceil(data.total / 10)}
            </div>
            <Button disabled={data.products.length < 10} onClick={() => setPage((old) => old + 1)}>
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
          <ProductForm formState={formState} handleChange={handleChange} onSubmit={handleAddSave} submitText="Save" />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm formState={formState} handleChange={handleChange} onSubmit={handleEditSave} submitText="Update" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
