import { motion } from "framer-motion"
import {
  Code2,
  Lightbulb,
  Rocket,
  Coffee,
  MapPin,
  Clock,
  Target,
  Headphones,
  BookOpen,
  Compass,
  Sparkles,
} from "lucide-react"
import fotoProfil from "../assets/foto-profil.jpg"

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Kode yang rapi, mudah dibaca, dan scalable.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    desc: "Suka tantangan, suka cari solusi kreatif.",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    desc: "Cepat beradaptasi dengan teknologi baru.",
  },
  {
    icon: Coffee,
    title: "Detail Oriented",
    desc: "Perhatian pada detail kecil yang bikin beda.",
  },
]

const nowItems = [
  {
    icon: Headphones,
    label: "Belajar",
    value: "JavaScript & Framer Motion",
  },
  {
    icon: BookOpen,
    label: "Baca",
    value: "Clean Code — Robert C. Martin",
  },
  {
    icon: Compass,
    label: "Eksplor",
    value: "Supabase Auth & Storage",
  },
]

function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-mocha overflow-hidden">
      {/* Dot pattern halus di background gelap */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #F7F3EE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow amber di sudut */}
      <div className="absolute top-10 -right-32 w-80 h-80 bg-amber/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 bg-amber/8 rounded-full blur-3xl pointer-events-none" />

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
              About Me
            </span>
            <span className="h-px w-8 bg-amber" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-ivory mb-4">
            Ayo Kenalan
          </h2>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Sedikit cerita tentang siapa saya, apa yang saya kerjakan, dan apa
            yang membuat saya bersemangat.
          </p>
        </motion.div>

        {/* Grid 2 kolom: cerita + personal snapshot */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Kolom Kiri — Cerita */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-amber/15 border border-amber/30
                         text-amber text-xs font-medium mb-6"
            >
              <Sparkles size={14} />
              Currently building cool things
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-ivory mb-6 leading-snug">
              Full-Stack Developer yang suka bikin{" "}
              <span className="text-amber">hal-hal berguna</span>.
            </h3>

            <div className="space-y-4 text-ivory/70 leading-relaxed">
              <p>
                Halo! Saya Ajax, seorang developer yang berbasis di Indonesia.
                Perjalanan saya di dunia web development dimulai dari rasa
                penasaran: bagaimana sebuah website bisa bekerja?
              </p>
              <p>
                Sejak saat itu, saya terus belajar dan mengerjakan berbagai
                proyek — mulai dari landing page sederhana sampai aplikasi
                full-stack. Saya percaya bahwa kode yang baik bukan cuma soal
                "jalan", tapi juga soal{" "}
                <strong className="text-ivory font-semibold">
                  rapi, mudah dibaca, dan enak dipakai
                </strong>
                .
              </p>
              <p>
                Di luar coding, saya suka mengeksplorasi desain, membaca artikel
                teknologi, dan sesekali ngopi sambil mikirin ide proyek
                berikutnya.
              </p>
            </div>
          </motion.div>

          {/* Kolom Kanan — Personal Snapshot Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-amber/15 blur-3xl" />
            </div>

            <div
              className="relative rounded-3xl bg-mocha-soft border border-ivory/10
                         shadow-lg overflow-hidden
                         hover:shadow-xl hover:border-amber/40
                         transition-all duration-300"
            >
              <div className="p-6 pb-5 flex items-center gap-4 border-b border-ivory/10">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-ivory/20
                             shadow-md bg-mocha flex-shrink-0"
                >
                  <img
                    src={fotoProfil}
                    alt="Foto Ajax"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-ivory truncate">
                      Ajax Developer
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  </div>
                  <p className="text-xs text-ivory/60">
                    Full-Stack Web Developer
                  </p>
                  <p className="text-[10px] text-amber font-medium mt-0.5">
                    ● Available for work
                  </p>
                </div>
              </div>

              <div className="p-6 py-5 space-y-3 border-b border-ivory/10">
                {[
                  { icon: MapPin, label: "Lokasi", value: "Indonesia · WIB (GMT+7)" },
                  { icon: Clock, label: "Status", value: "Open to collaboration" },
                  { icon: Target, label: "Fokus Sekarang", value: "Building my portfolio" },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg bg-amber/15
                                   flex items-center justify-center flex-shrink-0"
                      >
                        <Icon size={14} className="text-amber" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-ivory/50 uppercase tracking-wider">
                          {item.label}
                        </div>
                        <div className="text-xs font-medium text-ivory">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                  <span className="text-[10px] font-semibold text-amber uppercase tracking-widest">
                    Now
                  </span>
                </div>

                <div className="space-y-3">
                  {nowItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3 group/now
                                   hover:-translate-x-0.5 transition-transform"
                      >
                        <Icon
                          size={14}
                          className="text-ivory/50 group-hover/now:text-amber
                                     transition-colors flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-ivory/50 uppercase tracking-wider">
                            {item.label}
                          </div>
                          <div className="text-xs font-medium text-ivory truncate">
                            {item.value}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div
                className="px-6 py-4 bg-mocha border-t border-ivory/10
                           flex items-center justify-between text-[10px] text-ivory/60"
              >
                <span className="flex items-center gap-1.5">☕ 3 gelas/hari</span>
                <span className="w-px h-3 bg-ivory/20" />
                <span className="flex items-center gap-1.5">🎮 Gaming</span>
                <span className="w-px h-3 bg-ivory/20" />
                <span className="flex items-center gap-1.5">🎵 Lo-fi</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid 4 kolom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-ivory flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber" />
              Yang Saya Junjung
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-5 rounded-2xl bg-mocha-soft border border-ivory/10
                             hover:border-amber/60 hover:-translate-y-1
                             hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-amber/15
                               flex items-center justify-center mb-3
                               group-hover:bg-amber group-hover:scale-110
                               transition-all duration-300"
                  >
                    <Icon
                      size={20}
                      className="text-amber group-hover:text-mocha transition-colors duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-ivory mb-1 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ivory/60 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About