import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  FileCode2,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { getAllProjects, deleteProject } from "../../services/projects";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data",
        text: err.message,
        confirmButtonColor: "#D89B5A",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (project) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Hapus project?",
      html: `Project <b>${project.title}</b> akan dihapus permanen.`,
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6B6156",
    });

    if (!result.isConfirmed) return;

    try {
      setDeleting(project.id);
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      Swal.fire({
        icon: "success",
        title: "Berhasil dihapus",
        confirmButtonColor: "#D89B5A",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: err.message,
        confirmButtonColor: "#D89B5A",
      });
    } finally {
      setDeleting(null);
    }
  };

  // Filter by search
  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ============ HEADER ============ */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-amber/15 border border-amber/30
                       text-amber text-xs font-medium mb-4"
          >
            <FileCode2 size={12} />
            Projects
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ivory mb-2">
            Kelola Projects
          </h1>
          <p className="text-ivory/60 text-sm">
            {loading ? "Memuat..." : `${projects.length} project terdaftar`}
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl
                     bg-amber text-ivory font-medium text-sm
                     hover:bg-amber-dark transition-all shadow-lg shadow-amber/20"
        >
          <Plus
            size={16}
            className="transition-transform group-hover:rotate-90"
          />
          Tambah Project
        </Link>
      </div>

      {/* ============ SEARCH ============ */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari project berdasarkan judul, kategori, atau slug..."
          className="w-full pl-11 pr-4 py-3 rounded-xl
                     bg-mocha-soft border border-ivory/10
                     text-sm text-ivory placeholder:text-ivory/30
                     focus:outline-none focus:border-amber
                     transition-colors"
        />
      </div>

      {/* ============ CONTENT ============ */}
      {loading ? (
        <ListSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState search={search} onClear={() => setSearch("")} />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group p-4 rounded-2xl bg-mocha-soft border border-ivory/10
                           hover:border-amber/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {/* Wrapper untuk thumbnail + info (selalu berdampingan) */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Thumbnail */}
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0
                 bg-mocha border border-ivory/10"
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileCode2 size={18} className="text-ivory/30" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-ivory truncate">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px]
                       bg-amber/20 text-amber font-semibold flex-shrink-0"
                          >
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-ivory/50 mb-1.5">
                        <span
                          className="px-2 py-0.5 rounded-md
                     bg-ivory/5 border border-ivory/10"
                        >
                          {project.category}
                        </span>
                        {project.year && <span>· {project.year}</span>}
                      </div>
                      <p className="text-xs text-ivory/40 font-mono truncate">
                        /{project.slug}
                      </p>
                    </div>
                  </div>

                  {/* Actions — di bawah di mobile, kanan di desktop */}
                  <div
                    className="flex items-center gap-2 justify-end sm:flex-shrink-0 pt-2 sm:pt-0
                  border-t sm:border-0 border-ivory/5"
                  >
                    <Link
                      to={`/project/${project.slug}`}
                      title="Preview di situs"
                      className="w-10 h-10 rounded-lg bg-ivory/5 border border-ivory/10
                 flex items-center justify-center
                 text-ivory/60 hover:text-amber hover:border-amber
                 transition-colors"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      to={`/admin/projects/edit/${project.id}`}
                      title="Edit"
                      className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/30
                 flex items-center justify-center
                 text-amber hover:bg-amber hover:text-ivory
                 transition-colors"
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project)}
                      disabled={deleting === project.id}
                      title="Hapus"
                      className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30
                 flex items-center justify-center
                 text-red-400 hover:bg-red-500/20 hover:text-red-300
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors"
                    >
                      {deleting === project.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

/* ============ SUB COMPONENTS ============ */

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-mocha-soft border border-ivory/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-ivory/5 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-ivory/10 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-ivory/5 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-ivory/5 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div className="text-center py-20">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full
                   bg-amber/10 border border-amber/30 mb-4"
      >
        <AlertCircle size={24} className="text-amber" />
      </div>
      <h3 className="text-lg font-semibold text-ivory mb-2">
        {search ? "Tidak ada hasil" : "Belum ada project"}
      </h3>
      <p className="text-sm text-ivory/60 mb-6">
        {search
          ? `Tidak ada project yang cocok dengan "${search}"`
          : "Mulai dengan menambahkan project pertama kamu."}
      </p>
      {search && (
        <button
          onClick={onClear}
          className="px-5 py-2 rounded-full bg-amber text-ivory text-sm font-medium
                     hover:bg-amber-dark transition-colors"
        >
          Reset Pencarian
        </button>
      )}
    </div>
  );
}

export default AdminProjects;
