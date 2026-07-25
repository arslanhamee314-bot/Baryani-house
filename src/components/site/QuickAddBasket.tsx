import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { parsePriceNumber, useCart } from "@/context/CartContext";
import { useState } from "react";

type Props = {
  dish: {
    name: string;
    nameUrdu?: string;
    price: string;
    unit?: string;
    image?: string;
  };
  variant?: "floating" | "button" | "full";
  className?: string;
};

export function QuickAddBasket({ dish, variant = "floating", className = "" }: Props) {
  const { cart, addToCart, updateQuantity, setIsCartOpen } = useCart();
  const [addedToast, setAddedToast] = useState(false);

  const itemId = dish.name.toLowerCase().replace(/\s+/g, "-");
  const cartItem = cart.find((i) => i.id === itemId);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't open dish details modal
    const priceNum = parsePriceNumber(dish.price);
    addToCart(
      {
        id: itemId,
        name: dish.name,
        nameUrdu: dish.nameUrdu,
        price: priceNum,
        priceRaw: dish.price,
        unit: dish.unit,
        image: dish.image,
      },
      1
    );

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(itemId, -1);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(itemId, 1);
  };

  const handleOpenCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCartOpen(true);
  };

  // 1. Floating Corner Badge Variant (placed on top-left of product image)
  if (variant === "floating") {
    if (currentQty > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-3 left-3 z-20 flex items-center bg-[color:var(--primary)] text-white rounded-full shadow-lg border border-white/20 overflow-hidden text-xs font-bold ${className}`}
        >
          <button
            onClick={handleDecrease}
            className="h-8 w-7 flex items-center justify-center hover:bg-black/20 transition-colors"
            title="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>

          <button
            onClick={handleOpenCart}
            className="px-1.5 flex items-center gap-1 hover:underline"
            title="View in Basket"
          >
            <ShoppingBag className="h-3 w-3" />
            <span>{currentQty}</span>
          </button>

          <button
            onClick={handleIncrease}
            className="h-8 w-7 flex items-center justify-center hover:bg-black/20 transition-colors"
            title="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={handleAdd}
        className={`absolute top-3 left-3 z-20 h-9 w-9 rounded-full bg-white/95 dark:bg-slate-900/90 text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group border border-slate-200 dark:border-slate-800 ${className}`}
        title="Quick Add to Basket"
      >
        {addedToast ? (
          <Check className="h-4 w-4 text-green-500 animate-bounce" />
        ) : (
          <div className="relative">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[color:var(--primary)] text-white text-[9px] font-bold group-hover:bg-white group-hover:text-[color:var(--primary)]">
              +
            </span>
          </div>
        )}
      </button>
    );
  }

  // 2. Action Button Variant (for bottom of product card)
  return (
    <button
      onClick={handleAdd}
      className={`btn-primary text-xs py-2 px-3 gap-1.5 justify-center ${className}`}
    >
      <ShoppingBag className="h-3.5 w-3.5" />
      {currentQty > 0 ? `Add More (${currentQty})` : "Add to Cart"}
    </button>
  );
}
