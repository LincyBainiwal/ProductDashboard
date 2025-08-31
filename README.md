
---

# Product Dashboard

A **responsive web dashboard** to manage products with full CRUD functionality using **React**, **React Query**, and **Tailwind CSS**. Users can view, search, add, update, and delete products. The app integrates with [DummyJSON](https://dummyjson.com/) to fetch dummy product data.

---

## Features

* Responsive design for desktop and mobile.
* View products in a table with pagination.
* **Search** products by name.
* **Filter** products by category.
* **Add**, **Edit**, and **Delete** products using modals.
* Real-time updates using React Query.
* Loading and error handling for API requests.

---

## Tech Stack

* **Frontend:** React, React Router, Tailwind CSS
* **State Management:** React Query
* **API:** Axios + DummyJSON
* **UI Components:** Custom reusable components (Button, Input, Select, Card, Dialog, Avatar)
* **Icons:** Lucide-React

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/product-dashboard.git
cd product-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm run dev
```

4. Open your browser at:

```
http://localhost:5173
```

---

## Usage

1. **View Products:** Navigate to the dashboard to see all products in a paginated table.
2. **Search Products:** Type the full product name in the search input and click **Search**.
3. **Filter by Category:** Select a category from the dropdown and click **Search**.
4. **Add Product:** Click **Add Product**, fill the form, and save.
5. **Edit Product:** Click **Edit** on a product row, update details, and save.
6. **Delete Product:** Click **Delete** on a product row to remove it.

---

## API Integration

The project uses [DummyJSON](https://dummyjson.com/) as the backend. The following endpoints are used:

* `GET /products` → Fetch all products
* `GET /products?limit=10&skip={page}&q={search}` → Search products
* `GET /products/category/{category}` → Filter products by category
* `POST /products/add` → Add a new product
* `PUT /products/{id}` → Update a product
* `DELETE /products/{id}` → Delete a product

---

## Screenshots
<img width="1900" height="865" alt="image" src="https://github.com/user-attachments/assets/d2c9275f-703a-48e4-b6d7-f194ce90ac87" />
<img width="1893" height="856" alt="image" src="https://github.com/user-attachments/assets/f8be7dfe-8d4b-4e71-9c49-b18810883caa" />
<img width="1871" height="855" alt="image" src="https://github.com/user-attachments/assets/8d6750e6-70fa-4f8c-85c8-14702b71ad22" />
<img width="1847" height="860" alt="image" src="https://github.com/user-attachments/assets/5209d5d0-55b3-4635-b6a1-8231b017cbf0" />
<img width="1460" height="655" alt="image" src="https://github.com/user-attachments/assets/a814492d-c23e-4755-907a-4d701dea04ad" />
<img width="1513" height="761" alt="image" src="https://github.com/user-attachments/assets/acd4e3ff-67be-407f-bef6-126c8bc52301" />
---

## Future Enhancements

* Add **user authentication** for admin.
* Integrate **charts and analytics** for product trends.
* Add **drag-and-drop sorting** for products.
* Export product data as **CSV or PDF**.

---

## License

This project is **MIT Licensed** – see the [LICENSE](LICENSE) file for details.

---
