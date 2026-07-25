import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash2, X, Plus, Minus, Tag, Truck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cityDeliveryRates, useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    selectedCity,
    setSelectedCity,
    deliveryCharge,
    setIsCheckoutOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon! Try WELCOME10 or BARI50");
    }
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              className="w-screen max-w-md bg-[color:var(--surface)] shadow-2xl flex flex-col border-l border-[color:var(--border)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 bg-[color:var(--primary)] text-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="h-5 w-5" />
                  <h2 className="font-display font-bold text-lg">Your Order Basket</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-[color:var(--border)]">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12 text-[color:var(--muted-foreground)]">
                    <ShoppingBag className="h-16 w-16 stroke-1 text-[color:var(--muted-foreground)]/40 mb-3" />
                    <p className="font-semibold text-lg text-[color:var(--foreground)]">Your basket is empty!</p>
                    <p className="text-sm mt-1 max-w-xs">Add your favorite dum biryani, pizzas or samosas from our menu.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3.5 items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover border border-[color:var(--border)] shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-[color:var(--foreground)] truncate">
                          {item.name}
                        </h4>
                        {item.nameUrdu && (
                          <span className="text-xs text-[color:var(--primary)] font-bold block mt-0.5">
                            {item.nameUrdu}
                          </span>
                        )}
                        <span className="text-xs font-bold text-[color:var(--secondary)] block mt-1">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[color:var(--border)] rounded-lg bg-[color:var(--background)] overflow-hidden shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 flex items-center justify-center hover:bg-[color:var(--muted)] text-[color:var(--foreground)]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 flex items-center justify-center hover:bg-[color:var(--muted)] text-[color:var(--foreground)]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer & Summary */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[color:var(--border)] bg-[color:var(--background)] space-y-3.5">
                  {/* Coupon Input */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--muted-foreground)]" />
                      <input
                        type="text"
                        placeholder="Discount Code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] uppercase font-semibold focus:outline-none focus:border-[color:var(--primary)]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[color:var(--foreground)] text-[color:var(--background)] hover:opacity-90 transition-opacity"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-[11px] text-red-500 font-semibold">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-green-500/10 text-green-600 font-semibold border border-green-500/20">
                      <span>Applied: {appliedCoupon.code}</span>
                      <button onClick={removeCoupon} className="text-red-500 hover:underline">Remove</button>
                    </div>
                  )}

                  {/* Delivery Location Selector */}
                  <div className="flex items-center justify-between gap-2 text-xs pt-1">
                    <span className="flex items-center gap-1.5 text-[color:var(--muted-foreground)] font-medium">
                      <Truck className="h-3.5 w-3.5 text-[color:var(--primary)]" /> Delivery City:
                    </span>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="py-1 px-2 text-xs rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] font-semibold"
                    >
                      {Object.keys(cityDeliveryRates).map((city) => (
                        <option key={city} value={city}>
                          {city} (PKR {cityDeliveryRates[city]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-1.5 pt-2 text-xs border-t border-[color:var(--border)]">
                    <div className="flex justify-between text-[color:var(--muted-foreground)]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[color:var(--foreground)]">PKR {subtotal.toLocaleString()}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Discount</span>
                        <span>- PKR {discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[color:var(--muted-foreground)]">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-[color:var(--foreground)]">
                        {deliveryCharge === 0 ? <span className="text-green-600 font-bold">FREE</span> : `PKR ${deliveryCharge}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-[color:var(--foreground)] pt-2 border-t border-[color:var(--border)]">
                      <span>Grand Total</span>
                      <span className="text-[color:var(--primary)] font-display">PKR {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Proceed to Checkout Button */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="btn-whatsapp w-full py-3.5 text-sm font-semibold justify-center gap-2 shadow-lg rounded-2xl"
                  >
                    <span>Proceed to WhatsApp Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
