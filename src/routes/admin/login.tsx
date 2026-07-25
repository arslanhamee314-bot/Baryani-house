import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, User, Shield, AlertTriangle } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { loginAdmin, checkIsAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Bari's Biryani & Pizza" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (typeof window !== "undefined" && checkIsAuthenticated()) {
    setTimeout(() => {
      navigate({ to: "/admin" });
    }, 0);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);

      if (res.success) {
        navigate({ to: "/admin" });
      } else {
        setErrorMsg(res.error || "Invalid username or password.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img
          src={logoMark}
          alt="Bari's Biryani & Pizza Logo"
          className="mx-auto h-20 w-20 object-contain rounded-2xl bg-white p-2 border border-amber-200 shadow-md"
        />
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#8C1D18]">
          Bari's Biryani & Pizza
        </h2>
        <p className="mt-1 text-sm font-semibold text-amber-800 uppercase tracking-widest">
          Secure Restaurant Admin Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-stone-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMsg}</div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Username
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl leading-5 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C1D18] focus:border-[#8C1D18] text-sm min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl leading-5 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C1D18] focus:border-[#8C1D18] text-sm min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#8C1D18] hover:bg-[#6e1612] active:scale-[0.99] transition-all disabled:opacity-50 min-h-[48px]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Sign in to Admin Dashboard
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
            Initial login credentials: <br />
            <span className="font-mono text-stone-800 font-semibold bg-stone-100 px-1.5 py-0.5 rounded">Username: Bari'suser</span> |{" "}
            <span className="font-mono text-stone-800 font-semibold bg-stone-100 px-1.5 py-0.5 rounded">Password: Bari'sadmin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
