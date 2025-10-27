import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const currencyFormatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 0,
});

const CartTable = ({ items, onIncrease, onDecrease, onRemove }) => (
  <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/60 shadow-inner">
    <table className="min-w-full">
      <thead>
        <tr className="text-left text-sm uppercase tracking-wide text-emerald-800/80">
          <th className="px-6 py-4">Product</th>
          <th className="px-6 py-4">Price</th>
          <th className="px-6 py-4">Quantity</th>
          <th className="px-6 py-4">Subtotal</th>
          <th className="px-6 py-4"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-emerald-100 text-sm text-emerald-900">
        {items.map((item) => (
          <tr key={item.id} className="bg-white/60 hover:bg-white">
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
            <td className="px-6 py-4 font-semibold text-emerald-800">
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
  <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg">
    <h3 className="text-lg font-semibold text-emerald-900">Order Summary</h3>
    <dl className="mt-4 space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <dt className="text-emerald-700">Subtotal</dt>
        <dd className="font-medium text-emerald-900">{currencyFormatter.format(subtotal)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-emerald-700">Shipping</dt>
        <dd className="font-medium text-emerald-900">{shipping === 0 ? 'Free' : currencyFormatter.format(shipping)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-emerald-700">Estimated Tax</dt>
        <dd className="font-medium text-emerald-900">{currencyFormatter.format(estimatedTax)}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-emerald-100 pt-4 text-base font-semibold text-emerald-900">
        <dt>Total</dt>
        <dd>{currencyFormatter.format(total)}</dd>
      </div>
    </dl>
    <button
      type="button"
      className="mt-6 w-full rounded-full bg-[#00A651] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245]"
    >
      Proceed to Checkout
    </button>
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
    <section className="min-h-screen bg-[#0C7A60]/15 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6">
        <header className="flex flex-col gap-4 text-center text-emerald-900">
          <h1 className="text-3xl font-semibold">Your Cart</h1>
          <p className="text-sm text-emerald-700">
            Review the items you have added. Adjust quantities or proceed to checkout when you're ready.
          </p>
        </header>

        {hasItems ? (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <CartTable items={items} onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={removeItem} />
              <div className="flex items-center justify-between text-sm text-emerald-700">
                <Link to="/shop" className="font-medium text-emerald-700 hover:text-emerald-900">
                  ← Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold uppercase tracking-wide text-red-500 hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            <OrderSummary {...derivedTotals} />
          </div>
        ) : (
          <div className="rounded-3xl border border-emerald-200 bg-white/80 px-8 py-16 text-center shadow-lg">
            <h2 className="text-xl font-semibold text-emerald-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-emerald-700">
              Explore the marketplace and add sustainable finds to your cart.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#00A651] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#009245]"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
