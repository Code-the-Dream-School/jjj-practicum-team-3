import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../services/supabaseClient.js";

interface User {
  id: number;
  username: string;
  password: string;
  // Add more fields if your "users" table has them
}

interface LoginResponse {
  message?: string;
  user?: User;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

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
