import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi dulu",
        text: "Email dan password harus diisi.",
        confirmButtonColor: "#D89B5A",
      });
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Berhasil login!",
        text: "Selamat datang kembali.",
        confirmButtonColor: "#D89B5A",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/admin"), 800);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text:
          err.message === "Invalid login credentials"
            ? "Email atau password salah."
            : err.message,
        confirmButtonColor: "#D89B5A",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-mocha flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ivory mb-2">
            ajax<span className="text-amber">.dev</span>
          </h1>
          <p className="text-sm text-ivory/60">Admin Panel</p>
        </div>

        {/* Card */}
        <div
          className="p-8 rounded-3xl bg-mocha-soft border border-ivory/10
                     shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ivory mb-1">
              Masuk ke Dashboard
            </h2>
            <p className="text-xs text-ivory/50">
              Login khusus admin. Bukan halaman publik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-ivory/70 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ajax.dev"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl
                             bg-ivory/5 border border-ivory/10
                             text-sm text-ivory placeholder:text-ivory/30
                             focus:outline-none focus:border-amber
                             transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-ivory/70 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl
                             bg-ivory/5 border border-ivory/10
                             text-sm text-ivory placeholder:text-ivory/30
                             focus:outline-none focus:border-amber
                             transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             p-1 rounded text-ivory/40 hover:text-amber
                             transition-colors"
                  aria-label={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="group w-full inline-flex items-center justify-center gap-2
                         px-6 py-3 rounded-xl
                         bg-amber text-ivory font-medium text-sm
                         hover:bg-amber-dark
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-colors shadow-lg shadow-amber/20"
            >
              {submitting ? "Memproses..." : "Masuk"}
              {!submitting && (
                <ArrowRight
                  size={16}
                  className="transition-transform
                             group-hover:translate-x-1"
                />
              )}
            </button>
          </form>
        </div>

        {/* Footer kecil */}
        <p className="text-center text-[11px] text-ivory/40 mt-6">
          Lupa password? Reset di Supabase Dashboard.
        </p>
      </motion.div>
    </main>
  );
}

export default Login;
