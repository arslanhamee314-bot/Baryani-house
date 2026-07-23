import biryaniSpecial from "@/assets/dish-biryani-special.jpg";
import pizzaSpecial from "@/assets/dish-pizza-special.jpg";
import karahiSpecial from "@/assets/dish-karahi-special.jpg";
import fingerFish from "@/assets/dish-finger-fish.jpg";
import chickenSamosi from "@/assets/dish-chicken-samosi.jpg";
import chickenRoll from "@/assets/dish-chicken-roll.jpg";
import burgerBanner from "@/assets/gallery-burger-banner.jpg";
import rasmalaiBanner from "@/assets/gallery-rasmalai-banner.jpg";
import realPizza from "@/assets/gallery-real-pizza.jpg";
import friedChicken from "@/assets/gallery-fried-chicken.jpg";
import fruitChaat from "@/assets/gallery-fruit-chaat.jpg";
import shakesMenu from "@/assets/gallery-shakes-menu.jpg";
import biryaniBanner from "@/assets/gallery-biryani-banner.jpg";
import pulaoMenu from "@/assets/gallery-pulao-menu.jpg";
import nashtaBanner from "@/assets/gallery-nashta-banner.jpg";
import realBiryani from "@/assets/gallery-real-biryani.jpg";
import chicken from "@/assets/dish-chicken-biryani.jpg";
import mutton from "@/assets/dish-mutton-biryani.jpg";
import interior from "@/assets/gallery-interior-1.jpg";
import serving from "@/assets/gallery-serving.jpg";
import hero from "@/assets/hero-biryani.jpg";

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Food" | "Interior" | "Service" | "Videos" | "Facebook";
  isVideo?: boolean;
  fbUrl?: string;
};

export const gallery: GalleryItem[] = [
  { src: fingerFish, alt: "Crispy Finger Fish (فنگر فِش - Rs. 1900/kg)", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/" },
  { src: chickenSamosi, alt: "Crispy Chicken Samosi (چکن سموسی - Rs. 30/pc)", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/" },
  { src: chickenRoll, alt: "Chicken Vegetable Roll (چکن ویجیٹیبل رول - Rs. 60/pc)", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/" },
  { src: realBiryani, alt: "Plated Bari's Dum Biryani with Mint & Lemon", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: realPizza, alt: "Bari's Special Pizza with Olives, Sausage & Veggies", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: friedChicken, alt: "Crispy Broast & French Fries", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: fruitChaat, alt: "Creamy Fruit Chaat / Russian Salad Trays", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: rasmalaiBanner, alt: "Bari's Special Ras Malai (رس ملائی - Rs. 60/-)", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: burgerBanner, alt: "De' Bari's Pizza, Burgers & Ice Cream Banner", category: "Facebook", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: shakesMenu, alt: "Milkshakes & Ice Cream Menu Board", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: nashtaBanner, alt: "Special Desi Ghee Nashta Banner", category: "Facebook", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: pulaoMenu, alt: "Bari's Special Pulao Center Menu", category: "Facebook", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: biryaniBanner, alt: "Bari's Biryani House Muharram Banner", category: "Facebook", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: biryaniSpecial, alt: "Bari's Special Dum Chicken Biryani", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/" },
  { src: pizzaSpecial, alt: "Bari's Special Chicken Tikka Pizza", category: "Food", fbUrl: "https://www.facebook.com/baribiryanihouse/" },
  { src: hero, alt: "Fresh Biryani Dum Preparation Video", category: "Videos", isVideo: true, fbUrl: "https://www.facebook.com/baribiryanihouse/videos" },
  { src: interior, alt: "Bari's Biryani House Dining Room", category: "Interior", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: serving, alt: "Kitchen Live Preparation Reel", category: "Videos", isVideo: true, fbUrl: "https://www.facebook.com/baribiryanihouse/videos" },
  { src: chicken, alt: "Chicken Biryani Special Plate", category: "Facebook", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
  { src: mutton, alt: "Mutton Biryani Special", category: "Facebook", fbUrl: "https://www.facebook.com/baribiryanihouse/photos" },
];
