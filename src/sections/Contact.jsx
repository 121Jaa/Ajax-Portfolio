import { motion } from "framer-motion"
import {
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa"
import { Mail, MapPin, ArrowUpRight, MessageCircle, Zap } from "lucide-react"

const WA_NUMBER = "6285142942757" // ganti dengan nomor WA kamu (format: 62...)
const WA_MESSAGE = encodeURIComponent(
  "Halo Ajax! Saya tertarik untuk diskusi project. Boleh ngobrol?"
)
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ajax.dev",
    href: "mailto:hello@ajax.dev",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Indonesia · WIB (GMT+7)",
    href: null,
  },
]

const socialLinks = [
  { icon: FaGithub, href: "#", label: "Github" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
]

function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-ivory overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3A2E2A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow amber */}
      <div className="absolute top-20 -right-32 w-80 h-80 bg-amber-soft/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-80 h-80 bg-sand/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber" />
            <span className="text-amber text-sm tracking-widest uppercase font-medium">
              Contact
            </span>
            <span className="h-px w-8 bg-amber" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-mocha mb-4">
            Mari Bekerja Sama
          </h2>
          <p className="text-taupe max-w-2xl mx-auto">
            Punya project, ide, atau cuma mau ngobrol? Langsung chat — saya
            selalu terbuka untuk kolaborasi.
          </p>
        </motion.div>

        {/* Grid 2 kolom */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Kolom Kiri (3/5) — Kartu WA Besar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div className="relative h-full">
              {/* Glow hijau WA di belakang */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full bg-[#25D366]/20 blur-3xl" />
              </div>

              <div
                className="relative h-full p-8 md:p-10 rounded-3xl
                           bg-gradient-to-br from-sand to-amber-soft/40
                           border border-warm-border overflow-hidden"
              >
                {/* Dot pattern dalam kartu */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #3A2E2A 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative">
                  {/* Icon besar WA */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-16 h-16 rounded-2xl
                               bg-[#25D366] text-white
                               flex items-center justify-center
                               shadow-lg shadow-[#25D366]/30 mb-6"
                  >
                    <FaWhatsapp size={32} />
                  </motion.div>

                  {/* Judul */}
                  <h3 className="text-2xl md:text-3xl font-bold text-mocha mb-3 leading-snug">
                    Chat langsung via{" "}
                    <span className="text-[#128C7E]">WhatsApp</span>
                  </h3>
                  <p className="text-taupe mb-8 leading-relaxed max-w-md">
                    Cara paling cepat untuk menghubungi saya. Klik tombol di
                    bawah, dan kamu akan langsung terhubung ke WA saya dengan
                    pesan yang sudah saya siapkan.
                  </p>

                  {/* Tombol WA besar */}
                  <motion.a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-3
                               px-7 py-4 rounded-2xl
                               bg-[#25D366] text-white font-semibold
                               hover:bg-[#1FB855]
                               shadow-lg shadow-[#25D366]/30 hover:shadow-xl
                               transition-all duration-300"
                  >
                    <MessageCircle size={20} />
                    Mulai Chat Sekarang
                    <ArrowUpRight
                      size={18}
                      className="transition-transform
                                 group-hover:translate-x-0.5
                                 group-hover:-translate-y-0.5"
                    />
                  </motion.a>

                  {/* Info kecil */}
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <div className="inline-flex items-center gap-2
                                    px-3 py-1.5 rounded-full
                                    bg-ivory/70 border border-warm-border">
                      <Zap size={12} className="text-amber" />
                      <span className="text-[11px] text-mocha font-medium">
                        Biasanya balas &lt; 1 jam
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2
                                    px-3 py-1.5 rounded-full
                                    bg-ivory/70 border border-warm-border">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      <span className="text-[11px] text-mocha font-medium">
                        Online sekarang
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan (2/5) — Info Kontak */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Email & Lokasi */}
            {contactInfo.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <div
                    className="w-10 h-10 rounded-xl bg-amber-soft
                               flex items-center justify-center flex-shrink-0
                               group-hover:bg-amber transition-colors duration-300"
                  >
                    <Icon
                      size={18}
                      className="text-amber group-hover:text-ivory transition-colors duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-taupe uppercase tracking-wider mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-mocha truncate">
                      {item.value}
                    </div>
                  </div>
                </>
              )

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl
                             bg-sand border border-warm-border
                             hover:border-amber hover:-translate-y-0.5
                             transition-all duration-300"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 p-4 rounded-2xl
                             bg-sand border border-warm-border"
                >
                  {content}
                </div>
              )
            })}

            {/* Social media */}
            <div className="p-5 rounded-2xl bg-sand border border-warm-border">
              <div className="text-[10px] text-taupe uppercase tracking-wider mb-3">
                Ikuti Saya
              </div>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl bg-ivory border border-warm-border
                                 flex items-center justify-center
                                 text-taupe hover:text-amber hover:border-amber
                                 hover:-translate-y-0.5
                                 transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Kartu "Available" */}
            <div
              className="p-5 rounded-2xl bg-amber-soft/60 border border-warm-border
                         flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber" />
              </span>
              <div>
                <div className="text-xs font-semibold text-mocha">
                  Tersedia untuk project
                </div>
                <div className="text-[10px] text-taupe">
                  Freelance · Kolaborasi · Diskusi
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact