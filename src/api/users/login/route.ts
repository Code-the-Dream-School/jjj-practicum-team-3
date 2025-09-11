// import { NextResponse } from "next/server";
// import supabase from "@/config/supabase-config";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     // 1. Find user by email
//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email.toLowerCase().trim())
//       .single();

//     if (error || !user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // 2. Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // 3. Create JWT
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1d" }
//     );

//     // 4. Set cookie
//     const res = NextResponse.json({ success: true, message: "Login successful" });
//     res.cookies.set("jwt_token", token, {
//       httpOnly: true,   // prevents JS access (XSS safe)
//       secure: process.env.NODE_ENV === "production", // HTTPS only in prod
//       sameSite: "strict",
//       path: "/",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     return res;
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import supabase from "@/config/supabase-config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Find user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Compare password (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // 4. Send response with cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });

    response.cookies.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}