// app/api/auth/recent-logins/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie");
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    // Build backend URL with optional query params
    const backendUrl = new URL(`${process.env.BACKEND_URL}/auth/sessions/`);
    if (page) backendUrl.searchParams.append("page", page);
    if (pageSize) backendUrl.searchParams.append("pageSize", pageSize);

    const res = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookie ?? "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
