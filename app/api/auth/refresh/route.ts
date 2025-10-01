import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost";

export async function POST(req: Request) {
  try {
    // Forward cookies
    const cookieHeader = req.headers.get("cookie") || "";

    const res = await fetch(`${BACKEND}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json(data, { status: 200 });
    // Grab Set-Cookie headers from backend response
    const setCookie = res.headers.get("set-cookie");

    if (setCookie) {
      // If backend sends multiple cookies, split them
      const cookies = setCookie.split(',').map((c) => c.trim());
      
      cookies.forEach((cookie) => {
        const [cookieName, ...cookieRest] = cookie.split("=");
        const cookieValue = cookieRest.join("=").split(";")[0];

        response.cookies.set(cookieName, cookieValue, {
          httpOnly: cookie.toLowerCase().includes('httpOnly'),
          secure: cookie.toLowerCase().includes('secure'),
          sameSite: cookie.toLowerCase().includes('samesite=strict') ? 'strict' : 'lax',
          path: cookie.toLowerCase().includes('path=') ? cookie.split("Path=")[1]?.split(";")[0] : "/",
        })
      })
    }

    return response;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
