import type { NextApiRequest, NextApiResponse } from "next";

const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;

async function acFetch(path: string, options?: RequestInit) {
  return fetch(`${AC_URL}/api/3/${path}`, {
    ...options,
    headers: {
      "Api-Token": AC_KEY!,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}

async function resolveListId(listIdOrName: string): Promise<string | null> {
  if (/^\d+$/.test(listIdOrName)) return listIdOrName;

  const search = await acFetch(`lists?filters[name]=${encodeURIComponent(listIdOrName)}`);
  if (search.ok) {
    const data = await search.json();
    const match = data.lists?.find(
      (l: any) => l.name.toLowerCase() === listIdOrName.toLowerCase()
    );
    if (match) return match.id;
  }
  console.error(`AC list lookup failed for "${listIdOrName}"`);
  return null;
}

async function resolveTagId(name: string): Promise<string | null> {
  // Search for existing tag
  const search = await acFetch(`tags?search=${encodeURIComponent(name)}`);
  if (search.ok) {
    const data = await search.json();
    const match = data.tags?.find(
      (t: any) => t.tag.toLowerCase() === name.toLowerCase()
    );
    if (match) return match.id;
  }

  // Create tag if not found
  const create = await acFetch("tags", {
    method: "POST",
    body: JSON.stringify({ tag: { tag: name, tagType: "contact" } }),
  });
  if (create.ok) {
    const data = await create.json();
    return data.tag?.id ?? null;
  }

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!AC_URL || !AC_KEY) {
    return res.status(500).json({ error: "ActiveCampaign not configured" });
  }

  const { email, firstName, listId, tags } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: "Email and first name are required" });
  }

  // 1. Create or update contact
  const contactRes = await acFetch("contact/sync", {
    method: "POST",
    body: JSON.stringify({
      contact: { email, firstName },
    }),
  });

  if (!contactRes.ok) {
    const err = await contactRes.text();
    console.error("AC contact/sync failed:", err);
    return res.status(502).json({ error: "Failed to create contact" });
  }

  const contactData = await contactRes.json();
  const contactId = contactData.contact?.id;

  if (!contactId) {
    return res.status(502).json({ error: "No contact ID returned" });
  }

  // 2. Subscribe to list (non-fatal)
  if (listId) {
    try {
      const resolvedListId = await resolveListId(listId);
      if (resolvedListId) {
        const listRes = await acFetch("contactLists", {
          method: "POST",
          body: JSON.stringify({
            contactList: { list: resolvedListId, contact: contactId, status: 1 },
          }),
        });
        if (!listRes.ok) {
          console.error("AC contactLists failed:", await listRes.text());
        }
      }
    } catch (err) {
      console.error("AC contactLists error:", err);
    }
  }

  // 3. Add tags (non-fatal)
  if (tags) {
    const tagNames = tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);

    for (const name of tagNames) {
      try {
        const tagId = await resolveTagId(name);
        if (tagId) {
          const tagRes = await acFetch("contactTags", {
            method: "POST",
            body: JSON.stringify({
              contactTag: { contact: contactId, tag: tagId },
            }),
          });
          if (!tagRes.ok) {
            console.error(`AC contactTags failed for "${name}":`, await tagRes.text());
          }
        }
      } catch (err) {
        console.error(`AC tag error for "${name}":`, err);
      }
    }
  }

  return res.status(200).json({ success: true });
}
