import { useState, useEffect } from "react";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  quantity: "",
  price: "",
  supplier: "",
  description: "",
};

function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        quantity: product.quantity?.toString() || "",
        price: product.price?.toString() || "",
        supplier: product.supplier || "",
        description: product.description || "",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [product]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.sku.trim()) e.sku = "SKU is required";
    if (!form.category.trim()) e.category = "Category is required";
    if (form.quantity === "" || isNaN(form.quantity)) e.quantity = "Valid quantity is required";
    else if (Number(form.quantity) < 0) e.quantity = "Quantity cannot be negative";
    if (form.price === "" || isNaN(form.price)) e.price = "Valid price is required";
    else if (Number(form.price) < 0) e.price = "Price cannot be negative";
    if (!form.supplier.trim()) e.supplier = "Supplier is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
      errors[field]
        ? "border-red-300 focus:border-red-500 bg-red-50/50"
        : "border-surface-300 focus:border-primary-500 bg-white"
    }`;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-surface-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-surface-900">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onCancel} className="p-1 text-surface-400 hover:text-surface-600 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 mb-1">Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass("name")} placeholder="e.g. Wireless Mouse" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 mb-1">SKU *</label>
              <input name="sku" value={form.sku} onChange={handleChange} className={inputClass("sku")} placeholder="e.g. WM-1001" />
              {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 mb-1">Category *</label>
              <input name="category" value={form.category} onChange={handleChange} className={inputClass("category")} placeholder="e.g. Electronics" />
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 mb-1">Supplier *</label>
              <input name="supplier" value={form.supplier} onChange={handleChange} className={inputClass("supplier")} placeholder="e.g. Logitech India" />
              {errors.supplier && <p className="text-xs text-red-500 mt-1">{errors.supplier}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 mb-1">Quantity *</label>
              <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} className={inputClass("quantity")} placeholder="0" />
              {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 mb-1">Price (₹) *</label>
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className={inputClass("price")} placeholder="0.00" />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-surface-600 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass("description")} resize-none`} placeholder="Optional product description..." />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-surface-600 bg-surface-100 rounded-lg hover:bg-surface-200 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
