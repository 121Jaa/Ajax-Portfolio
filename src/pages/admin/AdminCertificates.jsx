import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Award,
  AlertCircle,
} from "lucide-react"
import Swal from "sweetalert2"
import {
  getAllCertificates,
  deleteCertificate,
} from "../../services/certificates"

function AdminCertificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deleting, setDeleting] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getAllCertificates()
      setCerts(data || [])
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data",
        text: err.message,
        confirmButtonColor: "#D89B5A",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (cert) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Hapus sertifikat?",
      html: `<b>${cert.title}</b> akan dihapus permanen.`,
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6B6156",
    })

    if (!result.isConfirmed) return

    try {
      setDeleting(cert.id)
      await deleteCertificate(cert.id)
      setCerts((prev) => prev.filter((c) => c.id !== cert.id))
      Swal.fire({
        icon: "success",
        title: "Berhasil dihapus",
        confirmButtonColor: "#D89B5A",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: err.message,
        confirmButtonColor: "#D89B5A",
      })
    } finally {
      setDeleting(null)
    }
  }

  const filtered = certs.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.title?.toLowerCase().includes(q) ||
      c.issuer?.toLowerCase().includes(q) ||
      c.slug?.toLowerCase().includes(q)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ============ HEADER ============ */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-amber/15 border border-amber/30
                       text-amber text-xs font-medium mb-3 sm:mb-4"
          >
            <Award size={12} />
            Certificates
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ivory mb-1 sm:mb-2">
            Kelola Certificates
          </h1>
          <p className="text-ivory/60 text-xs sm:text-sm">
            {loading ? "Memuat..." : `${certs.length} sertifikat terdaftar`}
          </p>
        </div>

        <Link
          to="/admin/certificates/new"
          className="group inline-flex items-center justify-center gap-2
                     px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl
                     bg-amber text-ivory font-medium text-sm
                     hover:bg-amber-dark transition-all shadow-lg shadow-amber/20
                     w-full sm:w-auto"
        >
          <Plus
            size={16}
            className="transition-transform group-hover:rotate-90"
          />
          Tambah Sertifikat
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
          placeholder="Cari sertifikat..."
          className="w-full pl-11 pr-4 py-3 rounded-xl
                     bg-mocha-soft border border-ivory/10
                     text-sm text-ivory placeholder:text-ivory/30
                     focus:outline-none focus:border-amber transition-colors"
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
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group p-4 rounded-2xl bg-mocha-soft border border-ivory/10
                           hover:border-amber/40 transition-all"
              >
                {/* Mobile: stack vertikal | Desktop: horizontal */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {/* Thumbnail + Info */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Thumbnail */}
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden
                                 flex-shrink-0 bg-mocha border border-ivory/10"
                    >
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award size={18} className="text-ivory/30" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-ivory truncate mb-1">
                        {cert.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2
                                      text-xs text-ivory/50 mb-1.5">
                        <span
                          className="px-2 py-0.5 rounded-md
                                     bg-ivory/5 border border-ivory/10"
                        >
                          {cert.issuer}
                        </span>
                        {cert.year && <span>· {cert.year}</span>}
                      </div>
                      <p className="text-xs text-ivory/40 font-mono truncate">
                        /{cert.slug}
                      </p>
                    </div>
                  </div>

                  {/* Actions — di bawah di mobile, kanan di desktop */}
                  <div
                    className="flex items-center gap-2 justify-end
                               sm:flex-shrink-0 pt-2 sm:pt-0
                               border-t sm:border-0 border-ivory/5"
                  >
                    <Link
                      to={`/certificate/${cert.slug}`}
                      title="Preview"
                      className="w-10 h-10 rounded-lg bg-ivory/5 border border-ivory/10
                                 flex items-center justify-center
                                 text-ivory/60 hover:text-amber hover:border-amber
                                 transition-colors"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      to={`/admin/certificates/edit/${cert.id}`}
                      title="Edit"
                      className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/30
                                 flex items-center justify-center
                                 text-amber hover:bg-amber hover:text-ivory
                                 transition-colors"
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(cert)}
                      disabled={deleting === cert.id}
                      title="Hapus"
                      className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30
                                 flex items-center justify-center
                                 text-red-400 hover:bg-red-500/20 hover:text-red-300
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors"
                    >
                      {deleting === cert.id ? (
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
  )
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
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-ivory/5 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-ivory/10 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-ivory/5 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-ivory/5 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ search, onClear }) {
  return (
    <div className="text-center py-16 sm:py-20">
      <div
        className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16
                   rounded-full bg-amber/10 border border-amber/30 mb-4"
      >
        <AlertCircle size={24} className="text-amber" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-ivory mb-2">
        {search ? "Tidak ada hasil" : "Belum ada sertifikat"}
      </h3>
      <p className="text-xs sm:text-sm text-ivory/60 mb-6 px-4">
        {search
          ? `Tidak ada sertifikat yang cocok dengan "${search}"`
          : "Mulai dengan menambahkan sertifikat pertama."}
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
  )
}

export default AdminCertificates