function DashboardCards({ products }) {
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const lowStockCount = products.filter((p) => p.quantity <= 5).length;

  const categories = [...new Set(products.map((p) => p.category))].length;

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: "bg-primary-50 text-primary-600",
      border: "border-primary-100",
    },
    {
      title: "Inventory Value",
      value: `₹${totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
      border: "border-emerald-100",
    },
    {
      title: "Low Stock Items",
      value: lowStockCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      color: lowStockCount > 0 ? "bg-amber-50 text-amber-600" : "bg-surface-50 text-surface-600",
      border: lowStockCount > 0 ? "border-amber-100" : "border-surface-100",
    },
    {
      title: "Categories",
      value: categories,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: "bg-violet-50 text-violet-600",
      border: "border-violet-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white rounded-xl border ${card.border} p-5 transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-surface-900">{card.value}</p>
            </div>
            <div className={`${card.color} p-2.5 rounded-lg`}>{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
