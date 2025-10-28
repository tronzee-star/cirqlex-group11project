import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../context/CardContext.jsx";

const currencyFormatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 0,
});

const CartTable = ({ items, onIncrease, onDecrease, onRemove }) => (
  <div className="overflow-hidden rounded-2xl border-2 border-[#C9E6DC] bg-white shadow-sm">
    <table className="min-w-full">
      <thead className="bg-[#EAF7F1]">
        <tr className="text-left text-sm uppercase tracking-wide text-[#0C7A60]">
          <th className="px-6 py-4">Product</th>
          <th className="px-6 py-4">Price</th>
          <th className="px-6 py-4 text-center">Quantity</th>
          <th className="px-6 py-4 text-right">Subtotal</th>
          <th className="px-6 py-4"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#C9E6DC] text-sm text-[#0C7A60]">
        {items.map((item) => (
          <tr key={item.id} className="bg-white hover:bg-[#F5FBF8]">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-xl border border-emerald-100 bg-white">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-emerald-400">No image</div>
                  )}
                </div>
                <div className="font-medium capitalize">{item.name}</div>
              </div>
            </td>
            <td className="px-6 py-4 font-medium text-emerald-700">
              {currencyFormatter.format(item.priceValue)}
            </td>
            <td className="px-6 py-4">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white">
                <button
                  type="button"
                  onClick={() => onDecrease(item.id, item.quantity)}
                  className="px-3 py-1 text-base font-semibold text-emerald-700 transition hover:text-emerald-900"
                  aria-label={`Decrease ${item.name}`}
                >
                  −
                </button>
                <span className="px-4 text-sm font-semibold text-emerald-900">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onIncrease(item.id, item.quantity)}
                  className="px-3 py-1 text-base font-semibold text-emerald-700 transition hover:text-emerald-900"
                  aria-label={`Increase ${item.name}`}
                >
                  +
                </button>
              </div>
            </td>
            <td className="px-6 py-4 text-right font-semibold">
              {currencyFormatter.format(item.priceValue * item.quantity)}
            </td>
            <td className="px-6 py-4 text-right">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-xs font-medium uppercase tracking-wide text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderSummary = ({ subtotal, shipping, estimatedTax, total }) => (
  <div className="rounded-2xl border-2 border-[#C9E6DC] bg-white px-8 py-6 shadow-sm">
    <h3 className="text-lg font-semibold text-[#0C7A60]">Order Summary</h3>
    <dl className="mt-6 space-y-4 text-sm text-[#0C7A60]">
      <div className="flex items-center justify-between">
        <dt className="font-medium">Subtotal</dt>
        <dd className="font-semibold">{currencyFormatter.format(subtotal)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="font-medium">Shipping</dt>
        <dd className="font-semibold">{shipping === 0 ? 'Free' : currencyFormatter.format(shipping)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="font-medium">Estimated Tax</dt>
        <dd className="font-semibold">{currencyFormatter.format(estimatedTax)}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-[#C9E6DC] pt-4 text-base font-semibold">
        <dt>Total</dt>
        <dd>{currencyFormatter.format(total)}</dd>
      </div>
    </dl>
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full bg-[#00A651] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245]"
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
);

const CartPage = () => {
  const { items, updateQuantity, removeItem, totals, clearCart } = useCart();
  const hasItems = items.length > 0;

  const derivedTotals = useMemo(
    () => ({
      subtotal: Math.round(totals.subtotal),
      shipping: totals.shipping,
      estimatedTax: Math.round(totals.estimatedTax),
      total: Math.round(totals.total),
    }),
    [totals]
  );

  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = (id, quantity) => {
    updateQuantity(id, quantity - 1);
  };

  const handleClear = () => {
    clearCart();
  };

  return (
    <section className="min-h-screen bg-[#0C7A60]/20 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border-4 border-[#2AA9B9] bg-white shadow-2xl">
          <div className="border-b border-[#2AA9B9]/40 bg-[#0C7A60] px-6 py-6 text-center text-white sm:px-10">
            <h1 className="text-2xl font-semibold sm:text-3xl">Your Cart</h1>
          </div>

          {hasItems ? (
            <div className="space-y-8 px-6 py-10 sm:px-10">
              <CartTable items={items} onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={removeItem} />

              <div className="flex flex-col gap-3 text-sm text-[#0C7A60] sm:flex-row sm:items-center sm:justify-between">
                <Link to="/shop" className="font-semibold hover:text-[#095c48]">
                  ← Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold uppercase tracking-wide text-red-500 transition hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>

              <OrderSummary {...derivedTotals} />
            </div>
          ) : (
            <div className="px-6 py-14 text-center sm:px-10">
              <div className="mx-auto max-w-md space-y-4 rounded-2xl border-2 border-dashed border-[#2AA9B9]/60 bg-[#F5FBF8] px-8 py-12">
                <h2 className="text-xl font-semibold text-[#0C7A60]">Your cart is empty</h2>
                <p className="text-sm text-[#0C7A60]/80">
                  Explore the marketplace and add sustainable finds to your cart.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-[#00A651] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245]"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
