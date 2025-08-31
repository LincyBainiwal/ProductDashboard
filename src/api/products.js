import axios from "axios"

export const fetchProducts = async (limit = 10, skip = 0) => {
  const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  return res.data
}
