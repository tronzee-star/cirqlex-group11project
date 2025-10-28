import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CardContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const currencyFormatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 0,
});

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleString();
  } catch (err) {
    return new Date().toLocaleString();
  }
};

const CheckoutReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptData = location.state;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { clearCart } = useCart();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!receiptData) {
      navigate('/cart', { replace: true });
    }
  }, [receiptData, navigate]);

  useEffect(() => {
    document.body.style.overflow = showConfirmation ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showConfirmation]);

  if (!receiptData) {
    return null;
  }

  const { items = [], totals = {}, generatedAt } = receiptData;
  const subtotal = currencyFormatter.format(totals.subtotal || 0);
  const shipping = totals.shipping === 0 ? 'Free' : currencyFormatter.format(totals.shipping || 0);
  const estimatedTax = currencyFormatter.format(totals.estimatedTax || 0);
  const total = currencyFormatter.format(totals.total || 0);
  const generatedAtLabel = formatDate(generatedAt || new Date().toISOString());
  const totalPlain = `ksh ${Math.round(totals.total || 0).toLocaleString()}`;

  const handleConfirmPayment = async () => {
    if (isSubmitting) {
      return;
    }

    if (!items.length) {
      setSubmitError('No items available to confirm.');
      return;
    }

    if (!token) {
      setSubmitError('Please sign in again to confirm your payment.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
    const payload = {
      items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price_value: item.priceValue,
      })),
    };

    try {
      const response = await fetch(`${API_BASE}/products/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = 'Failed to confirm payment. Please try again.';
        try {
          const errorData = await response.json();
          if (errorData?.error) {
            message = errorData.error;
          }
        } catch (err) {
          // ignore
        }
        throw new Error(message);
      }

      clearCart();
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error confirming payment:', error);
      setSubmitError(error.message || 'Unable to confirm payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0C7A60]/20 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border-4 border-[#2AA9B9] bg-white shadow-2xl">
          <div className="border-b border-[#2AA9B9]/40 bg-[#0C7A60] px-6 py-6 text-center text-white sm:px-10">
            <h1 className="text-2xl font-semibold sm:text-3xl">Checkout Receipt</h1>
            <p className="mt-1 text-sm text-emerald-100">Generated on {generatedAtLabel}</p>
          </div>

          <div className="space-y-8 px-6 py-10 sm:px-10">
            <div>
              <h2 className="text-lg font-semibold text-[#0C7A60]">Order Items</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border-2 border-[#C9E6DC] bg-white shadow-sm">
                <table className="min-w-full">
                  <thead className="bg-[#EAF7F1]">
                    <tr className="text-left text-sm uppercase tracking-wide text-[#0C7A60]">
                      <th className="px-5 py-3">Product</th>
                      <th className="px-5 py-3 text-center">Quantity</th>
                      <th className="px-5 py-3 text-right">Price</th>
                      <th className="px-5 py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9E6DC] text-sm text-[#0C7A60]">
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-5 py-6 text-center text-[#0C7A60]/70">
                          No items captured for this receipt.
                        </td>
                      </tr>
                    ) : (
                      items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 overflow-hidden rounded-xl border border-emerald-100 bg-white">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                  <span className="flex h-full w-full items-center justify-center text-xs text-emerald-400">
                                    No image
                                  </span>
                                )}
                              </div>
                              <span className="font-medium capitalize">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-center font-semibold">{item.quantity}</td>
                          <td className="px-5 py-4 text-right">{currencyFormatter.format(item.priceValue)}</td>
                          <td className="px-5 py-4 text-right font-semibold">
                            {currencyFormatter.format(item.priceValue * item.quantity)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#C9E6DC] bg-white px-8 py-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0C7A60]">Totals</h2>
              <dl className="mt-6 space-y-4 text-sm text-[#0C7A60]">
                <div className="flex items-center justify-between">
                  <dt className="font-medium">Subtotal</dt>
                  <dd className="font-semibold">{subtotal}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-medium">Shipping</dt>
                  <dd className="font-semibold">{shipping}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-medium">Estimated Tax</dt>
                  <dd className="font-semibold">{estimatedTax}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#C9E6DC] pt-4 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{total}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-[#0C7A60] bg-[#0C7A60] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#095c48]"
              >
                ← Back to Cart
              </Link>
              <div className="flex flex-col items-end gap-2 sm:items-start">
                {submitError ? (
                  <p className="text-xs font-semibold text-red-500">{submitError}</p>
                ) : null}
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-[#00A651] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Processing…' : 'Confirm Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/30 bg-white px-8 py-10 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0C7A60]/10 text-[#0C7A60]">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-[#0C7A60]">Payment Confirmed</h2>
            <p className="mt-2 text-sm text-[#0C7A60]/80">A total of {totalPlain} has been withdrawn from your account.</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-[#00A651] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245]"
                onClick={() => setShowConfirmation(false)}
              >
                Continue Shopping
              </Link>
              <Link
                to="/buyer-dashboard"
                className="inline-flex items-center justify-center rounded-full bg-[#00A651] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245]"
                onClick={() => setShowConfirmation(false)}
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default CheckoutReceipt;
