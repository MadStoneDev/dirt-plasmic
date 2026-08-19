import { OpenPanel } from "@openpanel/nextjs";

// Server-side OpenPanel client. Uses the client secret to authenticate,
// so it must only ever be imported from server code (API routes), never
// from a component. Self-hosted instances also need the API URL.
const CLIENT_ID = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;
const CLIENT_SECRET = process.env.OPENPANEL_CLIENT_SECRET;
const API_URL = process.env.NEXT_PUBLIC_OPENPANEL_API_URL;

let client: OpenPanel | null = null;

function getServerClient(): OpenPanel | null {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;
  if (!client) {
    client = new OpenPanel({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      ...(API_URL ? { apiUrl: API_URL } : {}),
    });
  }
  return client;
}

/**
 * Fire a server-side OpenPanel event. No-ops when OpenPanel env vars are
 * unset, and never throws — safe to call from request handlers without
 * affecting the response.
 */
export async function trackServerEvent(
  name: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const op = getServerClient();
  if (!op) return;
  try {
    await op.track(name, properties);
  } catch (err) {
    console.error("OpenPanel server track error:", err);
  }
}
