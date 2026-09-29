import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CertificateDetail from "./pages/CertificateDetail";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import ProjectForm from "./pages/admin/ProjectForm";
import AdminCertificates from "./pages/admin/AdminCertificates";
import CertificateForm from "./pages/admin/CertificateForm";

// Layout untuk halaman publik (portofolio)
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* ============ PUBLIC ROUTES ============ */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/certificate/:slug" element={<CertificateDetail />} />
      </Route>

      {/* ============ AUTH ROUTES ============ */}
      <Route path="/admin/login" element={<Login />} />

      {/* ============ ADMIN ROUTES (protected) ============ */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="certificates/new" element={<CertificateForm />} />
        <Route path="certificates/edit/:id" element={<CertificateForm />} />
      </Route>
    </Routes>
  );
}

export default App;
