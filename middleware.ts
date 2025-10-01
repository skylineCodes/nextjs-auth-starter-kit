// middleware.ts (project root)
import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL;

function parseSetCookieHeader(setCookieHeader: string) {
  const parts: string[] = [];

  // console.log('setCookieHeader', setCookieHeader);

  let remaining = setCookieHeader;
  while (remaining.length) {
    // find the first ';' (end of attributes for first cookie value)
    const semicolonIndex = remaining.indexOf(";");

    // If no semicolon, push remaining and break
    if (semicolonIndex === -1) {
      parts.push(remaining.trim());
      break;
    }

    // find next cookie start by searching for ", " after the semicolon
    const commaIndex = remaining.indexOf(", ", semicolonIndex);
    if (commaIndex === -1) {
      parts.push(remaining.trim());
      break;
    }

    // assume slice from start..commaIndex is one cookie
    parts.push(remaining.slice(0, commaIndex).trim());
    remaining = remaining.slice(commaIndex + 2);
  }

  // map to objects
  return parts.map((raw) => {
    const [nameValue, ...attrs] = raw.split(";");
    const [name, ...valParts] = nameValue.split("=");
    const value = valParts.join("=");
    const attrsString = attrs.join(";");
    return { name: name?.trim(), value: value?.trim(), attrsString: attrsString?.trim() };
  });
}

async function callBackendValidate(cookieHeader: string) {
  // console.log('cookieHeader', cookieHeader);

  return fetch(`${BACKEND}/auth/validate`, {
    method: "GET",
    headers: { Cookie: cookieHeader || "" },
    cache: "no-store",
  });
}

export async function callBackendRefresh(cookieHeader: string) {
  return fetch(`${BACKEND}/auth/refresh`, {
    method: "POST",
    headers: { Cookie: cookieHeader || "" },
    cache: "no-store",
  });
}

export async function middleware(req: NextRequest) {
  // Only run for matcher paths
  const cookieHeader = req.headers.get("cookie") || "";
  const auth = req.cookies.get("Authentication")?.value;
  // console.log('auth', auth);
  const sessionId = req.cookies.get("SessionId")?.value;
  // console.log('sessionId', sessionId);
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // 1) If no auth/session, but refresh exists -> try refresh
  if (!auth || !sessionId) {
    console.log('Entered here first', new Date());
    if (refreshToken) {
      const refreshRes = await callBackendRefresh(cookieHeader);
      
      if (refreshRes.status === 200) {
        const response = NextResponse.next();
        const setCookie = refreshRes.headers.get("set-cookie");

        if (setCookie) {
          const cookies = parseSetCookieHeader(setCookie);
          cookies.forEach((c) => {
            // reapply cookie with some sensible defaults
            response.cookies.set(c.name!, c.value!, {
              httpOnly: /httponly/i.test(c.attrsString),
              secure: /secure/i.test(c.attrsString) || process.env.NODE_ENV === "production",
              path: (/path=([^;]+)/i.exec(c.attrsString) || [])[1] || "/",
              sameSite: /samesite=strict/i.test(c.attrsString) ? "strict" : "lax",
            });
          });
        }
        return response;
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2) Auth + session exist -> validate
  try {
    const validateRes = await callBackendValidate(cookieHeader);
    console.log("validateRes status:", validateRes.status, new Date());
    console.log("validateRes body:", await validateRes.text(), new Date());
    
    if (validateRes.status === 200) {
      console.log('Then I entered here second', new Date());
      return NextResponse.next();
    } else if (refreshToken) {
      // console.log("refreshToken:", refreshToken);
      // 3) validation failed -> try refresh if refreshToken exists
      const refreshRes = await callBackendRefresh(cookieHeader);
      console.log('refreshRes', await refreshRes.text(), new Date());

      if (refreshRes.status === 200) {
        const response = NextResponse.next();
        const setCookie = refreshRes.headers.get("set-cookie");
        if (setCookie) {
          console.log('setCookies', setCookie);
          const cookies = parseSetCookieHeader(setCookie);
          cookies.forEach((c) => {
            response.cookies.set(c.name!, c.value!, {
              httpOnly: /httponly/i.test(c.attrsString),
              secure: /secure/i.test(c.attrsString) || process.env.NODE_ENV === "production",
              path: (/path=([^;]+)/i.exec(c.attrsString) || [])[1] || "/",
              sameSite: /samesite=strict/i.test(c.attrsString) ? "strict" : "lax",
            });
          });
        }
        return response;
      } else {
        // console.log("❌ Refresh Token invalid, redirecting to login, status:", validateRes.status);
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // return NextResponse.redirect(new URL("/login", req.url));
    } else {
      // 4) validate failed, no refresh or refresh failed
      console.log("❌ Token invalid, redirecting to login, status:", validateRes.status);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    // If backend call throws or times out, safest option is redirect
    console.error("Middleware auth check error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Only run for dashboard routes
export const config = {
  matcher: ["/dashboard/:path*", "/components/:path*", "/payments/:path*", "/search-insights/:path*", "/users/:path*", "/settings/:path*"],
};
