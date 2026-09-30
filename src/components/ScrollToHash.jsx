import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Kalau tidak ada hash di URL, scroll ke atas (perilaku normal navigasi)
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" })
      return
    }

    // Ada hash — cari element dengan id yang sesuai, scroll ke sana
    const targetId = hash.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      // Delay sedikit, biar halaman selesai render dulu
      setTimeout(() => {
        const navbarHeight = 80 // offset untuk navbar fixed
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }, 100)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToHash