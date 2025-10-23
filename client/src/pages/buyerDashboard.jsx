import React from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const BuyerDashboard = () => {
  const orders = [
    { id: 1, item: "Eco Reusable Bottle", price: "$12.99", status: "Delivered" },
    { id: 2, item: "Upcycled Tote Bag", price: "$18.50", status: "Pending" },
    { id: 3, item: "Bamboo Toothbrush", price: "$3.99", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-green-700 mb-6">
          Buyer Dashboard
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
            <p className="text-3xl font-bold text-green-700 mt-2">12</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-medium text-gray-600">Items Purchased</h2>
            <p className="text-3xl font-bold text-green-700 mt-2">24</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-medium text-gray-600">Favorites</h2>
            <p className="text-3xl font-bold text-green-700 mt-2">8</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Orders
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Item</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.item}</td>
                  <td className="py-2 px-4">{order.price}</td>
                  <td
                    className={`py-2 px-4 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
