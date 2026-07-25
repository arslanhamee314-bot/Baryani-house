import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  nameUrdu?: string;
  price: number;
  priceRaw: string;
  unit?: string;
  image?: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  appliedCoupon: { code: string; type: "percent" | "fixed"; value: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  deliveryCharge: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "baryani_cart_items";

export const cityDeliveryRates: Record<string, number> = {
  "Jauharabad": 50,
  "Khushab": 100,
  "Mianwali": 150,
  "Sargodha": 180,
  "Lahore": 250,
  "Islamabad": 250,
  "Rawalpindi": 250,
  "Faisalabad": 220,
  "Multan": 220,
  "Other City": 250,
};

export const validCoupons: Record<string, { type: "percent" | "fixed"; value: number }> = {
  "WELCOME10": { type: "percent", value: 10 },
  "SAVE10": { type: "percent", value: 10 },
  "BARI50": { type: "fixed", value: 50 },
  "BIRYANI100": { type: "fixed", value: 100 },
};

export function parsePriceNumber(priceStr: string): number {
  if (!priceStr) return 0;
  const num = priceStr.replace(/[^\d]/g, "");
  return parseInt(num, 10) || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Jauharabad");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; type: "percent" | "fixed"; value: number } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart", e);
      }
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantityToAdd: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(99, updated[existingIndex].quantity + quantityToAdd);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      }
      return [...prev, { ...item, quantity: Math.min(99, quantityToAdd) }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: Math.min(99, newQty) } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (validCoupons[cleanCode]) {
      setAppliedCoupon({ code: cleanCode, ...validCoupons[cleanCode] });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 1000 && selectedCity === "Jauharabad" ? 0 : (cityDeliveryRates[selectedCity] ?? 50);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        selectedCity,
        setSelectedCity,
        deliveryCharge,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
