import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lock, Save, CheckCircle, AlertTriangle, Phone, MapPin, Clock, Facebook } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreState } from "@/lib/useStore";
import { updateSiteSettings } from "@/lib/store";
import { getStoredPasswordHash, updatePasswordHash } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "Admin Settings | Bari's Biryani Admin" }],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const { settings } = useStoreState();

  // Settings State
  const [formData, setFormData] = useState({
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    hours: settings.hours,
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2,
    facebookUrl: settings.facebookUrl,
  });

  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess(false);

    if (newPassword.length < 6) {
      setPwdError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError("New password and confirmation do not match.");
      return;
    }

    const currentHash = getStoredPasswordHash();
    if (!bcrypt.compareSync(currentPassword, currentHash)) {
      setPwdError("Incorrect current password.");
      return;
    }

    updatePasswordHash(newPassword);
    setPwdSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => setPwdSuccess(false), 4000);
  };

  return (
    <AdminLayout activeTab="settings" title="Site & Admin Settings">
      <div className="space-y-6 max-w-3xl">
        {/* Section 1: General Business Information Settings */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Phone className="h-5 w-5 text-[#8C1D18]" />
            <span>Business Information</span>
          </h2>

          {settingsSuccess && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-3 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-sm font-semibold">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Business settings updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Primary Contact Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#25D366]">
                    WA
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Business Hours Label
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="8:00 AM – 11:00 PM Daily"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Address Line 1
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  required
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Facebook Page URL
              </label>
              <div className="relative">
                <Facebook className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="url"
                  required
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8C1D18] hover:bg-[#6e1612] text-white text-sm font-bold shadow-sm transition min-h-[44px]"
              >
                <Save className="h-4 w-4" />
                <span>Save Business Info</span>
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Security & Admin Password Update */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#8C1D18]" />
            <span>Change Admin Password</span>
          </h2>

          {pwdError && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 border border-red-200 flex items-center gap-2 text-red-800 text-sm font-semibold">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
              <span>{pwdError}</span>
            </div>
          )}

          {pwdSuccess && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-3 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-sm font-semibold">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Admin password changed successfully! Use your new password for future logins.</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="mt-5 space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                New Password *
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#8C1D18] focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="pt-3 flex justify-start">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-sm font-bold shadow-sm transition min-h-[44px]"
              >
                <Lock className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
