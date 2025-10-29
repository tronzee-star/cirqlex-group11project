import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount || 0);

export default function Payouts() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    revenue: 0,
    sales: 0,
    listings: 0,
    recent_orders: [],
  });

  useEffect(() => {
    let ignore = false;

    const fetchStats = async () => {
      if (!token) {
        setError('Please sign in to view payout information.');
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
          throw new Error('Failed to load payout data');
        }

        const data = await response.json();
        if (!ignore) {
          setStats({
            revenue: data.revenue || 0,
            sales: data.sales || 0,
            listings: data.listings || 0,
            recent_orders: Array.isArray(data.recent_orders) ? data.recent_orders : [],
          });
          setError('');
        }
      } catch (err) {
        console.error('Error loading payout data:', err);
        if (!ignore) {
          setError('Unable to load payout information right now. Please try again later.');
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
  const lifetimeRevenue = stats.revenue || 0;
  const totalSales = stats.sales || 0;
  const averageOrderValue = totalSales > 0 ? lifetimeRevenue / totalSales : 0;

  return (
    <section className="min-h-screen bg-[#0C7A60]/15 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-black/5">
          <header className="flex flex-col gap-4 border-b border-emerald-100 bg-[#0C7A60] px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <h1 className="text-3xl font-semibold">Payout Report</h1>
              <p className="text-sm text-emerald-100">
                Review your earnings, upcoming payouts, and recent sales performance.
              </p>
            </div>
            <Link
              to="/seller-dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              ← Back to Dashboard
            </Link>
          </header>

          <div className="space-y-10 px-6 py-8 sm:px-10">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            <section className="grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-emerald-100 bg-emerald-50/60 px-5 py-6">
                <h2 className="text-sm font-medium text-emerald-700">Lifetime Revenue</h2>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">{formatCurrency(lifetimeRevenue)}</p>
              </article>
              <article className="rounded-3xl border border-emerald-100 bg-emerald-50/60 px-5 py-6">
                <h2 className="text-sm font-medium text-emerald-700">Total Sales</h2>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">{totalSales}</p>
              </article>
              <article className="rounded-3xl border border-emerald-100 bg-emerald-50/60 px-5 py-6">
                <h2 className="text-sm font-medium text-emerald-700">Average Order Value</h2>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">{formatCurrency(averageOrderValue)}</p>
              </article>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-emerald-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800">Recent Payout Activity</h2>
                <p className="mb-4 text-sm text-gray-500">
                  Latest orders contributing to your upcoming payouts.
                </p>
                {loading ? (
                  <div className="py-10 text-center text-sm text-gray-500">Loading payout history…</div>
                ) : orders.length === 0 ? (
                  <div className="py-10 text-center text-sm text-gray-500">
                    No sales yet. Publish listings from the{' '}
                    <Link to="/sell" className="text-[#0C7A60] underline">
                      sell page
                    </Link>{' '}
                    to start earning.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                      <thead className="text-sm text-gray-500">
                        <tr>
                          <th className="py-3 px-4 font-medium">Order</th>
                          <th className="py-3 px-4 font-medium">Buyer</th>
                          <th className="py-3 px-4 font-medium text-right">Amount</th>
                          <th className="py-3 px-4 font-medium text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-700">
                        {orders.map((order) => {
                          const amount = order?.price || 0;
                          const buyerName = order?.buyer?.name || order?.buyer?.email || 'Buyer';
                          const productTitle = order?.product?.title || 'Listing';
                          const date = order?.purchased_at
                            ? new Date(order.purchased_at).toLocaleDateString()
                            : '—';

                          return (
                            <tr key={order.id} className="border-t border-emerald-50 hover:bg-emerald-50/40">
                              <td className="py-3 px-4">
                                <span className="font-medium text-[#0C7A60]">{productTitle}</span>
                                <p className="text-xs text-gray-500">Order #{order.id}</p>
                              </td>
                              <td className="py-3 px-4">{buyerName}</td>
                              <td className="py-3 px-4 text-right text-[#0C7A60]">{formatCurrency(amount)}</td>
                              <td className="py-3 px-4 text-right text-gray-500">{date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <aside className="flex flex-col gap-6">
                <div className="rounded-3xl border border-emerald-100 bg-white p-6">
                  <h3 className="text-base font-semibold text-gray-800">Need help?</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Review our payout guidelines or contact support for questions about your balance.
                  </p>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-[#0C7A60]">
                    <a
                      href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZfSJfdphtKJkkPPhzFSHcqTcBTGpFTxdhHWXCSnmQWftsRkXGvVzHBtkTqrQdCVZLtsGV"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-[#0C7A60] px-4 py-2 text-center font-semibold text-white transition hover:bg-[#095c48]"
                    >
                      Email Support
                    </a>
                  </div>
                </div>
              </aside>
            </section>

            <section className="rounded-3xl border border-emerald-100 bg-emerald-50/50 px-6 py-5 text-sm text-[#0C7A60]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium">Total revenue to date</span>
                <span className="text-2xl font-semibold text-[#0C7A60]">{formatCurrency(lifetimeRevenue)}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
