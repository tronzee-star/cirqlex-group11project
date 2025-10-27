import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cart_items_v1';
const TAX_RATE = 0.024; // Approx. 2.4% to match sample design numbers

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed;
    } catch (error) {
      console.warn('Failed to parse stored cart data:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to persist cart data:', error);
    }
  }, [items]);

  const addItem = useCallback((product) => {
    if (!product?.id) return;

    setItems((current) => {
      const existing = current.find((entry) => entry.id === product.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === product.id
            ? { ...entry, quantity: entry.quantity + (product.quantity ?? 1) }
            : entry
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          priceValue: Number(product.priceValue) || 0,
          quantity: product.quantity ?? 1,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((entry) => entry.id !== productId);
      }

      return current.map((entry) =>
        entry.id === productId ? { ...entry, quantity } : entry
      );
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((current) => current.filter((entry) => entry.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.priceValue * item.quantity,
      0
    );

    const shipping = subtotal > 0 ? 0 : 0;
    const estimatedTax = subtotal * TAX_RATE;
    const total = subtotal + shipping + estimatedTax;

    return {
      subtotal,
      shipping,
      estimatedTax,
      total,
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totals,
    }),
    [items, addItem, updateQuantity, removeItem, clearCart, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
