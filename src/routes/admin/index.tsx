import { createFileRoute, Link } from "@tanstack/react-router";
import { UtensilsCrossed, Tags, Image as ImageIcon, Plus, Settings, Eye, ChevronRight } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreState } from "@/lib/useStore";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard | Bari's Biryani & Pizza" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { allMenu, activeMenu, allCategories, allGallery, activeGallery } = useStoreState();

  const totalMenu = allMenu.length;
  const activeCount = activeMenu.length;
  const hiddenCount = totalMenu - activeCount;

  return (
    <AdminLayout activeTab="dashboard" title="Dashboard Overview">
      <div className="space-y-6">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Menu Items */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Menu Items</p>
              <h3 className="mt-1 text-3xl font-extrabold text-stone-900">{totalMenu}</h3>
              <p className="mt-1 text-xs text-stone-600 font-medium">
                <span className="text-emerald-700 font-bold">{activeCount} active</span> ·{" "}
                <span className="text-stone-400">{hiddenCount} hidden</span>
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-amber-100 text-[#8C1D18] flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
          </div>

          {/* Card 2: Categories */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Categories</p>
              <h3 className="mt-1 text-3xl font-extrabold text-stone-900">{allCategories.length}</h3>
              <p className="mt-1 text-xs text-stone-600 font-medium">Organized for public menu</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-amber-100 text-[#8C1D18] flex items-center justify-center">
              <Tags className="h-6 w-6" />
            </div>
          </div>

          {/* Card 3: Gallery Photos */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Gallery Items</p>
              <h3 className="mt-1 text-3xl font-extrabold text-stone-900">{allGallery.length}</h3>
              <p className="mt-1 text-xs text-stone-600 font-medium">
                <span className="text-emerald-700 font-bold">{activeGallery.length} published</span>
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-amber-100 text-[#8C1D18] flex items-center justify-center">
              <ImageIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <h2 className="text-base font-bold text-stone-900 mb-4">Quick Management Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/admin/menu"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 text-[#8C1D18] font-bold text-sm transition text-center min-h-[80px]"
            >
              <Plus className="h-6 w-6" />
              <span>Add New Dish</span>
            </Link>

            <Link
              to="/admin/categories"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-sm transition text-center min-h-[80px]"
            >
              <Tags className="h-6 w-6 text-stone-600" />
              <span>Categories</span>
            </Link>

            <Link
              to="/admin/gallery"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-sm transition text-center min-h-[80px]"
            >
              <ImageIcon className="h-6 w-6 text-stone-600" />
              <span>Upload Photos</span>
            </Link>

            <Link
              to="/admin/settings"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-sm transition text-center min-h-[80px]"
            >
              <Settings className="h-6 w-6 text-stone-600" />
              <span>Site Settings</span>
            </Link>
          </div>
        </div>

        {/* Recent Items Preview */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-stone-900">Current Catalog Preview</h2>
            <Link to="/admin/menu" className="text-xs font-bold text-[#8C1D18] hover:underline flex items-center gap-1">
              <span>View All Items</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {allMenu.slice(0, 5).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-xl border border-stone-200 shrink-0" />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 font-bold text-xs shrink-0">
                      No img
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-900 text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-stone-500">{item.categoryTitle} · <span className="font-semibold text-[#8C1D18]">{item.price}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-500"}`}>
                    {item.status}
                  </span>
                  <Link to="/admin/menu" className="p-2 text-stone-400 hover:text-stone-700 min-h-[40px] min-w-[40px] flex items-center justify-center">
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
