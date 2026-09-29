import { useRef, useState } from "react"
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon } from "lucide-react"
import Swal from "sweetalert2"
import { uploadImage } from "../../services/storage"

function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  label = "Gambar",
  hint = "JPG, PNG, WEBP, atau GIF. Max 5MB.",
}) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState("upload") // "upload" | "url"
  const [urlInput, setUrlInput] = useState("")

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const url = await uploadImage(file, folder)
      onChange(url)
      Swal.fire({
        icon: "success",
        title: "Gambar terupload!",
        confirmButtonColor: "#D89B5A",
        timer: 1200,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "Gagal upload",
        text: err.message,
        confirmButtonColor: "#D89B5A",
      })
    } finally {
      setUploading(false)
      // Reset input biar bisa upload file yang sama lagi
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleRemove = () => {
    onChange("")
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return
    onChange(urlInput.trim())
    setUrlInput("")
  }

  return (
    <div>
      {/* Label */}
      <label className="block text-xs font-medium text-ivory/70 mb-2">
        {label}
        {hint && (
          <span className="ml-2 text-ivory/40 font-normal">— {hint}</span>
        )}
      </label>

      {/* Toggle mode upload/url */}
      <div className="inline-flex items-center gap-1 p-1 rounded-lg mb-3
                      bg-ivory/5 border border-ivory/10">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md
                     text-[11px] font-medium transition-colors
                     ${
                       mode === "upload"
                         ? "bg-amber text-ivory"
                         : "text-ivory/60 hover:text-ivory"
                     }`}
        >
          <Upload size={12} />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md
                     text-[11px] font-medium transition-colors
                     ${
                       mode === "url"
                         ? "bg-amber text-ivory"
                         : "text-ivory/60 hover:text-ivory"
                     }`}
        >
          <LinkIcon size={12} />
          URL
        </button>
      </div>

      {/* Preview gambar */}
      {value ? (
        <div className="relative rounded-xl overflow-hidden
                        border border-ivory/10 max-w-md mb-3">
          <img
            src={value}
            alt="Preview"
            className="w-full aspect-video object-cover"
            onError={(e) => {
              e.target.src = ""
              e.target.alt = "Gagal load gambar"
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-lg
                       bg-red-500/90 hover:bg-red-600
                       flex items-center justify-center text-white
                       backdrop-blur-md transition-colors"
            title="Hapus gambar"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-2
                          bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-[10px] text-white/80 font-mono truncate">
              {value}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl border-2 border-dashed border-ivory/15
                     bg-ivory/5 p-8 text-center max-w-md mb-3"
        >
          <ImageIcon size={28} className="text-ivory/30 mx-auto mb-2" />
          <p className="text-xs text-ivory/50">Belum ada gambar</p>
        </div>
      )}

      {/* Mode: Upload */}
      {mode === "upload" && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
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
                {value ? "Ganti Gambar" : "Pilih Gambar"}
              </>
            )}
          </button>
        </>
      )}

      {/* Mode: URL */}
      {mode === "url" && (
        <div className="flex gap-2 max-w-md">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleUrlSubmit()
              }
            }}
            placeholder="https://..."
            className="form-input flex-1"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 rounded-xl bg-amber/15 border border-amber/30
                       text-amber text-sm font-medium
                       hover:bg-amber hover:text-ivory transition-colors"
          >
            Pakai
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload