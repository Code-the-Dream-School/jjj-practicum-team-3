import { supabase } from "../../src/lib/supabaseClient";

export default async function handler(req, res) {
  const { username, password } = req.body;
  console.log("POSTMAN SENT:", username, password);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful", user: data });
}
