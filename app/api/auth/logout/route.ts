import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    // Forward cookies
    const cookieHeader = req.headers.get("cookie") || "";

    const currentSessionId: any = req.cookies.get("SessionId")?.value;
    console.log("currentSessionId", currentSessionId);

    // Extract body or headers
    const { logoutAll } = await req.json().catch(() => ({ logoutAll: false }));
    console.log("logoutAll", logoutAll);

    // Extract optional x-session-id from incoming request
    const sessionId = req.headers.get("x-session-id") || undefined;

    // Build headers for backend call
    const headers: HeadersInit = {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
      "x-logout-all": logoutAll ? "true" : "false",
    };

    if (sessionId) {
      headers["x-session-id"] = sessionId;
    } else {
      headers["x-session-id"] = currentSessionId;
    }

    const res = await fetch(`${BACKEND}/auth/logout`, {
      method: "POST",
      headers,
      cache: "no-store",
    });

    console.log('sessionId === currentSessionId', sessionId === currentSessionId)

    const data = await res.json();
    
    if (res.status === 200) {
      const response = NextResponse.json(data, { status: res.status });

      // 🔑 Clear cookies
      response.cookies.set("Authentication", "", { path: "/", maxAge: 0 });
      response.cookies.set("SessionId", "", { path: "/", maxAge: 0 });
      response.cookies.set("refreshToken", "", { path: "/", maxAge: 0 });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: res.status }
    );
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
