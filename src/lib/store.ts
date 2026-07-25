import { featuredDishes, menuCategories } from "@/data/menu";
import { gallery as initialGallery, type GalleryItem } from "@/data/gallery";
import { business } from "@/lib/business";
import { formatPrice } from "@/lib/formatCurrency";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type MenuItemRecord = {
  id: string;
  name: string;
  nameUrdu?: string;
  description: string;
  price: string;
  unitNote?: string;
  image?: string;
  categoryTitle: string;
  featured?: boolean;
  status: "active" | "hidden";
  orderIndex: number;
};

export type CategoryRecord = {
  id: string;
  title: string;
  note?: string;
  orderIndex: number;
};

export type GalleryRecord = {
  id: string;
  src: string;
  alt: string;
  category: "Food" | "Interior" | "Service" | "Videos" | "Facebook";
  isVideo?: boolean;
  fbUrl?: string;
  status: "active" | "hidden";
  orderIndex: number;
};

export type SiteSettingsRecord = {
  phone: string;
  whatsapp: string;
  hours: string;
  addressLine1: string;
  addressLine2: string;
  facebookUrl: string;
};

// Storage Keys
const MENU_STORAGE_KEY = "baris_menu_items_v2";
const CAT_STORAGE_KEY = "baris_categories_v2";
const GALLERY_STORAGE_KEY = "baris_gallery_v2";
const SETTINGS_STORAGE_KEY = "baris_settings_v2";

// Default Initializers
function getInitialCategories(): CategoryRecord[] {
  return menuCategories.map((c, i) => ({
    id: `cat_${i + 1}`,
    title: c.title,
    note: c.note || "",
    orderIndex: i,
  }));
}

function getInitialMenuItems(): MenuItemRecord[] {
  let count = 0;
  const items: MenuItemRecord[] = [];

  menuCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      count++;
      items.push({
        id: `item_${count}`,
        name: item.name,
        nameUrdu: "",
        description: item.description,
        price: formatPrice(item.price),
        unitNote: "",
        image: item.image,
        categoryTitle: cat.title,
        featured: featuredDishes.some((f) => f.name === item.name),
        status: "active",
        orderIndex: count,
      });
    });
  });

  return items;
}

function getInitialGallery(): GalleryRecord[] {
  return initialGallery.map((g, i) => ({
    id: `gal_${i + 1}`,
    src: g.src,
    alt: g.alt,
    category: g.category,
    isVideo: g.isVideo,
    fbUrl: g.fbUrl,
    status: "active",
    orderIndex: i,
  }));
}

function getInitialSettings(): SiteSettingsRecord {
  return {
    phone: business.phone,
    whatsapp: business.whatsapp,
    hours: business.hoursLabel,
    addressLine1: business.address.line1,
    addressLine2: business.address.line2,
    facebookUrl: business.facebookUrl,
  };
}

// Global Store State
let categories: CategoryRecord[] = [];
let menuItems: MenuItemRecord[] = [];
let galleryItems: GalleryRecord[] = [];
let siteSettings: SiteSettingsRecord = getInitialSettings();

// Event listeners for reactive store updates
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export function subscribeStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyStore() {
  listeners.forEach((l) => l());
}

// Load Initial Data
export function initStore() {
  if (typeof window === "undefined") return;

  // Categories
  const savedCats = localStorage.getItem(CAT_STORAGE_KEY);
  categories = savedCats ? JSON.parse(savedCats) : getInitialCategories();

  // Menu items
  const savedMenu = localStorage.getItem(MENU_STORAGE_KEY);
  menuItems = savedMenu ? JSON.parse(savedMenu) : getInitialMenuItems();

  // Gallery items
  const savedGallery = localStorage.getItem(GALLERY_STORAGE_KEY);
  galleryItems = savedGallery ? JSON.parse(savedGallery) : getInitialGallery();

  // Settings
  const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (savedSettings) {
    siteSettings = JSON.parse(savedSettings);
  }

  // If Supabase is configured, pull remote updates in background
  if (isSupabaseConfigured && supabase) {
    syncFromSupabase();
  }
}

async function syncFromSupabase() {
  if (!supabase) return;
  try {
    const { data: catData } = await supabase.from("categories").select("*").order("orderIndex");
    if (catData && catData.length > 0) categories = catData;

    const { data: menuData } = await supabase.from("menu_items").select("*").order("orderIndex");
    if (menuData && menuData.length > 0) menuItems = menuData;

    const { data: galData } = await supabase.from("gallery_images").select("*").order("orderIndex");
    if (galData && galData.length > 0) galleryItems = galData;

    const { data: setDb } = await supabase.from("site_settings").select("*").single();
    if (setDb) siteSettings = setDb;

    saveLocal();
    notifyStore();
  } catch (err) {
    console.warn("Supabase sync warning:", err);
  }
}

function saveLocal() {
  if (typeof window === "undefined") return;
  localStorage.setItem(CAT_STORAGE_KEY, JSON.stringify(categories));
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
  localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(galleryItems));
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
  notifyStore();
}

// Run initial load
initStore();

