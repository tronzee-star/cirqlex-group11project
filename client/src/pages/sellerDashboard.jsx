
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiShoppingBag,
  FiBarChart2,
  FiDollarSign,
  FiMessageSquare,
} from "react-icons/fi";

const SellerDashboard = () => {
  const listings = [
    { id: 1, item: "Denim jacket", price: "ksh 3,500", date: "2024-07-20" },
    { id: 2, item: "Brown leather boots", price: "ksh 2,000", date: "2024-07-15" },
    { id: 3, item: "Ceramic vase", price: "ksh 3,000", date: "2024-07-10" },
    { id: 4, item: "Canvas tote bag", price: "ksh 2,800", date: "2024-07-05" },
    { id: 5, item: "GreenHome Breakfast Set", price: "ksh 2,400", date: "2024-06-30" },
  ];

  const location = useLocation();

  const sidebarLinks = [
    { label: "My listings", icon: FiGrid, to: "/seller-dashboard" },
    { label: "Switch to buy", icon: FiUsers, to: "/buyer-dashboard" },
    { label: "Sell an item", icon: FiShoppingBag, to: "/seller-dashboard" },
    { label: "Sales analytics", icon: FiBarChart2, to: null },
    { label: "Payouts", icon: FiDollarSign, to: null },
    { label: "Messages", icon: FiMessageSquare, to: null },
  ];

  const renderNavItem = ({ label, icon: Icon, to }) => {
    const isActive = to && location.pathname === to;
    const baseClasses =
      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition";
    const activeClasses = "bg-white text-[#0C7A60] shadow";
    const inactiveClasses = "text-emerald-100 hover:bg-white/10 hover:text-white";

    if (to) {
      return (
        <Link
          key={label}
          to={to}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <Icon className="text-lg" />
          <span>{label}</span>
        </Link>
      );
    }

    return (
      <button
        key={label}
        type="button"
        className={`${baseClasses} ${inactiveClasses} cursor-not-allowed opacity-70`}
        disabled
      >
        <Icon className="text-lg" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0C7A60]/90 py-10">
      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <aside className="w-64 bg-[#0C7A60] p-6">
          <div className="mb-6 text-sm font-semibold uppercase tracking-wide text-emerald-100">
            Seller tools
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map(renderNavItem)}
          </nav>
        </aside>

        <main className="flex-1 bg-white p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Seller Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your listings, track sales, and view your impact.
            </p>
          </header>

          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Active listings</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">15</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Total revenue</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">ksh 32,000</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Total sales</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">8</p>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Listings</h2>
            <p className="mb-4 text-sm text-gray-500">Track your latest items and pricing.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th className="py-3 px-4 font-medium">Item</th>
                    <th className="py-3 px-4 font-medium">Item name</th>
                    <th className="py-3 px-4 font-medium">Price</th>
                    <th className="py-3 px-4 font-medium">Date listed</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {listings.map((item) => (
                    <tr key={item.id} className="border-t border-emerald-50 hover:bg-emerald-50/40">
                      <td className="py-3 px-4">
                        <div className="h-10 w-10 rounded-full bg-emerald-100" />
                      </td>
                      <td className="py-3 px-4">{item.item}</td>
                      <td className="py-3 px-4 text-emerald-700">{item.price}</td>
                      <td className="py-3 px-4 text-gray-500">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 p-6">
              <h3 className="text-base font-semibold text-gray-800">Environmental Impact</h3>
              <p className="mt-2 text-sm text-gray-500">
                Summary of savings and impact from your listings and sales.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-100 p-6">
              <h3 className="text-base font-semibold text-gray-800">Recommendations</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tips to further reduce footprint and increase conversions.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
