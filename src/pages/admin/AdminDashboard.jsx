import { motion } from "framer-motion"
import { LayoutDashboard, FileCode2, Award, Plus } from "lucide-react"
import { Link } from "react-router-dom"

function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                        bg-amber/15 border border-amber/30
                        text-amber text-xs font-medium mb-4">
          <LayoutDashboard size={12} />
          Dashboard
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-ivory mb-2">
          Selamat Datang 👋
        </h1>
        <p className="text-ivory/60 text-sm">
          Kelola project dan sertifikat portofolio kamu dari sini.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/admin/projects"
          className="group p-6 rounded-2xl bg-mocha-soft border border-ivory/10
                     hover:border-amber/50 hover:-translate-y-1
                     transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-amber/15
                          flex items-center justify-center mb-4
                          group-hover:bg-amber group-hover:scale-110
                          transition-all">
            <FileCode2
              size={22}
              className="text-amber group-hover:text-ivory transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold text-ivory mb-1 group-hover:text-amber
                         transition-colors">
            Kelola Projects
          </h3>
          <p className="text-xs text-ivory/50">
            Tambah, edit, atau hapus project portofolio.
          </p>
        </Link>

        <Link
          to="/admin/certificates"
          className="group p-6 rounded-2xl bg-mocha-soft border border-ivory/10
                     hover:border-amber/50 hover:-translate-y-1
                     transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-amber/15
                          flex items-center justify-center mb-4
                          group-hover:bg-amber group-hover:scale-110
                          transition-all">
            <Award
              size={22}
              className="text-amber group-hover:text-ivory transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold text-ivory mb-1 group-hover:text-amber
                         transition-colors">
            Kelola Certificates
          </h3>
          <p className="text-xs text-ivory/50">
            Atur daftar sertifikat yang sudah kamu raih.
          </p>
        </Link>
      </div>

      {/* Info box */}
      <div className="p-5 rounded-2xl bg-amber/5 border border-amber/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber/20
                          flex items-center justify-center flex-shrink-0">
            <Plus size={16} className="text-amber" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ivory mb-1">
              Mulai dari sini
            </h4>
            <p className="text-xs text-ivory/60 leading-relaxed">
              Klik salah satu kartu di atas untuk mulai mengelola konten.
              Semua perubahan akan langsung tampil di portofolio publik.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard