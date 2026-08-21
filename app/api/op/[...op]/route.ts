import { createRouteHandler } from "@openpanel/nextjs/server";

// First-party proxy for OpenPanel, so the browser only ever talks to our
// own domain — ad blockers block the third-party openpanel.dev script by
// name, but not /api/op on our host.
//
//   GET  /api/op/op1.js  → serves the tracking script
//   POST /api/op/track   → forwards events to the self-hosted OpenPanel API
//
// apiUrl is the server-side target (our OpenPanel instance). It reuses the
// same NEXT_PUBLIC_OPENPANEL_API_URL value, read here on the server.
const handler = createRouteHandler({
  apiUrl: process.env.NEXT_PUBLIC_OPENPANEL_API_URL,
});

export const GET = handler.GET;
export const POST = handler.POST;
