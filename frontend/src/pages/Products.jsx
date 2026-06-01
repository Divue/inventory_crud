import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios.js";
import ProductTable from "../components/ProductTable.jsx";
import ProductForm from "../components/ProductForm.jsx";

function Products({ showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchParams] = useSearchParams();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/products");
      setProducts(data.data);
    } catch (err) {
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchParams.get("action") === "add") {
      setShowForm(true);
      setEditProduct(null);
    }
  }, [searchParams]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.supplier.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !categoryFilter || p.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [products, search, categoryFilter]);

  const handleCreate = async (formData) => {
    try {
      await API.post("/products", formData);
      showToast("Product created successfully");
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create product";
      showToast(msg, "error");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await API.put(`/products/${editProduct._id}`, formData);
      showToast("Product updated successfully");
      setShowForm(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update product";
      showToast(msg, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      showToast("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      showToast("Failed to delete product", "error");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Products</h1>
          <p className="text-sm text-surface-500 mt-1">
            {filtered.length} of {products.length} products
          </p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, SKU or supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-primary-500 bg-white min-w-[160px]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ProductTable
        products={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {showForm && (
        <ProductForm
          product={editProduct}
          onSubmit={editProduct ? handleUpdate : handleCreate}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default Products;
