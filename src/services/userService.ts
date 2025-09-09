import { supabase } from "./supabaseClient.js";

// Get all users
export async function getAllUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) throw error;
  return data;
}

// Get user by ID
export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Create a new user
export async function createUser(user: { name: string; email: string }) {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .single();

  if (error) throw error;
  return data;
}

// Update user
export async function updateUser(id: string, updates: { name?: string; email?: string }) {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Delete user
export async function deleteUser(id: string) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}