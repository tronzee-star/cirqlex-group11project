import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiList,
  FiRefreshCw,
  FiShoppingBag,
  FiShoppingCart,
  FiTrendingUp,
  FiMessageCircle,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const BuyerDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    listings: 0,
    sales: 0,
    revenue: 0,
    purchases_count: 0,
    purchases_total: 0,
    recent_orders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();

  const sidebarLinks = [
    { label: "My Orders report", icon: FiList, to: "/buyer-dashboard" },
    { label: "Switch to sell", icon: FiRefreshCw, to: "/seller-dashboard" },
    { label: "Shop", icon: FiShoppingBag, to: "/shop" },
    { label: "Go to cart", icon: FiShoppingCart, to: "/cart" },
    { label: "Sustainability Impact", icon: FiTrendingUp, to: null },
    { label: "Chat with AI", icon: FiMessageCircle, to: "/chat-with-ai" },
  ];

  useEffect(() => {
    let ignore = false;

    const fetchStats = async () => {
      if (!token) {
        setStats((prev) => ({ ...prev, recent_orders: [] }));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/products/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const data = await response.json();

        if (!ignore) {
          setStats({
            listings: data.listings || 0,
            sales: data.sales || 0,
            revenue: data.revenue || 0,
            purchases_count: data.purchases_count || 0,
            purchases_total: data.purchases_total || 0,
            recent_orders: data.recent_orders || [],
          });
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError("Unable to load your dashboard right now. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      ignore = true;
    };
  }, [token]);

  const orders = useMemo(() => stats.recent_orders || [], [stats.recent_orders]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount || 0);

  const renderNavItem = ({ label, icon: Icon, to }) => {
    const isActive = to && location.pathname === to;

    const baseClasses =
      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition";
    const activeClasses = "bg-[#0b6c54] text-white ring-2 ring-white/20 shadow";
    const inactiveClasses = "bg-[#0A5A46] text-emerald-50 hover:bg-[#0b6c54] hover:text-white";

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
        className={`${baseClasses} ${inactiveClasses} cursor-not-allowed opacity-60`}
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
            Navigation
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map(renderNavItem)}
          </nav>
        </aside>

        <main className="flex-1 bg-white p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Buyer Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your purchases, track orders, and view your impact.
            </p>
          </header>

          {error ? (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Active Listings</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {stats.listings || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Total Revenue</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Items Purchased</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {stats.purchases_count || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Total Spent</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {formatCurrency(stats.purchases_total)}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Purchases</h2>
            <p className="mb-4 text-sm text-gray-500">Most recent items you have purchased.</p>
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500">Loading your purchases…</div>
            ) : orders.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No purchases yet. Explore the <Link to="/shop" className="text-[#0C7A60] underline">shop</Link> to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="py-3 px-4 font-medium">Item</th>
                      <th className="py-3 px-4 font-medium">Seller</th>
                      <th className="py-3 px-4 font-medium">Price</th>
                      <th className="py-3 px-4 font-medium">Date Purchased</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-emerald-50 hover:bg-emerald-50/40">
                        <td className="py-3 px-4">{order.product?.title || "Listing"}</td>
                        <td className="py-3 px-4">{order.product?.owner?.name || order.product?.owner?.email || "-"}</td>
                        <td className="py-3 px-4 text-emerald-700">{formatCurrency(order.price)}</td>
                        <td className="py-3 px-4 text-gray-500">
                          {order.purchased_at
                            ? new Date(order.purchased_at).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 p-6">
              <h3 className="text-base font-semibold text-gray-800">Environmental Impact</h3>
              <p className="mt-2 text-sm text-gray-500">
                Summary of savings and impact from your purchases.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-100 p-6">
              <h3 className="text-base font-semibold text-gray-800">Recommended Actions</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tips to further reduce environmental footprint.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;

