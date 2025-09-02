'use server';

import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (payload : Partial<IUser>) => {
try {
    //check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("id")
        .eq("email", payload.email)
        .single();

    if(existingUserError && existingUserError.code !== "PGRST116") {
        return {
            success: false, 
            message: existingUserError.message,
        };
    }

    if(existingUser) {
        return {
        success: false,
        message: "User already exists with this email"
        }
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(payload.password!, 10);

    //insert user into the database
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
              email: payload.email,
              password: hashedPassword,
              username: payload.username,   
            },
        ])
        .select();

    if (error) {
        return {
            success : false,
            message : error.message
        }
    }

    return {
        success : true,
        message : "User registered successfully",
        user: data[0],
    };

}   catch (err: any){
    return {
        success: false, 
        message: err.message 
    }
}
};

export const loginUser = async (payload: Partial<IUser>) => {
    // check if user exists
    const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("*")
        .eq("email", payload.email)
        .single();

    if (existingUserError || !existingUser) {
        return {
            success: false,
            message: existingUserError?.message || "User not found",
        };
    }

    const user = existingUser;

    // compare password
    const isPasswordValid = await bcrypt.compare(payload.password!, user.password || "");
    if (!isPasswordValid) {
        return {
            success: false,
            message: "Invalid email or password",
        };
    }

    // optional role check
    if (payload.role && user.role !== payload.role) {
        return {
            success: false,
            message: "Invalid role",
        };
    }

    // generate JWT
    const jwtToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    return {
        success: true,
        message: "User logged in successfully",
        data: jwtToken,
    };
};