import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Heart, ArrowUp, Mail, MapPin, Clock } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
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
  {
    icon: FaWhatsapp,
    href: "https://wa.me/6285142942757?text=Halo Ajax! Saya tertarik untuk diskusi project. Boleh ngobrol?",
    label: "WhatsApp",
  },
];

function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const wib = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
      );
      const h = String(wib.getHours()).padStart(2, "0");
      const m = String(wib.getMinutes()).padStart(2, "0");
      const s = String(wib.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-mocha-dark overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow amber di sudut */}
      <div className="absolute -top-32 left-1/4 w-80 h-80 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-amber/8 rounded-full blur-3xl pointer-events-none" />

      {/* ============ MAIN FOOTER ============ */}
      <div className="relative px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
          {/* Kolom 1: Brand + About (4/12) */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-block text-xl font-bold tracking-tight text-ivory"
            >
              ajax<span className="text-amber">.dev</span>
            </Link>
            <p className="text-sm text-ivory/60 leading-relaxed max-w-xs">
              Full-Stack Developer yang fokus membangun pengalaman web yang
              rapi, cepat, dan enak dipakai.
            </p>

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-ivory/5 border border-ivory/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] text-ivory/70">Online now</span>
            </div>
          </div>

          {/* Kolom 2: Quick Links (3/12) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-amber uppercase tracking-widest mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2
                               text-sm text-ivory/60 hover:text-amber
                               transition-colors"
                  >
                    <span
                      className="w-0 h-px bg-amber transition-all duration-300
                                 group-hover:w-3"
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Contact Info (3/12) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-amber uppercase tracking-widest mb-4">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-ivory/60">
                <Mail size={14} className="text-amber flex-shrink-0" />
                <a
                  href="mailto:hello@ajax.dev"
                  className="hover:text-amber transition-colors"
                >
                  hello@ajax.dev
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ivory/60">
                <MapPin size={14} className="text-amber flex-shrink-0" />
                Indonesia · WIB
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ivory/60">
                <Clock size={14} className="text-amber flex-shrink-0" />
                <span className="font-mono text-xs">
                  {time} <span className="text-ivory/40">WIB</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Social (2/12) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-amber uppercase tracking-widest mb-4">
              Sosial
            </h4>
            <div className="flex md:flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group inline-flex items-center gap-2
                               text-sm text-ivory/60 hover:text-amber
                               transition-colors"
                  >
                    <span
                      className="w-8 h-8 rounded-lg bg-ivory/5 border border-ivory/10
                                 flex items-center justify-center
                                 group-hover:bg-amber group-hover:border-amber
                                 group-hover:text-ivory
                                 transition-all duration-200"
                    >
                      <Icon size={14} />
                    </span>
                    <span className="hidden md:inline">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div
          className="max-w-6xl mx-auto mt-12 pt-6 border-t border-ivory/10
                        flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-[11px] text-ivory/50 text-center sm:text-left">
            © {new Date().getFullYear()} Ajax Developer. All rights reserved.
          </p>

          <p className="text-[11px] text-ivory/50 flex items-center gap-1.5">
            Dibuat dengan
            <Heart size={11} className="text-amber fill-amber animate-pulse" />
            di Indonesia
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2
                       text-[11px] text-ivory/50 hover:text-amber
                       transition-colors"
          >
            <span>Kembali ke atas</span>
            <span
              className="w-7 h-7 rounded-lg bg-ivory/5 border border-ivory/10
                         flex items-center justify-center
                         group-hover:bg-amber group-hover:border-amber
                         group-hover:text-ivory
                         group-hover:-translate-y-0.5
                         transition-all duration-200"
            >
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
