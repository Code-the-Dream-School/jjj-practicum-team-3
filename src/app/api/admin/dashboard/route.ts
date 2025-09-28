import { NextResponse } from "next/server";
import { getAdminDashboardData } from "@/actions/admin-dashboard";

export async function GET() {
  try {
    const result = await getAdminDashboardData();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message, data: null },
      { status: 500 }
    );
  }
}