import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward request to your backend API
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status !== 200) {
      return NextResponse.json(data, { status: res.status });
    }

    // ✅ Optionally set httpOnly cookie for auth token here
    // if (data.token) {
    //   const response = NextResponse.json(data, { status: 200 });
    //   response.cookies.set("auth_token", data.token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     path: "/",
    //   });
    //   return response;
    // }

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
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
