import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward request to backend API
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

    const response = NextResponse.json(data, { status: 200 });
    // Set-Cookie headers from backend response
    const setCookie = res.headers.get("set-cookie");

    if (setCookie) {
      // Split multiple cookies from the API
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
