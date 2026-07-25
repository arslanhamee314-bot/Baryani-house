export const business = {
  name: "Bari's Biryani & Pizza",
  tagline: "Fresh, Flavorful Biryani & Fast Food in Sarwar Shaheed Chowk, Jauharabad",
  category: "Biryani & Fast Food Restaurant",
  phone: "+92 300 2797932",
  phoneTel: "+923002797932",
  phoneHref: "tel:+923002797932",
  whatsapp: "+92 300 2797932",
  whatsappUrl: "https://wa.me/923002797932",
  facebookUrl: "https://www.facebook.com/baribiryanihouse/",
  address: {
    line1: "Sarwar Shaheed Chowk, Main Bazar",
    line2: "Jauharabad",
    region: "Punjab",
    country: "Pakistan",
  },
  hoursLabel: "Daily 8:00 AM – 11:00 PM",
  hoursSchema: "Mo-Su 08:00-23:00",
  rating: 4.2,
  mapsQuery: "Bari's Biryani & Pizza, Sarwar Shaheed Chowk, Jauharabad, Punjab, Pakistan",
  mapsUrl: "https://maps.app.goo.gl/Quk9U3pPEYiXUd6N6",
} as const;

export function createWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  // api.whatsapp.com/send endpoint guarantees universal UTF-8 emoji & Urdu character decoding on mobile & web
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}

export const callHref = `tel:${business.phone.replace(/[^\d+]/g, "")}`;
export const directionsHref = business.mapsUrl;
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent("Bari's Biryani & Pizza Jauharabad")}&output=embed`;
export const whatsappHref = createWhatsAppUrl(business.whatsapp, "Assalam-o-Alaikum Bari's Biryani House! I want to place an order.");
export const googleReviewsHref = business.mapsUrl;
