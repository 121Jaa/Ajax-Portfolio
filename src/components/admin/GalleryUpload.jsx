import { useRef, useState } from "react"
import { Upload, X, ImageIcon, Loader2, GripVertical } from "lucide-react"
import Swal from "sweetalert2"
import { uploadImage, deleteImageFromStorage } from "../../services/storage"

function GalleryUpload({
  value = [],
  onChange,
  folder = "gallery",
  label = "Galeri Gambar",
  hint = "Upload multiple gambar. Max 5MB per file.",
  maxItems = 8,
}) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Cek limit
    if (value.length + files.length > maxItems) {
      Swal.fire({
        icon: "warning",
        title: "Terlalu banyak",
        text: `Maksimal ${maxItems} gambar. Kamu sudah punya ${value.length}.`,
        confirmButtonColor: "#D89B5A",
      })
      return
    }

    try {
      setUploading(true)
      const uploadedUrls = []

      for (const file of files) {
        try {
          const url = await uploadImage(file, folder)
          uploadedUrls.push(url)
        } catch (err) {
          console.error(`Gagal upload ${file.name}:`, err)
          // Lanjut ke file berikutnya
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...value, ...uploadedUrls])
        Swal.fire({
          icon: "success",
          title: `${uploadedUrls.length} gambar terupload!`,
          confirmButtonColor: "#D89B5A",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      } else {
        throw new Error("Tidak ada gambar yang berhasil diupload")
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal upload",
        text: err.message,
        confirmButtonColor: "#D89B5A",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleRemove = async (url) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Hapus gambar?",
      text: "Gambar akan dihapus dari galeri.",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6B6156",
    })

    if (!result.isConfirmed) return

    // Hapus dari list
    onChange(value.filter((u) => u !== url))

    // Best-effort: hapus dari Storage juga
    deleteImageFromStorage(url).catch((err) =>
      console.warn("Gagal hapus dari storage:", err)
    )
  }

  return (
    <div>
      <label className="block text-xs font-medium text-ivory/70 mb-2">
        {label}
        {value.length > 0 && (
          <span className="ml-2 text-amber">
            ({value.length}/{maxItems})
          </span>
        )}
        {hint && (
          <span className="ml-2 text-ivory/40 font-normal">— {hint}</span>
        )}
      </label>

      {/* Grid preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {value.map((url, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden
                         border border-ivory/10 bg-mocha aspect-video"
            >
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Number badge */}
              <div
                className="absolute top-2 left-2 w-6 h-6 rounded-full
                           bg-mocha/80 backdrop-blur-md border border-ivory/20
                           flex items-center justify-center
                           text-[10px] font-bold text-ivory"
              >
                {i + 1}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg
                           bg-red-500/90 hover:bg-red-600
                           flex items-center justify-center text-white
                           backdrop-blur-md transition-colors
                           opacity-0 group-hover:opacity-100"
                title="Hapus"
              >
                <X size={13} />
              </button>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                           transition-opacity pointer-events-none flex items-end p-2"
              >
                <p className="text-[9px] text-white/80 font-mono truncate">
                  {url.split("/").pop()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {value.length === 0 && (
        <div
          className="rounded-xl border-2 border-dashed border-ivory/15
                     bg-ivory/5 p-8 text-center mb-3"
        >
          <ImageIcon size={28} className="text-ivory/30 mx-auto mb-2" />
          <p className="text-xs text-ivory/50">Belum ada gambar galeri</p>
        </div>
      )}

      {/* Upload input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || value.length >= maxItems}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                   bg-amber/15 border border-amber/30
                   text-amber text-sm font-medium
                   hover:bg-amber hover:text-ivory
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {uploading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Mengupload...
          </>
        ) : (
          <>
            <Upload size={15} />
            {value.length >= maxItems
              ? `Maksimal ${maxItems} gambar`
              : "Tambah Gambar"}
          </>
        )}
      </button>
    </div>
  )
}

export default GalleryUpload