import React from "react";

const BuyerDashboard = () => {
  const purchases = [
    { item: "Denim jacket", price: "ksh 3,500", date: "2024-07-20", img: "🧥" },
    { item: "Brown leather boots", price: "ksh 2,000", date: "2024-07-15", img: "🥾" },
    { item: "Ceramic vase", price: "ksh 3,000", date: "2024-07-10", img: "🏺" },
    { item: "Canvas tote bag", price: "ksh 2,800", date: "2024-07-05", img: "👜" },
    { item: "GreenHome Breakfast Set", price: "ksh 2,400", date: "2024-06-30", img: "🍽️" },
  ];

  return (
    <div className="flex min-h-screen bg-teal-900 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-800 text-white flex flex-col py-6 px-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">CIRQLEx</h2>
        <nav className="space-y-2">
          <a href="#" className="block py-2 px-3 rounded hover:bg-teal-700">📦 My Orders</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-teal-700">💾 Saved Items</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-teal-700">📋 My Listings</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-teal-700">🕓 Sales History</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-teal-700">🌱 Sustainability Impact</a>
        </nav>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 bg-gray-50 p-8 rounded-tl-3xl">
        <h1 className="text-2xl font-bold mb-2">Buyer Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Manage your purchases, track orders, and view your impact.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Items Purchased</p>
            <h2 className="text-xl font-semibold">25</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Total Spent</p>
            <h2 className="text-xl font-semibold text-teal-700">ksh 32,000</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Orders</p>
            <h2 className="text-xl font-semibold">15</h2>
          </div>
        </div>

        {/* Recent Purchases */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Purchases</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Item name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Date Purchased</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-xl">{purchase.img}</td>
                    <td className="py-3 px-4">{purchase.item}</td>
                    <td className="py-3 px-4 text-teal-700">{purchase.price}</td>
                    <td className="py-3 px-4 text-gray-500">{purchase.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Environmental Impact */}
        <section className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Items Recycled</p>
            <h2 className="text-xl font-semibold">25</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Carbon Emissions Saved</p>
            <h2 className="text-xl font-semibold text-teal-700">120 kg</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BuyerDashboard;
