import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreState } from "@/lib/useStore";
import {
  saveMenuItem,
  deleteMenuItem,
  toggleMenuItemStatus,
  reorderMenuItems,
  type MenuItemRecord,
} from "@/lib/store";
import { formatPrice } from "@/lib/formatCurrency";
import { business, createWhatsAppUrl } from "@/lib/business";

export const Route = createFileRoute("/admin/menu")({
  head: () => ({
    meta: [{ title: "Manage Menu Items | Bari's Biryani Admin" }],
  }),
  component: AdminMenuPage,
});

function AdminMenuPage() {
  const { allMenu, allCategories } = useStoreState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItemRecord> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    nameUrdu: "",
    categoryTitle: "",
    price: "",
    unitNote: "",
    description: "",
    image: "",
    featured: false,
    status: "active" as "active" | "hidden",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered Menu
  const filteredMenu = allMenu.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nameUrdu && item.nameUrdu.includes(searchTerm)) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.categoryTitle === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: "",
      name: "",
      nameUrdu: "",
      categoryTitle: allCategories[0]?.title || "Dum Biryani & Rice Specials",
      price: "",
      unitNote: "",
      description: "",
      image: "",
      featured: false,
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MenuItemRecord) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      nameUrdu: item.nameUrdu || "",
      categoryTitle: item.categoryTitle,
      price: item.price.replace(/^(PKR|Rs\.?)\s*/i, ""),
      unitNote: item.unitNote || "",
      description: item.description,
      image: item.image || "",
      featured: item.featured || false,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  // Canvas Image Compression helper
  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const maxDim = 800;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.82);
        setFormData((prev) => ({ ...prev, image: compressedBase64 }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.categoryTitle) {
      alert("Please fill in required fields: Name, Category, and Price.");
      return;
    }

    saveMenuItem({
      id: formData.id || undefined,
      name: formData.name,
      nameUrdu: formData.nameUrdu,
      categoryTitle: formData.categoryTitle,
      price: formData.price,
      unitNote: formData.unitNote,
      description: formData.description,
      image: formData.image,
      featured: formData.featured,
      status: formData.status,
    });

    setIsModalOpen(false);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allMenu.length) return;

    const newArr = [...allMenu];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    reorderMenuItems(newArr);
  };

  const formattedPreviewPrice = formatPrice(formData.price || "0");
  const whatsappPreviewUrl = createWhatsAppUrl(
    business.whatsapp,
    `Assalam-o-Alaikum Bari's Biryani House! I want to order: ${formData.name || "Item Name"} (${formattedPreviewPrice})`
  );

  return (
    <AdminLayout activeTab="menu" title="Menu Item Management">
      <div className="space-y-4">
        {/* Action Header */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search dish by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C1D18] min-h-[44px]"
              />
            </div>

            {/* Category Filter Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#8C1D18] min-h-[44px]"
            >
              <option value="all">All Categories ({allMenu.length})</option>
              {allCategories.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8C1D18] hover:bg-[#6e1612] text-white text-sm font-bold shadow-sm transition min-h-[44px]"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Menu Items Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-700">
              <thead className="bg-stone-100/70 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-600">
                <tr>
                  <th className="py-3.5 px-4 w-12">#</th>
                  <th className="py-3.5 px-4">Item Details</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMenu.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-400 font-medium">
                      No menu items found matching search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredMenu.map((item, index) => (
                    <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-stone-400 font-mono text-xs">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleMove(index, "up")}
                            disabled={index === 0}
                            className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleMove(index, "down")}
                            disabled={index === filteredMenu.length - 1}
                            className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 object-cover rounded-xl border border-stone-200 shrink-0"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200">
                              No Image
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-stone-900 flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {item.nameUrdu && (
                                <span className="text-stone-500 font-normal text-xs">({item.nameUrdu})</span>
                              )}
                              {item.featured && (
                                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 truncate max-w-xs">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-600 hidden md:table-cell">
                        {item.categoryTitle}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#8C1D18]">
                        {item.price}
                        {item.unitNote && <span className="text-xs font-normal text-stone-500 block">{item.unitNote}</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleMenuItemStatus(item.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition min-h-[36px] ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                          }`}
                          title="Click to toggle status"
                        >
                          {item.status === "active" ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                          <span className="capitalize">{item.status}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 text-stone-600 hover:text-[#8C1D18] hover:bg-amber-50 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Edit Item"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Delete Item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EDIT / ADD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900">
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 text-stone-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Dish Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Special Dum Biryani"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Urdu Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.nameUrdu}
                    onChange={(e) => setFormData({ ...formData, nameUrdu: e.target.value })}
                    placeholder="e.g. چکن سموسی"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.categoryTitle}
                    onChange={(e) => setFormData({ ...formData, categoryTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none bg-white font-medium min-h-[44px]"
                  >
                    {allCategories.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Price (Numeric or Suffix) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                      Rs.
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="420 or 1900/kg"
                      className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-[#8C1D18] focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Unit / Portion Note (Optional)
                </label>
                <input
                  type="text"
                  value={formData.unitNote}
                  onChange={(e) => setFormData({ ...formData, unitNote: e.target.value })}
                  placeholder="e.g. per piece, per kg, or packing incl."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short appetizing description..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none"
                />
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Dish Image
                </label>
                <div className="flex items-center gap-4">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-xl border border-stone-300 shrink-0"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-stone-100 border border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 text-xs shrink-0">
                      <Upload className="h-5 w-5 mb-0.5" />
                      <span>Upload</span>
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition min-h-[44px]"
                    >
                      Choose Photo from Gallery / Camera
                    </button>
                    <p className="text-[11px] text-stone-400 mt-1">Auto-compresses images for maximum loading speed.</p>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-stone-300 text-[#8C1D18] focus:ring-[#8C1D18]"
                  />
                  <span>Show on Home Page Showcase</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-stone-500">Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "hidden" })}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              {/* WhatsApp Auto-Message Preview */}
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-emerald-900 text-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>Auto-built WhatsApp Message:</span>
                </div>
                <p className="font-mono bg-white p-2 rounded border border-emerald-100 text-stone-800">
                  Assalam-o-Alaikum Bari's Biryani House! I want to order: {formData.name || "Item"} ({formattedPreviewPrice})
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-100 transition min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#8C1D18] hover:bg-[#6e1612] text-white font-bold text-sm shadow-sm transition min-h-[44px]"
                >
                  Save & Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION POPUP */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Delete Menu Item?</h3>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              Are you sure you want to delete this menu item? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-100 transition min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteMenuItem(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition min-h-[44px]"
              >
                Yes, Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
