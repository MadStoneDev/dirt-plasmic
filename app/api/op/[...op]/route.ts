import { createRouteHandler } from "@openpanel/nextjs/server";

// First-party proxy for OpenPanel. Serving from our own domain dodges the
// third-party `||openpanel.dev/op1.js` block — but EasyPrivacy also ships a
// domain-independent rule, `/op/op1.js?v=$script`, which still matches the
// proxied URL `/api/op/op1.js?v=1.5.1` (the SDK appends `?v=<version>` to any
// `.js` script URL). So we expose the *same* script under a neutral filename
// no filter list targets, then rewrite it back to the path the SDK handler
// understands.
//
//   GET  /api/op/vendor.js  → serves the tracking script (formerly op1.js)
//   POST /api/op/track      → forwards events to the self-hosted OpenPanel API
//
// apiUrl is the server-side target (our OpenPanel instance). It reuses the
// same NEXT_PUBLIC_OPENPANEL_API_URL value, read here on the server.
const SCRIPT_NAME = "vendor.js";

const handler = createRouteHandler({
  apiUrl: process.env.NEXT_PUBLIC_OPENPANEL_API_URL,
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.pathname.endsWith(`/${SCRIPT_NAME}`)) {
    // The SDK handler only serves paths ending in `/op1.js`; rewrite our
    // neutral name back to it, preserving the `?v=` query and headers.
    url.pathname = url.pathname.slice(0, -SCRIPT_NAME.length) + "op1.js";
    return handler.GET(new Request(url, req));
  }
  return handler.GET(req);
}

export const POST = handler.POST;
