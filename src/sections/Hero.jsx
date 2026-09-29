import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import fotoProfil from "../assets/foto-profil.jpg";

const socials = [
  { icon: FaGithub, href: "https://github.com/121Jaa", label: "Github" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/muhammad-ajax-68470343b/",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/ajaxxvr/",
    label: "Instagram",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
    >
      {/* ============ BACKGROUND LAYERS ============ */}
      <div className="absolute inset-0 -z-10">
        {/* Base color */}
        <div className="absolute inset-0 bg-ivory" />

        {/* Vignette amber — fokus ke tengah */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 45%, rgba(184, 118, 63, 0.10) 100%)",
          }}
        />

        {/* Noise texture — kesan kertas */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Dot pattern halus */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #2E2A26 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Blob bergerak — di atas background, di bawah konten */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-40 w-[28rem] h-[28rem] bg-amber-soft/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-40 w-[28rem] h-[28rem] bg-sand/60 rounded-full blur-3xl pointer-events-none"
      />

      {/* ============ KONTEN ============ */}
      <div className="relative max-w-6xl w-full grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Kolom Kiri (7/12) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-7"
        >
          {/* Badge status */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-amber-soft/60 border border-warm-border
                       text-amber text-xs font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
            </span>
            Available for work
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-mocha leading-[1.1] mb-5 tracking-tight"
          >
            Ajax
            <br />
            <span className="text-amber">Developer</span>
          </motion.h1>

          {/* Role dengan garis aksen */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-amber" />
            <span className="text-taupe text-sm tracking-widest uppercase">
              Full-Stack Web Developer
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-taupe mb-10 max-w-lg leading-relaxed text-base md:text-lg"
          >
            Saya berfokus pada penciptaan pengalaman digital yang menarik dan
            selalu berupaya memberikan solusi terbaik dalam setiap proyek yang
            saya kerjakan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full
                         bg-amber text-white font-medium
                         hover:bg-amber-dark transition-all shadow-sm hover:shadow-md"
            >
              Lihat Project
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         border border-warm-border text-mocha font-medium
                         hover:border-amber hover:text-amber transition-colors"
            >
              Hubungi Saya
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full border border-warm-border text-taupe
                           hover:text-amber hover:border-amber hover:-translate-y-0.5
                           transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Kolom Kanan (5/12) — Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="md:col-span-5 relative flex justify-center"
        >
          {/* Glow di belakang foto */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full bg-amber-soft blur-3xl opacity-60" />
          </div>

          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Foto: rounded squircle */}
            <div
              className="relative w-72 h-80 md:w-80 md:h-[24rem] overflow-hidden
                         rounded-[2.5rem] border-4 border-ivory shadow-xl
                         bg-sand"
            >
              <img
                src={fotoProfil}
                alt="Foto profil Ajax Developer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Badge "Open to work" di sudut foto */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full
                         bg-mocha text-ivory text-xs font-medium shadow-lg"
            >
              ✦ Open to work
            </motion.div>

            {/* Mini info card di bawah foto */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2
                         flex items-center gap-2 px-4 py-2 rounded-full
                         bg-ivory border border-warm-border shadow-md
                         hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-taupe font-medium">
                Based in Indonesia
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
