import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async ({ page = 1, search = "", category = "", delay = 0 }) => {
  let url;

  if (category) {
    // Use category endpoint if category is selected
    url = `${BASE_URL}/category/${encodeURIComponent(category)}?limit=10&skip=${(page - 1) * 10}&delay=${delay}`;
  } else {
    // Default endpoint
    url = `${BASE_URL}?limit=10&skip=${(page - 1) * 10}&delay=${delay}`;
    if (search) url += `&q=${encodeURIComponent(search)}`;
  }

  const { data } = await axios.get(url);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axios.post(`${BASE_URL}/add`, product);
  return data;
};

export const updateProduct = async (product) => {
  const { data } = await axios.put(`${BASE_URL}/${product.id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};
