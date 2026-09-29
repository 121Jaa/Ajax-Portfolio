import { supabase } from "../lib/supabase"
import { deleteImageFromStorage } from "./storage"

export async function getAllProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })   // featured dulu
    .order("created_at", { ascending: false }) // baru created_at

  if (error) throw error
  return data
}

export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getProjectById(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function createProject(payload) {
  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id, payload) {
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id) {
  // 1. Ambil data project (untuk dapat URL gambar)
  const { data: project } = await supabase
    .from("projects")
    .select("image, gallery")
    .eq("id", id)
    .single()

  // 2. Hapus dari DB
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) throw error

  // 3. Hapus gambar dari Storage (best-effort — jangan block kalau gagal)
  if (project?.image) {
    deleteImageFromStorage(project.image).catch((err) =>
      console.warn("Gagal hapus gambar utama:", err)
    )
  }
  if (project?.gallery?.length) {
    project.gallery.forEach((url) => {
      deleteImageFromStorage(url).catch((err) =>
        console.warn("Gagal hapus gambar gallery:", err)
      )
    })
  }

  return true
}