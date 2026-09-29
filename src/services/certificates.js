import { supabase } from "../lib/supabase"
import { deleteImageFromStorage } from "./storage"

export async function getAllCertificates() {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("year", { ascending: false })

  if (error) throw error
  return data
}

export async function getCertificateBySlug(slug) {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getCertificateById(id) {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function createCertificate(payload) {
  const { data, error } = await supabase
    .from("certificates")
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCertificate(id, payload) {
  const { data, error } = await supabase
    .from("certificates")
    .update(payload)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCertificate(id) {
  // 1. Ambil data cert (untuk dapat URL gambar)
  const { data: cert } = await supabase
    .from("certificates")
    .select("image")
    .eq("id", id)
    .single()

  // 2. Hapus dari DB
  const { error } = await supabase.from("certificates").delete().eq("id", id)
  if (error) throw error

  // 3. Hapus gambar dari Storage
  if (cert?.image) {
    deleteImageFromStorage(cert.image).catch((err) =>
      console.warn("Gagal hapus gambar sertifikat:", err)
    )
  }

  return true
}