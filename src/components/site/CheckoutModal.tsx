import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone, User, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cityDeliveryRates, useCart } from "@/context/CartContext";
import { business } from "@/lib/business";

export function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    appliedCoupon,
    selectedCity,
    setSelectedCity,
    deliveryCharge,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneError, setPhoneError] = useState("");

  if (!isCheckoutOpen) return null;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    // Validate Pakistani Phone format (e.g. 03001234567 or +923001234567)
    const phoneClean = phone.replace(/[\s-]/g, "");
    if (!/^(03[0-9]{9}|\+923[0-9]{9})$/.test(phoneClean)) {
      setPhoneError("Please enter a valid Pakistani mobile number (e.g., 03002797932)");
      return;
    }

    const orderId = "BH" + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });

    // Itemized Order Details
    let itemsText = "";
    cart.forEach((item, i) => {
      itemsText += `${i + 1}. ${item.name} ${item.nameUrdu ? `(${item.nameUrdu})` : ""} × ${item.quantity} = PKR ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    // Format Multi-Product WhatsApp Message
    let msg = `Assalam-o-Alaikum! 🌸\nNew Order - ${business.name}\n\n`;
    msg += `📦 *Order Details:* (${orderId})\n`;
    msg += itemsText;
    msg += `\n💵 *Subtotal:* PKR ${subtotal.toLocaleString()}`;
    if (discountAmount > 0) msg += `\n🏷️ *Discount (${appliedCoupon?.code}):* -PKR ${discountAmount.toLocaleString()}`;
    msg += `\n🚚 *Delivery (${selectedCity}):* PKR ${deliveryCharge}`;
    msg += `\n💰 *Grand Total:* PKR ${grandTotal.toLocaleString()}\n\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📞 *Phone:* ${phoneClean}\n`;
    msg += `🏙️ *City:* ${selectedCity}\n`;
    msg += `📍 *Address:* ${address}\n`;
    if (notes) msg += `📝 *Notes:* ${notes}\n`;
    msg += `\n📅 *Order Date:* ${orderDate}\n`;
    msg += `🌐 *Order Source:* Website (Jauharabad)`;

    const whatsappNumber = business.whatsapp.replace(/[^\d]/g, "");
    const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

    // Clear cart and close modal
    clearCart();
    setIsCheckoutOpen(false);

    // Redirect to WhatsApp
    window.open(encodedUrl, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCheckoutOpen(false)}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-lg bg-[color:var(--surface)] rounded-3xl shadow-2xl overflow-hidden z-10 border border-[color:var(--border)] max-h-[90vh] flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Modal Header */}
          <div className="p-5 bg-[color:var(--primary)] text-white flex items-center justify-between shadow-sm">
            <div>
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Confirm Delivery Details
              </h3>
              <p className="text-xs text-white/80 mt-0.5">Quick order placement via WhatsApp</p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Form Content */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {/* Delivery Estimate Banner */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4 shrink-0 text-amber-600" />
              <span>Freshly prepared & delivered hot (Estimated 30 - 45 mins in Jauharabad)</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[color:var(--foreground)] mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--muted-foreground)]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Arslan Hameed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] focus:outline-none focus:border-[color:var(--primary)] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[color:var(--foreground)] mb-1.5">
                WhatsApp Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--muted-foreground)]" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03002797932"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] focus:outline-none focus:border-[color:var(--primary)] font-medium"
                />
              </div>
              {phoneError && <p className="text-[11px] text-red-500 font-semibold mt-1">{phoneError}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[color:var(--foreground)] mb-1.5">
                  City *
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] font-medium focus:outline-none focus:border-[color:var(--primary)]"
                >
                  {Object.keys(cityDeliveryRates).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[color:var(--foreground)] mb-1.5">
                  Total Amount
                </label>
                <div className="p-2.5 text-xs rounded-xl bg-[color:var(--muted)] font-bold text-[color:var(--primary)] border border-[color:var(--border)]">
                  PKR {grandTotal.toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[color:var(--foreground)] mb-1.5">
                Delivery Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-[color:var(--muted-foreground)]" />
                <textarea
                  required
                  rows={2}
                  placeholder="House #, Street #, Sector / Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] focus:outline-none focus:border-[color:var(--primary)] font-medium resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[color:var(--foreground)] mb-1.5">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra raita & spoon, or call on arrival"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] focus:outline-none focus:border-[color:var(--primary)] font-medium"
              />
            </div>

            <button
              type="submit"
              className="btn-whatsapp w-full py-3.5 text-sm font-semibold justify-center gap-2 rounded-2xl shadow-lg mt-2"
            >
              <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
              </svg>
              Confirm & Send Order on WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
