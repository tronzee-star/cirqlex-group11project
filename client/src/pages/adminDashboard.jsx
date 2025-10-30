import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiShield, FiCheckCircle, FiAlertTriangle, FiTrendingUp } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const [moderationQueue, setModerationQueue] = useState([]);
  const [platformMetrics, setPlatformMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchAdminSnapshot = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [productsRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/products/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/products/stats/platform`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!productsRes.ok || !statsRes.ok) {
          throw new Error("Failed to load admin data");
        }

        const productsJson = await productsRes.json();
        const statsJson = await statsRes.json();

        if (!ignore) {
          setModerationQueue(productsJson.items || []);
          setPlatformMetrics(statsJson || {});
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          console.error("Admin snapshot load failed", err);
          setError("Unable to load admin dashboard. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchAdminSnapshot();

    return () => {
      ignore = true;
    };
  }, [token]);

  const pendingListings = useMemo(
    () => moderationQueue.filter((item) => item.status !== "approved" || item.verified === false),
    [moderationQueue]
  );

  const verifiedCount = useMemo(
    () => moderationQueue.filter((item) => item.verified !== false).length,
    [moderationQueue]
  );

  const impactSummary = platformMetrics?.insights?.impact || {};

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <div className="min-h-screen bg-[#0C7A60]/90 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-2xl">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Admin Control Center</h1>
            <p className="text-sm text-gray-500">
              {user?.name ? `Welcome back, ${user.name.split(" ")[0]}!` : "Monitor sustainability activity and listings."}
            </p>
          </div>
          <Link
            to="/seller-dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0C7A60] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0a5a46]"
          >
            Go to Seller Tools
          </Link>
        </header>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-emerald-800">Listings Reviewed</h3>
              <FiShield className="text-lg text-emerald-700" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">{moderationQueue.length}</p>
            <p className="text-xs text-emerald-700">Total active listings</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-emerald-800">Verified Listings</h3>
              <FiCheckCircle className="text-lg text-emerald-700" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">{verifiedCount}</p>
            <p className="text-xs text-emerald-700">Trusted for eco-compliance</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-emerald-800">Pending Actions</h3>
              <FiAlertTriangle className="text-lg text-emerald-700" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">{pendingListings.length}</p>
            <p className="text-xs text-emerald-700">Awaiting review</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-emerald-800">Total Revenue</h3>
              <FiTrendingUp className="text-lg text-emerald-700" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">{formatCurrency(platformMetrics?.revenue)}</p>
            <p className="text-xs text-emerald-700">Marketplace revenue captured</p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800">Moderation Queue</h2>
            <p className="mb-4 text-sm text-gray-500">
              Review flagged or newly submitted listings for compliance with sustainability standards.
            </p>
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500">Loading moderation data…</div>
            ) : pendingListings.length === 0 ? (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-6 text-center text-sm text-emerald-700">
                All listings are in good standing. Great job keeping the marketplace healthy!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingListings.slice(0, 5).map((item) => (
                  <article key={item.id} className="rounded-2xl border border-emerald-100 p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category || "General"} · {item.location || "N/A"}</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Needs review</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">{item.description || "No description provided."}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>Posted by: {item.owner?.name || "Unknown seller"}</span>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </article>
                ))}
                {pendingListings.length > 5 ? (
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-center text-sm text-emerald-700">
                    +{pendingListings.length - 5} more waiting in queue
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800">Platform Sustainability Impact</h2>
            <p className="mb-4 text-sm text-gray-500">
              Track how the marketplace is contributing to CircularShop's mission.
            </p>
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500">Collecting insights…</div>
            ) : (
              <dl className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50/70 px-4 py-3">
                  <dt className="font-medium text-emerald-800">CO₂ saved</dt>
                  <dd>{impactSummary.co2_saved || "0.0 kg"}</dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50/70 px-4 py-3">
                  <dt className="font-medium text-emerald-800">Waste diverted</dt>
                  <dd>{impactSummary.waste_reduced || "0.0 kg"}</dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50/70 px-4 py-3">
                  <dt className="font-medium text-emerald-800">Trees preserved</dt>
                  <dd>{impactSummary.trees_saved ?? 0}</dd>
                </div>
              </dl>
            )}

            <div className="mt-6 rounded-2xl bg-[#0C7A60]/10 p-4 text-sm text-[#0C7A60]">
              <h3 className="mb-2 font-semibold">Next admin actions</h3>
              <ul className="space-y-2">
                <li>• Spotlight community donation drives on the home page.</li>
                <li>• Review sustainability reports from top vendors.</li>
                <li>• Collaborate with AI assistant to draft eco-campaign tips.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
