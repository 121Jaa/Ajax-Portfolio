import { useEffect, useState } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiSupabase,
  SiFramer,
  SiVite,
  SiTypescript,
} from "react-icons/si"
import {
  ArrowLeft,
  ArrowUp,
  ExternalLink,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  Share2,
  Sparkles,
  BadgeCheck,
} from "lucide-react"
import Swal from "sweetalert2"
import {
  getCertificateBySlug,
  getAllCertificates,
} from "../services/certificates"

/* ============ SKILL ICON MAPPER ============ */
const skillIconMap = {
  html: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#1572B6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  react: { icon: SiReact, color: "#61DAFB" },
  hooks: { icon: SiReact, color: "#61DAFB" },
  "component design": { icon: SiReact, color: "#61DAFB" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  "responsive design": { icon: SiCss, color: "#1572B6" },
  responsive: { icon: SiCss, color: "#1572B6" },
  flexbox: { icon: SiCss, color: "#1572B6" },
  grid: { icon: SiCss, color: "#1572B6" },
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGit, color: "#F05032" },
  collaboration: { icon: SiGit, color: "#F05032" },
  supabase: { icon: SiSupabase, color: "#3ECF8E" },
  "framer motion": { icon: SiFramer, color: "#0055FF" },
  vite: { icon: SiVite, color: "#646CFF" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  algorithms: { icon: SiJavascript, color: "#F7DF1E" },
  "data structures": { icon: SiJavascript, color: "#F7DF1E" },
  "ui design": { icon: SiTailwindcss, color: "#06B6D4" },
}

function getSkillIcon(name) {
  const key = name.toLowerCase().trim()
  return skillIconMap[key] || null
}

function CertificateDetail() {
  const { slug } = useParams()
  const [cert, setCert] = useState(null)
  const [relatedCerts, setRelatedCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Fetch certificate by slug
  useEffect(() => {
    async function fetchCertificate() {
      try {
        setLoading(true)
        setNotFound(false)
        const data = await getCertificateBySlug(slug)
        if (!data) {
          setNotFound(true)
          return
        }
        setCert(data)

        // Related certificates
        const all = await getAllCertificates()
        const related = (all || [])
          .filter((c) => c.slug !== slug)
          .slice(0, 3)
        setRelatedCerts(related)
      } catch (err) {
        console.error(err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCertificate()
    window.scrollTo({ top: 0 })
  }, [slug])

  // Scroll progress + back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
      setShowBackToTop(scrollTop > 400)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Copy link
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      Swal.fire({
        icon: "success",
        title: "Link dicopy!",
        text: "Link sertifikat sudah dicopy ke clipboard.",
        confirmButtonColor: "#D89B5A",
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal copy",
        text: "Coba copy manual dari address bar.",
        confirmButtonColor: "#D89B5A",
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) return <DetailSkeleton />
  if (notFound || !cert) return <Navigate to="/" replace />

  return (
    <main className="relative min-h-screen bg-mocha overflow-hidden">
      {/* ============ SCROLL PROGRESS BAR ============ */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-ivory/5">
        <motion.div
          className="h-full bg-gradient-to-r from-amber to-amber-dark"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ============ BACKGROUND LAYERS ============ */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-32 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* ============ TOP BAR ============ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-ivory/70
                       hover:text-amber transition-colors"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Kembali
          </Link>

          <button
            onClick={handleShare}
            className="group inline-flex items-center gap-2 text-sm text-ivory/70
                       hover:text-amber transition-colors"
          >
            <Share2 size={15} />
            <span className="hidden sm:inline">Copy Link</span>
          </button>
        </motion.div>

        {/* ============ BADGE ISSUER + YEAR ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-amber/15 border border-amber/30
                       text-amber text-xs font-medium"
          >
            <Award size={12} />
            {cert.issuer}
          </div>
          {cert.year && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-ivory/5 border border-ivory/10
                         text-ivory/70 text-xs font-medium"
            >
              <Calendar size={12} />
              {cert.year}
            </div>
          )}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-ivory/5 border border-ivory/10
                       text-ivory/70 text-xs font-medium"
          >
            <BadgeCheck size={12} className="text-green-500" />
            Verified
          </div>
        </motion.div>

        {/* ============ TITLE ============ */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-ivory leading-tight mb-6"
        >
          {cert.title}
        </motion.h1>

        {/* Short description */}
        {cert.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-ivory/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            {cert.description}
          </motion.p>
        )}

        {/* ============ META GRID ============ */}
        {(cert.issuer || cert.year || cert.duration) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10"
          >
            {cert.issuer && (
              <MetaCard
                icon={Award}
                label="Penerbit"
                value={cert.issuer}
              />
            )}
            {cert.year && (
              <MetaCard icon={Calendar} label="Tahun" value={cert.year} />
            )}
            {cert.duration && (
              <MetaCard icon={Clock} label="Durasi" value={cert.duration} />
            )}
          </motion.div>
        )}

        {/* ============ CTA (Lihat Kredensial) ============ */}
        {cert.credential && cert.credential !== "#" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href={cert.credential}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full
                         bg-amber text-ivory font-medium text-sm
                         hover:bg-amber-dark transition-all shadow-lg shadow-amber/20"
            >
              <ExternalLink
                size={15}
                className="transition-transform group-hover:-translate-y-0.5
                           group-hover:translate-x-0.5"
              />
              Lihat Kredensial
            </a>
          </motion.div>
        )}

        {/* ============ HERO IMAGE ============ */}
        {cert.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden mb-12 border border-ivory/10
                       group"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full aspect-[16/9] object-cover
                         group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mocha/40 to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* ============ LONG DESCRIPTION ============ */}
        {cert.long_description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <SectionTitle>Tentang Sertifikat</SectionTitle>
            <p className="text-ivory/70 leading-relaxed whitespace-pre-line">
              {cert.long_description}
            </p>
          </motion.div>
        )}

        {/* ============ SKILLS ============ */}
        {cert.skills && cert.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <SectionTitle icon={Sparkles}>Skill yang Dipelajari</SectionTitle>
            <div className="flex flex-wrap gap-2.5">
              {cert.skills.map((skill) => {
                const skillData = getSkillIcon(skill)
                const Icon = skillData?.icon
                return (
                  <motion.div
                    key={skill}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                               bg-mocha-soft border border-ivory/10
                               hover:border-amber/50 transition-all cursor-default"
                  >
                    {Icon ? (
                      <Icon size={16} style={{ color: skillData.color }} />
                    ) : (
                      <CheckCircle2 size={16} className="text-amber" />
                    )}
                    <span className="text-xs font-medium text-ivory">
                      {skill}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ============ CTA BAWAH ============ */}
        {cert.credential && cert.credential !== "#" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-mocha-soft to-mocha
                       border border-ivory/10 mb-12"
          >
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center
                         justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-ivory mb-1">
                  Verifikasi Sertifikat
                </h3>
                <p className="text-sm text-ivory/60">
                  Cek keaslian sertifikat ini di situs penerbit.
                </p>
              </div>
              <a
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-amber text-ivory font-medium text-sm
                           hover:bg-amber-dark transition-colors"
              >
                <ExternalLink size={14} />
                Buka Kredensial
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* ============ BACK TO TOP ============ */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
                     bg-amber text-ivory shadow-lg shadow-amber/30
                     flex items-center justify-center
                     hover:bg-amber-dark hover:-translate-y-1
                     transition-all"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </main>
  )
}

/* ============ SUB COMPONENTS ============ */

function SectionTitle({ children, icon: Icon }) {
  return (
    <h2 className="text-xl font-bold text-ivory mb-4 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-amber" />
      {Icon && <Icon size={16} className="text-amber" />}
      {children}
    </h2>
  )
}

function MetaCard({ icon: Icon, label, value }) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl
                 bg-mocha-soft border border-ivory/10
                 hover:border-amber/40 transition-colors"
    >
      <div
        className="w-9 h-9 rounded-xl bg-amber/15
                   flex items-center justify-center flex-shrink-0"
      >
        <Icon size={16} className="text-amber" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-ivory/50 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-sm text-ivory font-medium truncate">{value}</div>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <main className="relative min-h-screen bg-mocha pt-28 pb-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="h-4 w-32 bg-ivory/10 rounded mb-8 animate-pulse" />
        <div className="h-6 w-24 bg-ivory/10 rounded-full mb-6 animate-pulse" />
        <div className="h-12 w-3/4 bg-ivory/10 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          <div className="h-16 bg-ivory/5 rounded-2xl animate-pulse" />
          <div className="h-16 bg-ivory/5 rounded-2xl animate-pulse" />
          <div className="h-16 bg-ivory/5 rounded-2xl animate-pulse" />
        </div>
        <div className="aspect-[16/9] bg-mocha-soft border border-ivory/10
                        rounded-3xl mb-10 animate-pulse" />
        <div className="space-y-3">
          <div className="h-6 w-40 bg-ivory/10 rounded animate-pulse" />
          <div className="h-4 bg-ivory/5 rounded animate-pulse" />
          <div className="h-4 bg-ivory/5 rounded animate-pulse w-5/6" />
        </div>
      </div>
    </main>
  )
}

export default CertificateDetail