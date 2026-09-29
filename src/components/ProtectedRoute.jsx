import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Saat auth masih loading, tampilkan loading spinner
  // (biar tidak flicker ke login page padahal user sudah login)
  if (loading) {
    return (
      <div className="min-h-screen bg-mocha flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-ivory/60">Memeriksa akses...</p>
        </div>
      </div>
    )
  }

  // Kalau belum login → redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // Kalau login → tampilkan children
  return children
}

export default ProtectedRoute