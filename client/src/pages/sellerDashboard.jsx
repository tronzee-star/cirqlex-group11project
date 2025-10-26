import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiShoppingBag,
  FiBarChart2,
  FiDollarSign,
  FiMessageSquare,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const SellerDashboard = () => {
  const { token } = useAuth();
  const [statSummary, setStatSummary] = useState({
    listings: 0,
    sales: 0,
    revenue: 0,
    purchases_count: 0,
    purchases_total: 0,
    recent_orders: [],
  });
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();

  const sidebarLinks = [
    { label: "My listings", icon: FiGrid, to: "/seller-dashboard" },
    { label: "Switch to buy", icon: FiUsers, to: "/buyer-dashboard" },
    { label: "Sell an item", icon: FiShoppingBag, to: "/seller-dashboard" },
    { label: "Sales analytics", icon: FiBarChart2, to: null },
    { label: "Payouts", icon: FiDollarSign, to: null },
    { label: "Messages", icon: FiMessageSquare, to: null },
  ];

  useEffect(() => {
    let ignore = false;

    const fetchDashboardData = async () => {
      if (!token) {
        setMyListings([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [statsRes, listingsRes] = await Promise.all([
          fetch(`${API_BASE}/products/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/products/mine`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!statsRes.ok || !listingsRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const statsJson = await statsRes.json();
        const listingsJson = await listingsRes.json();

        if (!ignore) {
          setStatSummary({
            listings: statsJson.listings || 0,
            sales: statsJson.sales || 0,
            revenue: statsJson.revenue || 0,
            purchases_count: statsJson.purchases_count || 0,
            purchases_total: statsJson.purchases_total || 0,
            recent_orders: statsJson.recent_orders || [],
          });
          setMyListings(listingsJson.items || []);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError("Unable to load your seller dashboard right now. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      ignore = true;
    };
  }, [token]);

  const listings = useMemo(() => myListings, [myListings]);

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

          {error ? (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Active listings</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {statSummary.listings || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Total revenue</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {formatCurrency(statSummary.revenue)}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
              <h3 className="text-sm font-medium text-emerald-700">Total sales</h3>
              <p className="mt-2 text-3xl font-semibold text-emerald-900">
                {statSummary.sales || 0}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Listings</h2>
            <p className="mb-4 text-sm text-gray-500">Track your latest items and pricing.</p>
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500">Loading your listings…</div>
            ) : listings.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No listings yet. Create one from the <Link to="/seller-dashboard" className="text-[#0C7A60] underline">sell</Link> tools.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="py-3 px-4 font-medium">Title</th>
                      <th className="py-3 px-4 font-medium">Category</th>
                      <th className="py-3 px-4 font-medium">Price</th>
                      <th className="py-3 px-4 font-medium">Location</th>
                      <th className="py-3 px-4 font-medium">Date listed</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    {listings.map((item) => (
                      <tr key={item.id} className="border-t border-emerald-50 hover:bg-emerald-50/40">
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4">{item.category || "—"}</td>
                        <td className="py-3 px-4 text-emerald-700">{formatCurrency(item.price)}</td>
                        <td className="py-3 px-4">{item.location || "—"}</td>
                        <td className="py-3 px-4 text-gray-500">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}
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
