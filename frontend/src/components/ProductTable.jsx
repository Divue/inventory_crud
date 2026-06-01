import { useState } from "react";

function ProductTable({ products, onEdit, onDelete, loading }) {
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = (id) => {
    if (confirmId === id) {
      onDelete(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-surface-200 p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-surface-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-surface-200 p-12 text-center">
        <p className="text-surface-600 font-medium">No products found</p>
        <p className="text-sm text-surface-400 mt-1">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200">
              <th className="text-left px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">SKU</th>
              <th className="text-left px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">Category</th>
              <th className="text-right px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">Qty</th>
              <th className="text-right px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">Price</th>
              <th className="text-left px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">Supplier</th>
              <th className="text-right px-5 py-3 font-semibold text-surface-600 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {products.map((product) => (
              <tr key={product._id} className={`hover:bg-surface-50 transition-colors ${product.quantity <= 5 ? "bg-amber-50/50" : ""}`}>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-surface-900">{product.name}</p>
                  {product.description && <p className="text-xs text-surface-400 mt-0.5 max-w-xs truncate">{product.description}</p>}
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-mono text-xs bg-surface-100 text-surface-600 px-2 py-1 rounded">{product.sku}</span>
                </td>
                <td className="px-5 py-3.5 text-surface-700">{product.category}</td>
                <td className="px-5 py-3.5 text-right">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${product.quantity <= 5 ? "bg-red-100 text-red-700" : product.quantity <= 20 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right font-medium text-surface-700">₹{product.price.toFixed(2)}</td>
                <td className="px-5 py-3.5 text-surface-600">{product.supplier}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(product)} className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => handleDelete(product._id)} className={`p-1.5 rounded-md transition-colors ${confirmId === product._id ? "text-white bg-red-500" : "text-surface-400 hover:text-red-600 hover:bg-red-50"}`} title={confirmId === product._id ? "Click again to confirm" : "Delete"}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
