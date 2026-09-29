import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Award, Code2 } from "lucide-react"
import { getAllProjects } from "../services/projects"
import { getAllCertificates } from "../services/certificates"

function Projects() {
  const [activeTab, setActiveTab] = useState("projects")
  const [projectsData, setProjectsData] = useState([])
  const [certificatesData, setCertificatesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const [projects, certificates] = await Promise.all([
          getAllProjects(),
          getAllCertificates(),
        ])
        setProjectsData(projects || [])
        setCertificatesData(certificates || [])
      } catch (err) {
        console.error(err)
        setError("Gagal memuat data. Coba refresh halaman.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const tabs = [
    {
      id: "projects",
      label: "Projects",
      icon: Code2,
      count: projectsData.length,
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: Award,
      count: certificatesData.length,
    },
  ]

  const data = activeTab === "projects" ? projectsData : certificatesData

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-mocha overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow amber */}
      <div className="absolute top-20 -right-32 w-80 h-80 bg-amber/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-80 h-80 bg-amber/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber" />
            <span className="text-amber text-sm tracking-widest uppercase font-medium">
              Showcase
            </span>
            <span className="h-px w-8 bg-amber" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-ivory mb-4">
            Karya & Pencapaian
          </h2>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Project yang pernah saya bangun dan sertifikat yang sudah saya
            raih — bukti perjalanan belajar saya.
          </p>
        </motion.div>

        {/* Tab switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-full
                       bg-mocha-soft border border-ivory/10
                       shadow-lg"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative inline-flex items-center gap-2 px-5 py-2.5
                             rounded-full text-sm font-medium
                             transition-colors duration-200
                             ${
                               isActive
                                 ? "text-ivory"
                                 : "text-ivory/60 hover:text-ivory"
                             }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-amber"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon size={15} />
                    {tab.label}
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold
                                 ${
                                   isActive
                                     ? "bg-ivory/20 text-ivory"
                                     : "bg-ivory/10 text-ivory/60"
                                 }`}
                    >
                      {loading ? "…" : tab.count}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingGrid key="loading" />
          ) : error ? (
            <ErrorMessage key="error" message={error} />
          ) : data.length === 0 ? (
            <EmptyState key="empty" activeTab={activeTab} />
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {data.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Link
                    to={
                      activeTab === "projects"
                        ? `/project/${item.slug}`
                        : `/certificate/${item.slug}`
                    }
                    className="group block relative rounded-2xl bg-mocha-soft
                               border border-ivory/10 overflow-hidden
                               hover:border-amber/50 hover:-translate-y-1
                               hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-mocha">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover
                                   group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-mocha/90 via-mocha/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                      {/* Badge kategori / issuer */}
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                                   bg-mocha/80 backdrop-blur-md border border-ivory/20
                                   text-ivory text-[9px] font-medium tracking-wide uppercase"
                      >
                        {activeTab === "projects"
                          ? item.category
                          : item.issuer}
                      </div>

                      {/* Arrow pojok kanan */}
                      <div
                        className="absolute top-3 right-3 w-7 h-7 rounded-full
                                   bg-amber text-ivory
                                   flex items-center justify-center
                                   opacity-0 group-hover:opacity-100
                                   -translate-y-1 group-hover:translate-y-0
                                   transition-all duration-300"
                      >
                        <ArrowUpRight size={13} />
                      </div>

                      {/* Year untuk certificate */}
                      {activeTab === "certificates" && item.year && (
                        <div
                          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md
                                     bg-amber/90 text-ivory text-[10px] font-bold"
                        >
                          {item.year}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3
                        className="text-base font-bold text-ivory mb-1.5
                                   group-hover:text-amber transition-colors line-clamp-1"
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-ivory/60 leading-relaxed mb-3 line-clamp-2 min-h-[2rem]">
                        {item.description}
                      </p>

                      {/* Tags / badge */}
                      {activeTab === "projects" ? (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {(item.tags || []).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md
                                         bg-amber/15 border border-amber/25
                                         text-amber text-[9px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="mb-3">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md
                                       bg-amber/15 border border-amber/25
                                       text-amber text-[9px] font-medium"
                          >
                            <Award size={10} />
                            Verified Certificate
                          </span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-ivory/10">
                        <span className="text-[10px] text-ivory/40 uppercase tracking-wider">
                          Klik untuk detail
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="text-ivory/40 group-hover:text-amber
                                     group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                                     transition-all duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       border border-ivory/20 text-ivory font-medium
                       hover:border-amber hover:text-amber
                       transition-colors"
          >
            {activeTab === "projects"
              ? "Lihat Semua Project"
              : "Lihat Semua Sertifikat"}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ============ SUB COMPONENTS ============ */

function LoadingGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-mocha-soft border border-ivory/10 overflow-hidden"
        >
          <div className="aspect-[16/10] bg-mocha animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-ivory/10 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-ivory/5 rounded animate-pulse w-full" />
            <div className="h-3 bg-ivory/5 rounded animate-pulse w-2/3" />
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-14 bg-ivory/10 rounded animate-pulse" />
              <div className="h-5 w-16 bg-ivory/10 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-center py-20"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full
                      bg-red-500/10 border border-red-500/30 mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="text-lg font-semibold text-ivory mb-2">
        Ups, ada masalah
      </h3>
      <p className="text-sm text-ivory/60 mb-6">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2 rounded-full bg-amber text-ivory text-sm font-medium
                   hover:bg-amber-dark transition-colors"
      >
        Refresh Halaman
      </button>
    </motion.div>
  )
}

function EmptyState({ activeTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-center py-20"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full
                      bg-amber/10 border border-amber/30 mb-4">
        <span className="text-2xl">📭</span>
      </div>
      <h3 className="text-lg font-semibold text-ivory mb-2">
        Belum ada {activeTab === "projects" ? "project" : "sertifikat"}
      </h3>
      <p className="text-sm text-ivory/60">
        Data akan muncul di sini setelah ditambahkan di database.
      </p>
    </motion.div>
  )
}

export default Projects