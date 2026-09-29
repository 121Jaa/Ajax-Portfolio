import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiSupabase,
  SiExpress,
  SiPostgresql,
  SiVite,
  SiFramer,
  SiTypescript,
  SiVuedotjs,
  SiNextdotjs,
  SiMongodb,
  SiFirebase,
  SiVercel,
} from "react-icons/si";
import {
  ArrowLeft,
  ArrowUp,
  ExternalLink,
  Calendar,
  User,
  Clock,
  Tag,
  CheckCircle2,
  Share2,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";
import { getProjectBySlug, getAllProjects } from "../services/projects";

/* ============ TECH ICON MAPPER ============ */
const techIconMap = {
  react: { icon: FaReact, color: "#61DAFB" },
  node: { icon: FaNodeJs, color: "#339933" },
  "node.js": { icon: FaNodeJs, color: "#339933" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  html: { icon: SiHtml5, color: "#E34F26" },
  "html & css": { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiHtml5, color: "#E34F26" },
  supabase: { icon: SiSupabase, color: "#3ECF8E" },
  express: { icon: SiExpress, color: "#FFFFFF" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  vite: { icon: SiVite, color: "#646CFF" },
  "framer motion": { icon: SiFramer, color: "#0055FF" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  next: { icon: SiNextdotjs, color: "#FFFFFF" },
  "next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  vercel: { icon: SiVercel, color: "#FFFFFF" },
};

function getTechIcon(techName) {
  const key = techName.toLowerCase().trim();
  return techIconMap[key] || null;
}

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Fetch project by slug
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await getProjectBySlug(slug);
        if (!data) {
          setNotFound(true);
          return;
        }
        setProject(data);

        // Fetch related (semua project, exclude yang sedang dibuka, ambil 3)
        const all = await getAllProjects();
        const related = (all || []).filter((p) => p.slug !== slug).slice(0, 3);
        setRelatedProjects(related);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Scroll progress + back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 400);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Copy link ke clipboard
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: "success",
        title: "Link dicopy!",
        text: "Link project sudah dicopy ke clipboard.",
        confirmButtonColor: "#D89B5A",
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal copy",
        text: "Coba copy manual dari address bar.",
        confirmButtonColor: "#D89B5A",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <DetailSkeleton />;
  if (notFound || !project) return <Navigate to="/" replace />;

  const highlights = project.highlights || project.features || [];

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
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow amber */}
        <div className="absolute top-40 -right-32 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-32 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* ============ TOP BAR: Back + Share ============ */}
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

        {/* ============ CATEGORY + YEAR ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {project.category && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-amber/15 border border-amber/30
                         text-amber text-xs font-medium"
            >
              <Tag size={12} />
              {project.category}
            </div>
          )}
          {project.year && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-ivory/5 border border-ivory/10
                         text-ivory/70 text-xs font-medium"
            >
              <Calendar size={12} />
              {project.year}
            </div>
          )}
        </motion.div>

        {/* ============ TITLE ============ */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-ivory leading-tight mb-6"
        >
          {project.title}
        </motion.h1>

        {/* Short description */}
        {project.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-ivory/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            {project.description}
          </motion.p>
        )}

        {/* ============ META GRID ============ */}
        {(project.role || project.duration || project.year) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10"
          >
            {project.year && (
              <MetaCard icon={Calendar} label="Tahun" value={project.year} />
            )}
            {project.role && (
              <MetaCard icon={User} label="Peran" value={project.role} />
            )}
            {project.duration && (
              <MetaCard icon={Clock} label="Durasi" value={project.duration} />
            )}
          </motion.div>
        )}

        {/* ============ CTA BUTTONS (di atas, biar gampang diakses) ============ */}
        {(project.demo || project.repo) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
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
                Live Demo
              </a>
            )}
            {project.repo && project.repo !== "#" && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full
                           border border-ivory/20 text-ivory font-medium text-sm
                           hover:border-amber hover:text-amber hover:bg-amber/5
                           transition-all"
              >
                <FaGithub
                  size={15}
                  className="transition-transform group-hover:rotate-12"
                />
                Source Code
              </a>
            )}
          </motion.div>
        )}

        {/* ============ HERO IMAGE ============ */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden mb-12 border border-ivory/10
                       group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[16/9] object-cover
                         group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Overlay gradient tipis */}
            <div className="absolute inset-0 bg-gradient-to-t from-mocha/40 to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* ============ LIVE PREVIEW ============ */}
        {project.demo && project.demo !== "#" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Live Preview</SectionTitle>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs
                   text-amber hover:text-amber-dark transition-colors"
              >
                Buka di tab baru
                <ExternalLink
                  size={12}
                  className="transition-transform group-hover:-translate-y-0.5
                     group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* Desktop: iframe mockup | Mobile: placeholder */}
            <div
              className="relative rounded-2xl overflow-hidden
                    border border-ivory/10 bg-mocha-soft shadow-2xl"
            >
              {/* Browser bar mockup */}
              <div
                className="flex items-center gap-2 px-4 py-3
                      bg-mocha border-b border-ivory/10"
              >
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                {/* URL bar */}
                <div
                  className="flex-1 mx-3 px-3 py-1 rounded-md
                        bg-ivory/5 border border-ivory/10
                        flex items-center gap-2 min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500/70 flex-shrink-0" />
                  <span className="text-[11px] text-ivory/50 truncate font-mono">
                    {project.demo
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                  </span>
                </div>
              </div>

              {/* Iframe container — aspect 16:9 */}
              <div className="relative aspect-[16/9] bg-mocha">
                <iframe
                  src={project.demo}
                  title={`Live preview: ${project.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </div>

            {/* Info kecil di bawah preview */}
            <p className="text-[11px] text-ivory/40 mt-3 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-amber" />
              Preview mungkin terbatas jika project memblokir embed. Klik "Buka
              di tab baru" untuk pengalaman penuh.
            </p>
          </motion.div>
        )}

        {/* ============ HIGHLIGHTS ============ */}
        {highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <SectionTitle icon={Sparkles}>Highlights</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl
                             bg-mocha-soft border border-ivory/10
                             hover:border-amber/40 transition-colors"
                >
                  <CheckCircle2
                    size={18}
                    className="text-amber flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-ivory/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============ LONG DESCRIPTION ============ */}
        {project.long_description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <SectionTitle>Tentang Project</SectionTitle>
            <p className="text-ivory/70 leading-relaxed whitespace-pre-line">
              {project.long_description}
            </p>
          </motion.div>
        )}

        {/* ============ TECH STACK ============ */}
        {project.tags && project.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mb-12"
          >
            <SectionTitle>Tech Stack</SectionTitle>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => {
                const tech = getTechIcon(tag);
                const Icon = tech?.icon;
                return (
                  <motion.div
                    key={tag}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                               bg-mocha-soft border border-ivory/10
                               hover:border-amber/50 transition-all cursor-default"
                  >
                    {Icon ? (
                      <Icon size={16} style={{ color: tech.color }} />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-amber/30" />
                    )}
                    <span className="text-xs font-medium text-ivory">
                      {tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ============ GALLERY ============ */}
        {project.gallery && project.gallery.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <SectionTitle>Galeri</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="relative group rounded-2xl overflow-hidden
                             border border-ivory/10 hover:border-amber/50
                             transition-colors cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full aspect-video object-cover
                               group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Number badge */}
                  <div
                    className="absolute top-3 left-3 w-7 h-7 rounded-full
                               bg-mocha/80 backdrop-blur-md border border-ivory/20
                               flex items-center justify-center
                               text-[11px] font-bold text-ivory"
                  >
                    {i + 1}
                  </div>
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-amber/0 group-hover:bg-amber/10
                               transition-colors pointer-events-none"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ============ BACK TO TOP BUTTON ============ */}
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
  );
}

/* ============ SUB COMPONENTS ============ */

function SectionTitle({ children, icon: Icon }) {
  return (
    <h2 className="text-xl font-bold text-ivory mb-4 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-amber" />
      {Icon && <Icon size={16} className="text-amber" />}
      {children}
    </h2>
  );
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
  );
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
        <div
          className="aspect-[16/9] bg-mocha-soft border border-ivory/10
                        rounded-3xl mb-10 animate-pulse"
        />
        <div className="space-y-3">
          <div className="h-6 w-40 bg-ivory/10 rounded animate-pulse" />
          <div className="h-4 bg-ivory/5 rounded animate-pulse" />
          <div className="h-4 bg-ivory/5 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-ivory/5 rounded animate-pulse w-4/6" />
        </div>
      </div>
    </main>
  );
}

export default ProjectDetail;
