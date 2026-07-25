import biryaniSpecial from "@/assets/dish-biryani-special.jpg";
import pizzaSpecial from "@/assets/dish-pizza-special.jpg";
import karahiSpecial from "@/assets/dish-karahi-special.jpg";
import fingerFish from "@/assets/dish-finger-fish.jpg";
import chickenSamosi from "@/assets/dish-chicken-samosi.jpg";
import chickenRoll from "@/assets/dish-chicken-roll.jpg";
import samosaCat from "@/assets/dish-samosa-cat.jpg";
import shamiCat from "@/assets/dish-shami-cat.jpg";
import biryaniFullParcel from "@/assets/dish-biryani-full-parcel.jpg";
import biryaniFullService from "@/assets/dish-biryani-full-service.jpg";
import biryaniHalfParcel from "@/assets/dish-biryani-half-parcel.jpg";
import biryaniHalfService from "@/assets/dish-biryani-half-service.jpg";
import chicken from "@/assets/dish-chicken-biryani.jpg";
import mutton from "@/assets/dish-mutton-biryani.jpg";

export type Dish = {
  name: string;
  description: string;
  price: string;
  image?: string;
  featured?: boolean;
  editable?: boolean;
};

export const featuredDishes: Dish[] = [
  { name: "Full biryani parcel", description: "Full portion dum chicken biryani packed hot with raita & salan.", price: "PKR 420", image: biryaniFullParcel, featured: true },
  { name: "Full biryani service", description: "Full portion dum chicken biryani served fresh on table.", price: "PKR 400", image: biryaniFullService, featured: true },
  { name: "Half biryani parcel", description: "Single portion dum chicken biryani packed hot.", price: "PKR 310", image: biryaniHalfParcel, featured: true },
  { name: "half biryani service", description: "Single portion dum chicken biryani served fresh.", price: "PKR 300", image: biryaniHalfService, featured: true },
  { name: "Chicken samosa", description: "Golden crispy fried samosa filled with minced chicken.", price: "PKR 50", image: samosaCat, featured: true },
  { name: "Shami kabab", description: "Traditional daal-chicken shami kabab fried to perfection.", price: "PKR 60", image: shamiCat, featured: true },
  { name: "Crispy Finger Fish", description: "Crispy golden fried fish fingers prepared fresh to order.", price: "Rs. 1900/-", image: fingerFish, featured: true },
  { name: "Chicken Samosi", description: "Golden fried crispy samosi filled with spiced minced chicken.", price: "Rs. 30/-", image: chickenSamosi, featured: true },
  { name: "Chicken Vegetable Roll", description: "Crispy spring rolls stuffed with chicken and fresh vegetables.", price: "Rs. 60/-", image: chickenRoll, featured: true },
];

export const menuCategories: { title: string; note?: string; items: Dish[] }[] = [
  {
    title: "WhatsApp Catalog Specials & Biryani",
    note: "Cooked fresh daily over dum with authentic spices.",
    items: [
      { name: "Full biryani parcel", description: "Full portion dum chicken biryani packed hot.", price: "PKR 420", image: biryaniFullParcel },
      { name: "Full biryani service", description: "Full portion dum chicken biryani served fresh.", price: "PKR 400", image: biryaniFullService },
      { name: "Half biryani parcel", description: "Single portion dum chicken biryani packed hot.", price: "PKR 310", image: biryaniHalfParcel },
      { name: "half biryani service", description: "Single portion dum chicken biryani served fresh.", price: "PKR 300", image: biryaniHalfService },
      { name: "Chicken samosa", description: "Golden crispy chicken samosa.", price: "PKR 50", image: samosaCat },
      { name: "Shami kabab", description: "Spiced chicken daal shami kabab.", price: "PKR 60", image: shamiCat },
      { name: "Crispy Finger Fish", description: "Freshly fried golden fish fingers.", price: "Rs. 1900/-", image: fingerFish },
      { name: "Chicken Samosi", description: "Crispy chicken samosi.", price: "Rs. 30/-", image: chickenSamosi },
      { name: "Chicken Vegetable Roll", description: "Spring roll stuffed with chicken & veggies.", price: "Rs. 60/-", image: chickenRoll },
    ],
  },
  {
    title: "Freshly Baked Pizzas & Fast Food",
    note: "Hot pizzas with rich mozzarella cheese & special toppings.",
    items: [
      { name: "Chicken Tikka Pizza", description: "Chicken tikka chunks, cheese, onions, capsicum & oregano.", price: "Rs. 850/-", image: pizzaSpecial },
      { name: "Chicken Fajita Pizza", description: "Fajita chicken, cheese, bell peppers & black olives.", price: "Rs. 850/-", image: pizzaSpecial },
      { name: "Bari's Special Supreme Pizza", description: "Loaded with chicken tikka, sausages, mushrooms, olives & extra cheese.", price: "Rs. 1100/-", image: pizzaSpecial },
    ],
  },
  {
    title: "Karahi & Desserts",
    items: [
      { name: "Bari's Sizzling Chicken Karahi", description: "Wok-cooked with tomato, ginger and green chilli.", price: "Rs. 1200/-", image: karahiSpecial },
      { name: "Bari's Special Ras Malai", description: "Soft mouthwatering ras malai in pistachio milk.", price: "Rs. 60/-" },
    ],
  },
];
