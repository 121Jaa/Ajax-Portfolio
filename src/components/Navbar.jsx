import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)

    const targetId = href.replace("#", "")
    const isHomePage = location.pathname === "/"

    if (isHomePage) {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        window.history.pushState(null, "", href)
      }
    } else {
      navigate("/")
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/85 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-xl font-bold tracking-tight text-black cursor-pointer"
          >
            ajax<span className="text-amber">.dev</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-taupe hover:text-espresso transition-colors
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-amber
                             after:transition-all after:duration-300
                             hover:after:w-full cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden md:inline-block px-5 py-2 rounded-full
                       bg-amber text-white text-sm font-medium
                       hover:bg-amber-dark transition-colors shadow-sm cursor-pointer"
          >
            Hubungi Saya
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-espresso p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-ivory/95 backdrop-blur-md ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2 text-taupe hover:text-amber transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="block mt-2 py-2 text-center rounded-full
                           bg-amber text-white text-sm font-medium
                           hover:bg-amber-dark transition-colors cursor-pointer"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ============ OVERLAY — Klik di luar untuk close ============ */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 md:hidden
                     bg-black/20 backdrop-blur-[2px]
                     transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Navbar