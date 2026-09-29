import { motion } from "framer-motion"
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiGit,
  SiVite,
  SiFramer,
  SiPostman,
} from "react-icons/si"
import { Layers, Server, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Layers,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML & CSS", icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "REST API", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", icon: SiGit, color: "#F05032" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
]

// Tech stack untuk marquee (flat list)
const marqueeTech = [
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "Supabase", icon: SiSupabase },
  { name: "Git", icon: SiGit },
  { name: "Vite", icon: SiVite },
  { name: "Framer Motion", icon: SiFramer },
]

function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-ivory overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #2E2A26 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Blob dekoratif */}
      <div className="absolute top-20 -left-32 w-80 h-80 bg-amber-soft/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-sand/60 rounded-full blur-3xl pointer-events-none" />

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
              Skills
            </span>
            <span className="h-px w-8 bg-amber" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-espresso mb-4">
            Tech Stack Saya
          </h2>
          <p className="text-taupe max-w-2xl mx-auto mb-8">
            Beberapa teknologi yang saya gunakan sehari-hari untuk membangun
            aplikasi web modern.
          </p>

          {/* Stat chips */}
          <div className="inline-flex flex-wrap justify-center gap-3">
            {skillCategories.map((cat) => (
              <span
                key={cat.title}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-sand border border-warm-border text-xs text-taupe"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span className="font-medium text-espresso">
                  {cat.skills.length}
                </span>
                {cat.title}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Grid 3 kolom kategori */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => {
            const CatIcon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                className="group p-6 rounded-2xl bg-sand border border-warm-border
                           hover:border-amber/60 hover:shadow-lg
                           transition-all duration-300"
              >
                {/* Judul kategori + icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl bg-ivory border border-warm-border
                               flex items-center justify-center
                               group-hover:bg-amber group-hover:border-amber
                               transition-colors duration-300"
                  >
                    <CatIcon
                      size={18}
                      className="text-amber group-hover:text-ivory transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-espresso">
                    {category.title}
                  </h3>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="group/chip inline-flex items-center gap-2
                                   px-3 py-1.5 rounded-lg bg-ivory
                                   border border-warm-border
                                   hover:border-amber hover:-translate-y-0.5
                                   hover:shadow-md transition-all duration-200
                                   cursor-default"
                      >
                        <SkillIcon
                          size={16}
                          style={{ color: skill.color }}
                          className="group-hover/chip:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xs font-medium text-espresso">
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee tech stack */}
        <div className="mt-20 relative">
          <div className="text-center mb-6">
            <span className="text-xs text-taupe tracking-widest uppercase">
              — Tech yang saya pakai —
            </span>
          </div>

          {/* Fade edges */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 w-max"
            >
              {[...marqueeTech, ...marqueeTech].map((tech, index) => {
                const TechIcon = tech.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full
                               bg-sand border border-warm-border
                               text-taupe whitespace-nowrap"
                  >
                    <TechIcon size={16} className="text-amber" />
                    <span className="text-xs font-medium">{tech.name}</span>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills