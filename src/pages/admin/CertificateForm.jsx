import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import ImageUpload from "../../components/admin/ImageUpload"
import {
  ArrowLeft,
  Save,
  Award,
  Plus,
  X,
  BadgeCheck,
  AlertCircle,
} from "lucide-react"
import Swal from "sweetalert2"
import {
  getCertificateById,
  createCertificate,
  updateCertificate,
} from "../../services/certificates"

const EMPTY_FORM = {
  slug: "",
  title: "",
  issuer: "",
  year: new Date().getFullYear().toString(),
  description: "",
  long_description: "",
  image: "",
  credential: "",
  skills: [],
  duration: "",
}

function CertificateForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [skillInput, setSkillInput] = useState("")

  useEffect(() => {
    if (!isEdit) return

    async function fetchData() {
      try {
        const data = await getCertificateById(id)
        if (!data) {
          setNotFound(true)
          return
        }
        setForm({
          ...EMPTY_FORM,
          ...data,
          skills: data.skills || [],
        })
      } catch (err) {
        console.error(err)
        Swal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text: err.message,
          confirmButtonColor: "#D89B5A",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, isEdit])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleTitleChange = (value) => {
    handleChange("title", value)
    if (!isEdit && !form.slug) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
      handleChange("slug", slug)
    }
  }

  const addSkill = () => {
    const v = skillInput.trim()
    if (!v || form.skills.includes(v)) return
    handleChange("skills", [...form.skills, v])
    setSkillInput("")
  }
  const removeSkill = (skill) => {
    handleChange(
      "skills",
      form.skills.filter((s) => s !== skill),
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const required = ["slug", "title", "issuer", "description"]
    for (const field of required) {
      if (!form[field]?.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Field wajib belum lengkap",
          text: `Field "${field}" harus diisi.`,
          confirmButtonColor: "#D89B5A",
        })
        return
      }
    }

    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      Swal.fire({
        icon: "warning",
        title: "Slug tidak valid",
        text: "Slug hanya boleh huruf kecil, angka, dan tanda hubung (-).",
        confirmButtonColor: "#D89B5A",
      })
      return
    }

    try {
      setSubmitting(true)

      const payload = {
        ...form,
        year: form.year?.trim() || null,
        duration: form.duration?.trim() || null,
        long_description: form.long_description?.trim() || null,
        image: form.image?.trim() || null,
        credential: form.credential?.trim() || null,
      }

      if (isEdit) {
        await updateCertificate(id, payload)
      } else {
        await createCertificate(payload)
      }

      Swal.fire({
        icon: "success",
        title: isEdit ? "Sertifikat diupdate!" : "Sertifikat ditambahkan!",
        text: "Perubahan sudah tersimpan.",
        confirmButtonColor: "#D89B5A",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      })

      setTimeout(() => navigate("/admin/certificates"), 800)
    } catch (err) {
      console.error(err)
      const msg = err.message?.includes("duplicate")
        ? "Slug sudah dipakai. Gunakan slug lain."
        : err.message

      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan",
        text: msg,
        confirmButtonColor: "#D89B5A",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <FormSkeleton />

  if (notFound) {
    return (
      <div className="text-center py-20">
        <AlertCircle size={40} className="text-amber mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-ivory mb-2">
          Sertifikat tidak ditemukan
        </h3>
        <Link
          to="/admin/certificates"
          className="inline-block mt-4 px-5 py-2 rounded-full
                     bg-amber text-ivory text-sm font-medium
                     hover:bg-amber-dark transition-colors"
        >
          Kembali ke List
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/certificates"
          className="group inline-flex items-center gap-2 text-sm text-ivory/60
                     hover:text-amber transition-colors mb-4"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          Kembali ke List
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber/15
                          flex items-center justify-center flex-shrink-0">
            <Award size={18} className="text-amber" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-ivory">
              {isEdit ? "Edit Sertifikat" : "Tambah Sertifikat"}
            </h1>
            <p className="text-xs text-ivory/50">
              {isEdit
                ? "Update informasi sertifikat"
                : "Isi form untuk menambahkan sertifikat baru"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFO DASAR */}
        <FormSection title="Info Dasar">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Judul Sertifikat" required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Front-End Web Development"
                className="form-input"
              />
            </FormField>

            <FormField
              label="Slug (URL)"
              required
              hint="Huruf kecil & tanda hubung"
            >
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="frontend-web-development"
                className="form-input font-mono"
              />
            </FormField>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Penerbit / Issuer" required>
              <input
                type="text"
                value={form.issuer}
                onChange={(e) => handleChange("issuer", e.target.value)}
                placeholder="Dicoding / freeCodeCamp / dll"
                className="form-input"
              />
            </FormField>

            <FormField label="Tahun">
              <input
                type="text"
                value={form.year || ""}
                onChange={(e) => handleChange("year", e.target.value)}
                placeholder="2024"
                className="form-input"
              />
            </FormField>
          </div>

          <FormField label="Durasi">
            <input
              type="text"
              value={form.duration || ""}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="40 jam"
              className="form-input"
            />
          </FormField>

          <FormField
            label="Deskripsi Singkat"
            required
            hint="1-2 baris untuk card"
          >
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Deskripsi singkat..."
              className="form-input resize-none"
            />
          </FormField>

          <FormField label="Deskripsi Panjang" hint="Untuk halaman detail">
            <textarea
              rows={4}
              value={form.long_description || ""}
              onChange={(e) => handleChange("long_description", e.target.value)}
              placeholder="Ceritakan lebih detail tentang sertifikat ini..."
              className="form-input resize-none"
            />
          </FormField>
        </FormSection>

        {/* MEDIA */}
        <FormSection title="Media">
          <ImageUpload
            value={form.image}
            onChange={(url) => handleChange("image", url)}
            folder="certificates"
            label="Gambar Sertifikat"
            hint="JPG, PNG, atau WEBP. Max 5MB. Gunakan gambar landscape."
          />
        </FormSection>

        {/* SKILLS */}
        <FormSection title="Skill yang Dipelajari">
          <FormField label="Skills" hint="Contoh: JavaScript, React, CSS">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                placeholder="JavaScript"
                className="form-input flex-1"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 rounded-xl bg-amber/15 border border-amber/30
                           text-amber text-sm font-medium
                           hover:bg-amber hover:text-ivory transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5
                               rounded-lg bg-amber/15 border border-amber/25
                               text-amber text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FormField>
        </FormSection>

        {/* KREDENSIAL */}
        <FormSection title="Kredensial">
          <FormField
            label="URL Kredensial"
            hint="Link ke halaman verifikasi sertifikat (kalau ada)"
          >
            <input
              type="url"
              value={form.credential || ""}
              onChange={(e) => handleChange("credential", e.target.value)}
              placeholder="https://dicoding.com/certificates/..."
              className="form-input"
            />
          </FormField>

          <div className="flex items-start gap-3 p-4 rounded-xl
                          bg-amber/5 border border-amber/20">
            <BadgeCheck size={16} className="text-amber flex-shrink-0 mt-0.5" />
            <p className="text-xs text-ivory/60 leading-relaxed">
              Kalau diisi, akan muncul tombol <b>"Lihat Kredensial"</b> di
              halaman detail sertifikat. Biarkan kosong kalau tidak ada link
              verifikasi.
            </p>
          </div>
        </FormSection>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6 border-t border-ivory/10">
          <Link
            to="/admin/certificates"
            className="px-5 py-3 rounded-xl border border-ivory/15
                       text-ivory/70 text-sm font-medium text-center
                       hover:border-ivory/30 hover:text-ivory transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-amber text-ivory text-sm font-medium
                       hover:bg-amber-dark
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-colors shadow-lg shadow-amber/20"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-ivory border-t-transparent
                                rounded-full animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={16} />
                {isEdit ? "Simpan Perubahan" : "Simpan Sertifikat"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

/* ============ SUB COMPONENTS ============ */

function FormSection({ title, children }) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-mocha-soft border border-ivory/10 space-y-4">
      <h2 className="text-sm font-bold text-ivory flex items-center gap-2 pb-3
                     border-b border-ivory/10">
        <span className="w-1.5 h-1.5 rounded-full bg-amber" />
        {title}
      </h2>
      {children}
    </div>
  )
}

function FormField({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ivory/70 mb-2">
        {label}
        {required && <span className="text-amber ml-1">*</span>}
        {hint && (
          <span className="ml-2 text-ivory/40 font-normal">— {hint}</span>
        )}
      </label>
      {children}
    </div>
  )
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-ivory/10 rounded animate-pulse" />
      <div className="p-6 rounded-2xl bg-mocha-soft border border-ivory/10 space-y-4">
        <div className="h-4 w-32 bg-ivory/10 rounded animate-pulse" />
        <div className="h-10 bg-ivory/5 rounded-xl animate-pulse" />
        <div className="h-10 bg-ivory/5 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}

export default CertificateForm