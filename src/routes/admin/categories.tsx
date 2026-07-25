import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Tags, AlertCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreState } from "@/lib/useStore";
import {
  saveCategory,
  deleteCategory,
  reorderCategories,
  type CategoryRecord,
} from "@/lib/store";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [{ title: "Manage Categories | Bari's Biryani Admin" }],
  }),
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const { allCategories, allMenu } = useStoreState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryRecord | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingCat(null);
    setTitle("");
    setNote("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryRecord) => {
    setEditingCat(cat);
    setTitle(cat.title);
    setNote(cat.note || "");
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    saveCategory({
      id: editingCat?.id,
      title: title.trim(),
      note: note.trim(),
    });

    setIsModalOpen(false);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allCategories.length) return;

    const newArr = [...allCategories];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    reorderCategories(newArr);
  };

  const catToDelete = allCategories.find((c) => c.id === deleteConfirmId);
  const itemsUnderCatCount = catToDelete
    ? allMenu.filter((m) => m.categoryTitle === catToDelete.title).length
    : 0;

  return (
    <AdminLayout activeTab="categories" title="Category Management">
      <div className="space-y-4">
        {/* Header Action Bar */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
          <p className="text-sm font-medium text-stone-600">
            Total Categories: <span className="font-bold text-stone-900">{allCategories.length}</span>
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8C1D18] hover:bg-[#6e1612] text-white text-sm font-bold shadow-sm transition min-h-[44px]"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Category</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 gap-3">
          {allCategories.map((cat, index) => {
            const count = allMenu.filter((m) => m.categoryTitle === cat.title).length;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between gap-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0}
                      className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Move Up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === allCategories.length - 1}
                      className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Move Down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-[#8C1D18] flex items-center justify-center font-bold shrink-0">
                    <Tags className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                      <span>{cat.title}</span>
                      <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {count} item{count !== 1 ? "s" : ""}
                      </span>
                    </h3>
                    {cat.note && <p className="text-xs text-stone-500 mt-0.5 truncate">{cat.note}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-2 text-stone-600 hover:text-[#8C1D18] hover:bg-amber-50 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Edit Category"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(cat.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT / ADD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900">
                {editingCat ? "Edit Category" : "Add New Category"}
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
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Freshly Baked Pizzas & Fast Food"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Sub-heading / Note (Optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Slow-cooked fresh daily over dum."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Delete Category?</h3>
            {itemsUnderCatCount > 0 ? (
              <p className="mt-2 text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                Warning: This category currently has <strong>{itemsUnderCatCount} item(s)</strong>. If you delete it, those items will be moved to "Uncategorized".
              </p>
            ) : (
              <p className="mt-2 text-xs text-stone-500">
                Are you sure you want to delete this category?
              </p>
            )}

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-100 transition min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCategory(deleteConfirmId);
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
    </AdminLayout>
  );
}