// --- PUBLIC GETTERS ---
export function getActiveCategories(): CategoryRecord[] {
  return [...categories].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getAllCategories(): CategoryRecord[] {
  return [...categories].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getActiveMenuItems(): MenuItemRecord[] {
  return menuItems
    .filter((item) => item.status === "active")
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getAllMenuItems(): MenuItemRecord[] {
  return [...menuItems].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getActiveFeaturedDishes(): MenuItemRecord[] {
  return menuItems
    .filter((item) => item.status === "active" && item.featured)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getActiveGallery(): GalleryRecord[] {
  return galleryItems
    .filter((item) => item.status === "active")
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getAllGallery(): GalleryRecord[] {
  return [...galleryItems].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getSiteSettings(): SiteSettingsRecord {
  return { ...siteSettings };
}

// --- CATEGORY CRUD ---
export function saveCategory(cat: Partial<CategoryRecord> & { title: string }): CategoryRecord {
  if (cat.id) {
    const idx = categories.findIndex((c) => c.id === cat.id);
    if (idx !== -1) {
      categories[idx] = { ...categories[idx], ...cat };
    }
  } else {
    const newCat: CategoryRecord = {
      id: `cat_${Date.now()}`,
      title: cat.title,
      note: cat.note || "",
      orderIndex: categories.length,
    };
    categories.push(newCat);
  }
  saveLocal();
  return categories.find((c) => c.title === cat.title) || categories[0];
}

export function deleteCategory(id: string): { success: boolean; error?: string } {
  const cat = categories.find((c) => c.id === id);
  if (!cat) return { success: false, error: "Category not found" };

  // Check if items exist under this category
  const hasItems = menuItems.some((m) => m.categoryTitle === cat.title);
  if (hasItems) {
    // Reassign items to Uncategorized
    menuItems.forEach((m) => {
      if (m.categoryTitle === cat.title) {
        m.categoryTitle = "Uncategorized";
      }
    });
  }

  categories = categories.filter((c) => c.id !== id);
  saveLocal();
  return { success: true };
}

export function reorderCategories(newOrdered: CategoryRecord[]): void {
  categories = newOrdered.map((cat, idx) => ({ ...cat, orderIndex: idx }));
  saveLocal();
}

// --- MENU ITEM CRUD ---
export function saveMenuItem(item: Partial<MenuItemRecord> & { name: string; price: string; categoryTitle: string }): MenuItemRecord {
  const formattedPrice = formatPrice(item.price);

  if (item.id) {
    const idx = menuItems.findIndex((m) => m.id === item.id);
    if (idx !== -1) {
      menuItems[idx] = {
        ...menuItems[idx],
        ...item,
        price: formattedPrice,
      };
    }
  } else {
    const newItem: MenuItemRecord = {
      id: `item_${Date.now()}`,
      name: item.name,
      nameUrdu: item.nameUrdu || "",
      description: item.description || "",
      price: formattedPrice,
      unitNote: item.unitNote || "",
      image: item.image || "",
      categoryTitle: item.categoryTitle,
      featured: item.featured ?? false,
      status: item.status || "active",
      orderIndex: menuItems.length,
    };
    menuItems.push(newItem);
  }
  saveLocal();
  return menuItems[menuItems.length - 1];
}

export function deleteMenuItem(id: string): void {
  menuItems = menuItems.filter((m) => m.id !== id);
  saveLocal();
}

export function toggleMenuItemStatus(id: string): void {
  const idx = menuItems.findIndex((m) => m.id === id);
  if (idx !== -1) {
    menuItems[idx].status = menuItems[idx].status === "active" ? "hidden" : "active";
    saveLocal();
  }
}

export function reorderMenuItems(newOrdered: MenuItemRecord[]): void {
  menuItems = newOrdered.map((item, idx) => ({ ...item, orderIndex: idx }));
  saveLocal();
}

// --- GALLERY CRUD ---
export function saveGalleryItem(item: Partial<GalleryRecord> & { src: string; alt: string; category: GalleryRecord["category"] }): GalleryRecord {
  if (item.id) {
    const idx = galleryItems.findIndex((g) => g.id === item.id);
    if (idx !== -1) {
      galleryItems[idx] = { ...galleryItems[idx], ...item };
    }
  } else {
    const newItem: GalleryRecord = {
      id: `gal_${Date.now()}`,
      src: item.src,
      alt: item.alt,
      category: item.category,
      isVideo: item.isVideo || false,
      fbUrl: item.fbUrl || "",
      status: item.status || "active",
      orderIndex: galleryItems.length,
    };
    galleryItems.push(newItem);
  }
  saveLocal();
  return galleryItems[galleryItems.length - 1];
}

export function deleteGalleryItem(id: string): void {
  galleryItems = galleryItems.filter((g) => g.id !== id);
  saveLocal();
}

export function bulkDeleteGalleryItems(ids: string[]): void {
  const idSet = new Set(ids);
  galleryItems = galleryItems.filter((g) => !idSet.has(g.id));
  saveLocal();
}

export function bulkToggleGalleryStatus(ids: string[], newStatus: "active" | "hidden"): void {
  const idSet = new Set(ids);
  galleryItems.forEach((g) => {
    if (idSet.has(g.id)) {
      g.status = newStatus;
    }
  });
  saveLocal();
}

export function reorderGalleryItems(newOrdered: GalleryRecord[]): void {
  galleryItems = newOrdered.map((item, idx) => ({ ...item, orderIndex: idx }));
  saveLocal();
}

// --- SITE SETTINGS CRUD ---
export function updateSiteSettings(settings: Partial<SiteSettingsRecord>): void {
  siteSettings = { ...siteSettings, ...settings };
  saveLocal();
}
