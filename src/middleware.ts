import {
  userAgent,
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
// SESSION
import { getIronSession } from "iron-session";
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  /* Defend */
  // Defend from bot
  if (userAgent(req).isBot) {
    return new Response("No bot", { status: 403 });
  }

  /* Session */
  // Check logged-in user using session
  const isCookie = req.cookies.has("carrot-session");
  const { user } = await getIronSession<IIronSessionData>(
    req,
    NextResponse.next(), // res
    sessionOptions
  );
  const isUser = Boolean(isCookie && user);
  if (!isUser && !req.nextUrl.pathname.startsWith("/enter")) {
    const url = req.nextUrl.clone();
    url.pathname = "/enter";
    return NextResponse.rewrite(url);
  }

  // If logged-in user goes "/enter", Replace "/profile"
  if (isUser && req.nextUrl.pathname.startsWith("/enter")) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }
}

// Execute middleware only on page
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
