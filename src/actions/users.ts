'use server';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces/index.js";
import { cookies } from "next/headers";

export const registerUser = async (payload : Partial<IUser>) => {
    const emailTrimmed = (payload.email || '').trim().toLowerCase();
    const passwordTrimmed = (payload.password || '').trim();
try {
    //check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("id")
        .eq("email", emailTrimmed)
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
    const hashedPassword = await bcrypt.hash(passwordTrimmed, 10);

    //insert user into the database
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
              email: emailTrimmed,
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

    const user = data[0];

    //generate JWT (same as login)
    const jwtToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    // ✅ set cookie here
const cookieStore = cookies();
    (await cookieStore).set("jwt_token", jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
});

    return {
        success : true,
        message : "User registered successfully",
        // user: data[0], //removed this a1
        user,
        token: jwtToken, //added this a1
    };

}   catch (err: any){
    return {
        success: false, 
        message: err.message 
    }
}
};

export const loginUser = async (payload: Partial<IUser>) => {
    console.log("Login attempt:", payload); 
    const emailTrimmed = (payload.email || '').trim().toLowerCase();
    const passwordTrimmed = (payload.password || '').trim();
    
    // check if user exists
    const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("*")
        .eq("email", emailTrimmed)
        .single();

        console.log("Existing user from DB:", existingUser);

    if (existingUserError || !existingUser ) {
        return {
            success: false,
            message: existingUserError?.message || "User not found",
        };
    }

console.log("Login attempt:", emailTrimmed, "Stored hash:", existingUser.password);
    // compare password
    const isPasswordValid = await bcrypt.compare(
        passwordTrimmed!, 
        existingUser?.password || ""
    );
console.log("Password valid?", isPasswordValid);

    if (!isPasswordValid) {
        return {
            success: false,
            message: "Invalid email or password",
        };
    }

    // optional role check
    if (payload.role && existingUser.role !== payload.role) {
        return {
            success: false,
            message: "Invalid role",
        };
    }

    // generate JWT
    const jwtToken = jwt.sign(
        { userId: existingUser.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );


    return {
        success: true,
        message: "User logged in successfully",
        data: jwtToken,
    };
};

export const getLoggedInUser = async () => {
    try {
        const cookesStore = await cookies();
        const jwtToken = cookesStore.get("token")?.value;
        const decodedData: any = jwt.verify(
            jwtToken || "", 
            process.env.JWT_SECRET!
        );
        const userId = decodedData.userId;

        const { data : users, error} = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
        if(users?.length === 0 || error){
            return {
                success: false, 
                message: "User not found",
            };
        }

        const user = users[0];
        delete user.password; //Remove password from user object
        return {
            success: true, 
            message: "User data fetched successfully",
            data: user,
        }
    } catch (error) {
        return {
            success: false, 
            message: "Failed to get logged in user",
        }
    }
};