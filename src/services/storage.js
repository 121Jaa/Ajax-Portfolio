import { supabase } from "../lib/supabase"

export async function uploadImage(file, folder = "uploads") {
  if (!file) throw new Error("File tidak ada")

  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error("Ukuran file terlalu besar (max 5MB)")
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format file harus JPG, PNG, WEBP, atau GIF")
  }

  const ext = file.name.split(".").pop().toLowerCase()
  const randomStr = Math.random().toString(36).substring(2, 10)
  const fileName = `${Date.now()}-${randomStr}.${ext}`
  const filePath = `${folder}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath)
  return data.publicUrl
}

export async function deleteImageFromStorage(publicUrl) {
  if (!publicUrl) return
  try {
    const url = new URL(publicUrl)
    const pathParts = url.pathname.split("/portfolio/")
    if (pathParts.length < 2) return

    const filePath = pathParts[1]
    const { error } = await supabase.storage
      .from("portfolio")
      .remove([filePath])

    if (error) console.error("Delete from storage error:", error)
  } catch (err) {
    console.error("Error parsing URL:", err)
  }
}