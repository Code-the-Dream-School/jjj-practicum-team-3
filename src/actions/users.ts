'use server';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces/index.js";

export const registerUser = async (payload : Partial<IUser>) => {
  const emailTrimmed = (payload.email || '').trim().toLowerCase();
  const passwordTrimmed = (payload.password || '').trim();

  try {
    // check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", emailTrimmed)
      .single();

    if (existingUserError && existingUserError.code !== "PGRST116") {
      return { success: false, message: existingUserError.message };
    }

    if (existingUser) {
      return { success: false, message: "User already exists with this email" };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(passwordTrimmed, 10);

    // insert user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email: emailTrimmed,
          password: hashedPassword,
          username: payload.username,
          role: "user", // default
        },
      ])
      .select();

    if (error) {
      return { success: false, message: error.message };
    }

    const user = data[0];

    // generate JWT
    const jwtToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return {
      success: true,
      message: "User registered successfully",
      user,
      token: jwtToken,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const loginUser = async (payload: Partial<IUser>) => {
  const emailTrimmed = (payload.email || '').trim().toLowerCase();
  const passwordTrimmed = (payload.password || '').trim();

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", emailTrimmed)
    .single();

  if (existingUserError || !existingUser) {
    return { success: false, message: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(
    passwordTrimmed!,
    existingUser?.password || ""
  );

  if (!isPasswordValid) {
    return { success: false, message: "Invalid email or password" };
  }

  const jwtToken = jwt.sign(
    { userId: existingUser.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    success: true,
    message: "User logged in successfully",
    token: jwtToken,
    user: { 
        id: existingUser.id, 
        email: existingUser.email, 
        username: existingUser.username,
        role: existingUser.role }
  };
};
