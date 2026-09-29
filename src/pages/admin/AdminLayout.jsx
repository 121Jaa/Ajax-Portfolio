import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  FileCode2,
  Award,
  LogOut,
  Home,
} from "lucide-react"
import Swal from "sweetalert2"
import { useAuth } from "../../contexts/AuthContext"

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FileCode2,
  },
  {
    name: "Certificates",
    href: "/admin/certificates",
    icon: Award,
  },
]

function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Logout?",
      text: "Kamu akan keluar dari admin panel.",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#D89B5A",
      cancelButtonColor: "#6B6156",
    })

    if (result.isConfirmed) {
      try {
        await signOut()
        Swal.fire({
          icon: "success",
          title: "Logout berhasil",
          confirmButtonColor: "#D89B5A",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        setTimeout(() => navigate("/admin/login"), 800)
      } catch (err) {
        console.error(err)
        Swal.fire({
          icon: "error",
          title: "Gagal logout",
          text: err.message,
          confirmButtonColor: "#D89B5A",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-mocha pb-20 md:pb-0">
      {/* ============ ADMIN NAVBAR ============ */}
      <nav className="sticky top-0 z-40 bg-mocha-soft/90 backdrop-blur-md border-b border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16 gap-3">
          {/* Logo */}
          <Link
            to="/admin"
            className="flex items-center gap-2 flex-shrink-0 min-w-0"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-ivory truncate">
              ajax<span className="text-amber">.dev</span>
            </span>
            <span
              className="hidden xs:inline-block text-[10px] font-normal text-amber
                         bg-amber/15 px-2 py-0.5 rounded-full border border-amber/30
                         flex-shrink-0"
            >
              ADMIN
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* User email (desktop) */}
            <div className="hidden lg:block text-right mr-1">
              <div className="text-[10px] text-ivory/50 uppercase tracking-wider">
                Logged in as
              </div>
              <div className="text-xs text-ivory font-medium max-w-[200px] truncate">
                {user?.email}
              </div>
            </div>

            {/* Back to site */}
            <Link
              to="/"
              className="w-10 h-10 rounded-lg bg-ivory/5 border border-ivory/10
                         flex items-center justify-center flex-shrink-0
                         text-ivory/60 hover:text-amber hover:border-amber
                         transition-colors"
              title="Lihat portofolio"
              aria-label="Lihat portofolio"
            >
              <Home size={16} />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30
                         flex items-center justify-center flex-shrink-0
                         text-red-400 hover:bg-red-500/20 hover:text-red-300
                         transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* ============ BODY ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar — DESKTOP ONLY */}
          <aside className="hidden md:block md:sticky md:top-24 md:self-start">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.end}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-2.5 rounded-xl
                       text-sm font-medium whitespace-nowrap
                       transition-all duration-200
                       ${
                         isActive
                           ? "bg-amber text-ivory shadow-lg shadow-amber/20"
                           : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
                       }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={16}
                          className={
                            isActive
                              ? ""
                              : "group-hover:scale-110 transition-transform"
                          }
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ============ BOTTOM NAV — MOBILE ONLY ============ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden
                   bg-mocha-soft/95 backdrop-blur-md border-t border-ivory/10
                   pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center gap-1
                   px-3 py-2 rounded-xl flex-1 transition-colors min-w-0
                   ${
                     isActive
                       ? "text-amber"
                       : "text-ivory/50 hover:text-ivory/80"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2
                                   w-8 h-0.5 rounded-full bg-amber"
                      />
                    )}
                    <Icon size={20} />
                    <span className="text-[10px] font-medium leading-none truncate max-w-full">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default AdminLayout