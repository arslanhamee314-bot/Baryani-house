export const business = {
  name: "Bari's Biryani & Pizza",
  tagline: "Fresh, Flavorful Biryani & Fast Food in Sarwar Shaheed Chowk, Jauharabad",
  category: "Biryani & Fast Food Restaurant",
  phone: "+92 307 6698028",
  phoneTel: "+923076698028",
  phoneHref: "tel:+923076698028",
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

export const callHref = `tel:${business.phone.replace(/[^\d+]/g, "")}`;
export const directionsHref = business.mapsUrl;
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent("Bari's Biryani & Pizza Jauharabad")}&output=embed`;
export const whatsappHref = `https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`;
export const googleReviewsHref = business.mapsUrl;
