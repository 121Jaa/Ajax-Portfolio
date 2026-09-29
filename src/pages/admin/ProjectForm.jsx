import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageUpload from "../../components/admin/ImageUpload";
import GalleryUpload from "../../components/admin/GalleryUpload";
import {
  ArrowLeft,
  Save,
  FileCode2,
  Plus,
  X,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  getProjectById,
  createProject,
  updateProject,
} from "../../services/projects";

const EMPTY_FORM = {
  slug: "",
  title: "",
  category: "",
  description: "",
  long_description: "",
  image: "",
  gallery: [],
  tags: [],
  year: new Date().getFullYear().toString(),
  role: "",
  duration: "",
  demo: "",
  repo: "",
  highlights: [],
  featured: false,
};

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    async function fetchData() {
      try {
        const data = await getProjectById(id);
        if (!data) {
          setNotFound(true);
          return;
        }
        setForm({
          ...EMPTY_FORM,
          ...data,
          gallery: data.gallery || [],
          tags: data.tags || [],
          highlights: data.highlights || [],
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text: err.message,
          confirmButtonColor: "#D89B5A",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (value) => {
    handleChange("title", value);
    if (!isEdit && !form.slug) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      handleChange("slug", slug);
    }
  };

  const addTag = () => {
    const v = tagInput.trim();
    if (!v || form.tags.includes(v)) return;
    handleChange("tags", [...form.tags, v]);
    setTagInput("");
  };
  const removeTag = (tag) => {
    handleChange(
      "tags",
      form.tags.filter((t) => t !== tag),
    );
  };

  const addGallery = () => {
    const v = galleryInput.trim();
    if (!v || form.gallery.includes(v)) return;
    handleChange("gallery", [...form.gallery, v]);
    setGalleryInput("");
  };
  const removeGallery = (url) => {
    handleChange(
      "gallery",
      form.gallery.filter((g) => g !== url),
    );
  };

  const addHighlight = () => {
    const v = highlightInput.trim();
    if (!v || form.highlights.includes(v)) return;
    handleChange("highlights", [...form.highlights, v]);
    setHighlightInput("");
  };
  const removeHighlight = (item) => {
    handleChange(
      "highlights",
      form.highlights.filter((h) => h !== item),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["slug", "title", "category", "description"];
    for (const field of required) {
      if (!form[field]?.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Field wajib belum lengkap",
          text: `Field "${field}" harus diisi.`,
          confirmButtonColor: "#D89B5A",
        });
        return;
      }
    }

    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      Swal.fire({
        icon: "warning",
        title: "Slug tidak valid",
        text: "Slug hanya boleh huruf kecil, angka, dan tanda hubung (-).",
        confirmButtonColor: "#D89B5A",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        year: form.year?.trim() || null,
        role: form.role?.trim() || null,
        duration: form.duration?.trim() || null,
        long_description: form.long_description?.trim() || null,
        image: form.image?.trim() || null,
        demo: form.demo?.trim() || null,
        repo: form.repo?.trim() || null,
      };

      if (isEdit) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }

      Swal.fire({
        icon: "success",
        title: isEdit ? "Project diupdate!" : "Project ditambahkan!",
        text: "Perubahan sudah tersimpan.",
        confirmButtonColor: "#D89B5A",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/admin/projects"), 800);
    } catch (err) {
      console.error(err);
      const msg = err.message?.includes("duplicate")
        ? "Slug sudah dipakai. Gunakan slug lain."
        : err.message;

      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan",
        text: msg,
        confirmButtonColor: "#D89B5A",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <FormSkeleton />;

  if (notFound) {
    return (
      <div className="text-center py-20">
        <AlertCircle size={40} className="text-amber mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-ivory mb-2">
          Project tidak ditemukan
        </h3>
        <Link
          to="/admin/projects"
          className="inline-block mt-4 px-5 py-2 rounded-full
                     bg-amber text-ivory text-sm font-medium
                     hover:bg-amber-dark transition-colors"
        >
          Kembali ke List
        </Link>
      </div>
    );
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
          to="/admin/projects"
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
          <div
            className="w-10 h-10 rounded-xl bg-amber/15
                          flex items-center justify-center flex-shrink-0"
          >
            <FileCode2 size={18} className="text-amber" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-ivory">
              {isEdit ? "Edit Project" : "Tambah Project"}
            </h1>
            <p className="text-xs text-ivory/50">
              {isEdit
                ? "Update informasi project"
                : "Isi form untuk menambahkan project baru"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFO DASAR */}
        <FormSection title="Info Dasar">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Judul" required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Notes App"
                className="form-input"
              />
            </FormField>

            <FormField
              label="Slug (URL)"
              required
              hint="Huruf kecil, angka, tanda hubung"
            >
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="notes-app"
                className="form-input font-mono"
              />
            </FormField>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Kategori" required>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Web App / Side Project / dll"
                className="form-input"
              />
            </FormField>

            <FormField label="Tahun">
              <input
                type="text"
                value={form.year || ""}
                onChange={(e) => handleChange("year", e.target.value)}
                placeholder="2025"
                className="form-input"
              />
            </FormField>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Role / Peran">
              <input
                type="text"
                value={form.role || ""}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Front-End Developer"
                className="form-input"
              />
            </FormField>

            <FormField label="Durasi">
              <input
                type="text"
                value={form.duration || ""}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="2 minggu"
                className="form-input"
              />
            </FormField>
          </div>

          <FormField
            label="Deskripsi Singkat"
            required
            hint="Muncul di card project"
          >
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Deskripsi singkat 1-2 baris..."
              className="form-input resize-none"
            />
          </FormField>

          <FormField label="Deskripsi Panjang" hint="Muncul di halaman detail">
            <textarea
              rows={4}
              value={form.long_description || ""}
              onChange={(e) => handleChange("long_description", e.target.value)}
              placeholder="Ceritakan lebih detail tentang project ini..."
              className="form-input resize-none"
            />
          </FormField>
        </FormSection>

        {/* MEDIA */}
        <FormSection title="Media">
          <ImageUpload
            value={form.image}
            onChange={(url) => handleChange("image", url)}
            folder="projects"
            label="Gambar Utama"
            hint="JPG, PNG, atau WEBP. Max 5MB."
          />

          {/* Gallery (input URL) */}
          <GalleryUpload
            value={form.gallery}
            onChange={(urls) => handleChange("gallery", urls)}
            folder="projects/gallery"
            label="Galeri Gambar"
            hint="Upload multiple gambar. Max 8 gambar, 5MB per file."
            maxItems={8}
          />
        </FormSection>

        {/* TECH & FITUR */}
        <FormSection title="Tech Stack & Fitur">
          <FormField label="Tech Stack" hint="Contoh: React, Tailwind, Node.js">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="React"
                className="form-input flex-1"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 rounded-xl bg-amber/15 border border-amber/30
                           text-amber text-sm font-medium
                           hover:bg-amber hover:text-ivory transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5
                               rounded-lg bg-amber/15 border border-amber/25
                               text-amber text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FormField>

          <FormField label="Highlights / Fitur" hint="Poin-poin fitur utama">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addHighlight();
                  }
                }}
                placeholder="Dark mode, Search, dll"
                className="form-input flex-1"
              />
              <button
                type="button"
                onClick={addHighlight}
                className="px-4 rounded-xl bg-amber/15 border border-amber/30
                           text-amber text-sm font-medium
                           hover:bg-amber hover:text-ivory transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {form.highlights.length > 0 && (
              <div className="space-y-2">
                {form.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg
                               bg-ivory/5 border border-ivory/10"
                  >
                    <span className="text-xs text-ivory/60 truncate flex-1">
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(item)}
                      className="p-1 rounded text-red-400 hover:bg-red-500/10
                                 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FormField>
        </FormSection>

        {/* LINKS */}
        <FormSection title="Links">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Live Demo URL">
              <input
                type="url"
                value={form.demo || ""}
                onChange={(e) => handleChange("demo", e.target.value)}
                placeholder="https://demo.vercel.app"
                className="form-input"
              />
            </FormField>
            <FormField label="Source Code URL">
              <input
                type="url"
                value={form.repo || ""}
                onChange={(e) => handleChange("repo", e.target.value)}
                placeholder="https://github.com/..."
                className="form-input"
              />
            </FormField>
          </div>
        </FormSection>

        {/* FEATURED */}
        <FormSection title="Pengaturan">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="w-5 h-5 rounded accent-amber cursor-pointer flex-shrink-0"
            />
            <div>
              <div className="text-sm text-ivory font-medium">
                Featured Project
              </div>
              <div className="text-xs text-ivory/50">
                Tandai sebagai project unggulan (tampil di paling atas).
              </div>
            </div>
          </label>
        </FormSection>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6 border-t border-ivory/10">
          <Link
            to="/admin/projects"
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
                <div
                  className="w-4 h-4 border-2 border-ivory border-t-transparent
                                rounded-full animate-spin"
                />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={16} />
                {isEdit ? "Simpan Perubahan" : "Simpan Project"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* ============ SUB COMPONENTS ============ */

function FormSection({ title, children }) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-mocha-soft border border-ivory/10 space-y-4">
      <h2
        className="text-sm font-bold text-ivory flex items-center gap-2 pb-3
                     border-b border-ivory/10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber" />
        {title}
      </h2>
      {children}
    </div>
  );
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
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-ivory/10 rounded animate-pulse" />
      <div className="p-6 rounded-2xl bg-mocha-soft border border-ivory/10 space-y-4">
        <div className="h-4 w-32 bg-ivory/10 rounded animate-pulse" />
        <div className="h-10 bg-ivory/5 rounded-xl animate-pulse" />
        <div className="h-10 bg-ivory/5 rounded-xl animate-pulse" />
        <div className="h-20 bg-ivory/5 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default ProjectForm;
