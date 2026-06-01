import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import DashboardCards from "../components/DashboardCards.jsx";
import Loader from "../components/Loader.jsx";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  const lowStockProducts = products.filter((p) => p.quantity <= 5);

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-sm text-surface-500 mt-1">Overview of your inventory</p>
      </div>

      <DashboardCards products={products} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-surface-900">Low Stock Alert</h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
              {lowStockProducts.length} items
            </span>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-surface-400 py-4 text-center">All products are well-stocked</p>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.slice(0, 5).map((p) => (
                <div key={p._id} className="flex items-center justify-between py-2 px-3 bg-amber-50/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-surface-800">{p.name}</p>
                    <p className="text-xs text-surface-400">{p.sku}</p>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    {p.quantity} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <h3 className="text-sm font-semibold text-surface-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/products")}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-surface-200 hover:border-primary-200 hover:bg-primary-50/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-800">View All Products</p>
                <p className="text-xs text-surface-400">Browse and manage inventory</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/products?action=add")}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-surface-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-800">Add New Product</p>
                <p className="text-xs text-surface-400">Create a new inventory entry</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
