import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Upload,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  ArrowUp,
  ArrowDown,
  X,
  AlertCircle,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreState } from "@/lib/useStore";
import {
  saveGalleryItem,
  deleteGalleryItem,
  bulkDeleteGalleryItems,
  bulkToggleGalleryStatus,
  reorderGalleryItems,
  type GalleryRecord,
} from "@/lib/store";

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({
    meta: [{ title: "Manage Gallery Photos | Bari's Biryani Admin" }],
  }),
  component: AdminGalleryPage,
});

function AdminGalleryPage() {
  const { allGallery } = useStoreState();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterCat, setFilterCat] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryRecord | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    src: "",
    alt: "",
    category: "Food" as GalleryRecord["category"],
    isVideo: false,
    fbUrl: "",
    status: "active" as "active" | "hidden",
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["Food", "Interior", "Service", "Videos", "Facebook"] as const;

  const filteredGallery = allGallery.filter(
    (g) => filterCat === "all" || g.category === filterCat
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredGallery.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredGallery.map((g) => g.id));
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: "",
      src: "",
      alt: "",
      category: "Food",
      isVideo: false,
      fbUrl: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryRecord) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      src: item.src,
      alt: item.alt,
      category: item.category,
      isVideo: item.isVideo || false,
      fbUrl: item.fbUrl || "",
      status: item.status,
    });
    setIsModalOpen(true);
  };

  // Canvas image compression for single image
  const handleSingleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    compressImage(file, (base64) => {
      setFormData((prev) => ({ ...prev, src: base64 }));
    });
  };

  // Bulk Image Upload Handler
  const handleBulkFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      compressImage(file, (base64) => {
        saveGalleryItem({
          src: base64,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          category: "Food",
          status: "active",
        });
      });
    });
  };

  function compressImage(file: File, callback: (base64: string) => void) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const maxDim = 1000;
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
        callback(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.src || !formData.alt) {
      alert("Please upload an image and enter alt/caption text.");
      return;
    }

    saveGalleryItem({
      id: formData.id || undefined,
      src: formData.src,
      alt: formData.alt,
      category: formData.category,
      isVideo: formData.isVideo,
      fbUrl: formData.fbUrl,
      status: formData.status,
    });

    setIsModalOpen(false);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allGallery.length) return;

    const newArr = [...allGallery];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    reorderGalleryItems(newArr);
  };

  return (
    <AdminLayout activeTab="gallery" title="Gallery Management">
      <div className="space-y-4">
        {/* Header Actions */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold uppercase text-stone-500">Filter Category:</label>
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:ring-2 focus:ring-[#8C1D18] min-h-[44px]"
            >
              <option value="all">All Categories ({allGallery.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Hidden Bulk File Input */}
            <input
              type="file"
              ref={bulkFileInputRef}
              multiple
              accept="image/png, image/jpeg, image/webp"
              onChange={handleBulkFileChange}
              className="hidden"
            />
            <button
              onClick={() => bulkFileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-[#8C1D18] text-xs font-bold transition min-h-[44px]"
            >
              <Upload className="h-4 w-4" />
              <span>Bulk Upload Photos</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#8C1D18] hover:bg-[#6e1612] text-white text-xs font-bold shadow-sm transition min-h-[44px]"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Add Single Photo</span>
            </button>
          </div>
        </div>

        {/* Bulk Action Toolbar */}
        {selectedIds.length > 0 && (
          <div className="bg-amber-100/90 rounded-2xl p-3 border border-amber-300 flex items-center justify-between gap-4 text-xs font-bold text-amber-900 animate-in fade-in">
            <span>{selectedIds.length} item(s) selected</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => bulkToggleGalleryStatus(selectedIds, "active")}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition min-h-[36px]"
              >
                Publish Selected
              </button>
              <button
                onClick={() => bulkToggleGalleryStatus(selectedIds, "hidden")}
                className="px-3 py-1.5 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition min-h-[36px]"
              >
                Hide Selected
              </button>
              <button
                onClick={() => setBulkDeleteConfirm(true)}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition min-h-[36px]"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid View */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100 text-xs font-bold text-stone-500">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-stone-700 hover:text-[#8C1D18] cursor-pointer"
            >
              {selectedIds.length === filteredGallery.length && filteredGallery.length > 0 ? (
                <CheckSquare className="h-4 w-4 text-[#8C1D18]" />
              ) : (
                <Square className="h-4 w-4 text-stone-400" />
              )}
              <span>Select All</span>
            </button>
            <span>Showing {filteredGallery.length} photos</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, index) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-xl border overflow-hidden transition-all bg-stone-50 ${
                    isSelected ? "border-[#8C1D18] ring-2 ring-[#8C1D18]/30 shadow-md" : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <div className="aspect-[4/3] bg-stone-900/10 relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Selection Checkbox Overlay */}
                    <button
                      onClick={() => toggleSelect(item.id)}
                      className="absolute top-2 left-2 p-1 rounded-lg bg-black/50 text-white backdrop-blur-xs min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      {isSelected ? <CheckSquare className="h-5 w-5 text-amber-400" /> : <Square className="h-5 w-5" />}
                    </button>

                    {/* Status Badge */}
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "active" ? "bg-emerald-600 text-white" : "bg-stone-800 text-stone-300"
                      }`}
                    >
                      {item.status}
                    </span>

                    {item.isVideo && (
                      <span className="absolute bottom-2 left-2 bg-black/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        Video
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <p className="text-xs font-bold text-stone-900 truncate" title={item.alt}>
                      {item.alt || "Untitled Photo"}
                    </p>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mt-0.5">
                      Category: {item.category}
                    </span>

                    <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMove(index, "up")}
                          disabled={index === 0}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Move Left/Up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleMove(index, "down")}
                          disabled={index === filteredGallery.length - 1}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Move Right/Down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-stone-600 hover:text-[#8C1D18] hover:bg-amber-50 rounded-lg transition min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Edit Photo"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Delete Photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EDIT / ADD SINGLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900">
                {editingItem ? "Edit Gallery Photo" : "Add Gallery Photo"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 text-stone-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Photo Caption / Alt Text *
                </label>
                <input
                  type="text"
                  required
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="e.g. Plated Bari's Dum Biryani with Mint & Lemon"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Category Tag *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none bg-white min-h-[44px]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "hidden" })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold focus:ring-2 focus:ring-[#8C1D18] focus:outline-none bg-white min-h-[44px]"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Image File *
                </label>
                <div className="flex items-center gap-4">
                  {formData.src ? (
                    <img src={formData.src} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-stone-300 shrink-0" />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-stone-100 border border-dashed border-stone-300 flex items-center justify-center text-stone-400 shrink-0">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleSingleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition min-h-[44px]"
                    >
                      Choose Image File
                    </button>
                  </div>
                </div>
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SINGLE DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Delete Photo?</h3>
            <p className="mt-2 text-xs text-stone-500">
              Are you sure you want to delete this photo from the gallery?
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
                  deleteGalleryItem(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition min-h-[44px]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK DELETE CONFIRMATION */}
      {bulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Delete {selectedIds.length} Selected Photos?</h3>
            <p className="mt-2 text-xs text-stone-500">
              Are you sure you want to permanently delete all selected photos?
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setBulkDeleteConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-100 transition min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  bulkDeleteGalleryItems(selectedIds);
                  setSelectedIds([]);
                  setBulkDeleteConfirm(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition min-h-[44px]"
              >
                Yes, Bulk Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
