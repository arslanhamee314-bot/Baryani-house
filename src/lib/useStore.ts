import { useState, useEffect } from "react";
import {
  subscribeStore,
  getActiveMenuItems,
  getAllMenuItems,
  getActiveCategories,
  getAllCategories,
  getActiveGallery,
  getAllGallery,
  getSiteSettings,
  getActiveFeaturedDishes,
  type MenuItemRecord,
  type CategoryRecord,
  type GalleryRecord,
  type SiteSettingsRecord,
} from "./store";

export function useStoreState() {
  const [activeMenu, setActiveMenu] = useState<MenuItemRecord[]>(getActiveMenuItems());
  const [allMenu, setAllMenu] = useState<MenuItemRecord[]>(getAllMenuItems());
  const [featuredMenu, setFeaturedMenu] = useState<MenuItemRecord[]>(getActiveFeaturedDishes());
  const [activeCategories, setActiveCategories] = useState<CategoryRecord[]>(getActiveCategories());
  const [allCategories, setAllCategories] = useState<CategoryRecord[]>(getAllCategories());
  const [activeGallery, setActiveGallery] = useState<GalleryRecord[]>(getActiveGallery());
  const [allGallery, setAllGallery] = useState<GalleryRecord[]>(getAllGallery());
  const [settings, setSettings] = useState<SiteSettingsRecord>(getSiteSettings());

  useEffect(() => {
    const update = () => {
      setActiveMenu(getActiveMenuItems());
      setAllMenu(getAllMenuItems());
      setFeaturedMenu(getActiveFeaturedDishes());
      setActiveCategories(getActiveCategories());
      setAllCategories(getAllCategories());
      setActiveGallery(getActiveGallery());
      setAllGallery(getAllGallery());
      setSettings(getSiteSettings());
    };

    update();
    const unsubscribe = subscribeStore(update);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    activeMenu,
    allMenu,
    featuredMenu,
    activeCategories,
    allCategories,
    activeGallery,
    allGallery,
    settings,
  };
}
