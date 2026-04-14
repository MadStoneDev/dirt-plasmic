import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

async function resolveCustomFieldId(title: string): Promise<string | null> {
  const search = await acFetch(`fields?search=${encodeURIComponent(title)}`);
  if (search.ok) {
    const data = await search.json();
    console.log(`AC field search for "${title}" returned:`, data.fields?.map((f: any) => ({ id: f.id, title: f.title })));
    const match = data.fields?.find(
      (f: any) => f.title.toLowerCase() === title.toLowerCase()
    );
    if (match) return match.id;
  } else {
    console.error(`AC field search failed for "${title}":`, await search.text());
  }

  // Create field if not found (type "textarea" for message, "text" for others)
  const isLongText = title.toLowerCase().includes("message");
  const perstag = title.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  const create = await acFetch("fields", {
    method: "POST",
    body: JSON.stringify({
      field: {
        title,
        type: isLongText ? "textarea" : "text",
        perstag,
        visible: 1,
      },
    }),
  });
  if (create.ok) {
    const data = await create.json();
    console.log(`AC field auto-created "${title}":`, data.field?.id);
    return data.field?.id ?? null;
  } else {
    console.error(`AC field auto-create failed for "${title}":`, await create.text());
  }

  return null;
}

async function setCustomFieldValue(
  contactId: string,
  fieldTitle: string,
  value: string
): Promise<void> {
  const fieldId = await resolveCustomFieldId(fieldTitle);
  if (!fieldId) return;

  const res = await acFetch("fieldValues", {
    method: "POST",
    body: JSON.stringify({
      fieldValue: { contact: contactId, field: fieldId, value },
    }),
  });
  if (!res.ok) {
    console.error(`AC fieldValues failed for "${fieldTitle}":`, await res.text());
  }
}

async function resolveListId(listIdOrName: string): Promise<string | null> {
  // If it's already numeric, return as-is
  if (/^\d+$/.test(listIdOrName)) return listIdOrName;

  // Otherwise look up by name
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
  const search = await acFetch(`tags?search=${encodeURIComponent(name)}`);
  if (search.ok) {
    const data = await search.json();
    const match = data.tags?.find(
      (t: any) => t.tag.toLowerCase() === name.toLowerCase()
    );
    if (match) return match.id;
  }

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

interface ContactBody {
  name: string;
  email: string;
  company?: string;
  heardAbout?: string;
  referralName?: string;
  message: string;
  mode?: "smtp" | "activecampaign";
  listId?: string;
  tags?: string;
  subscribeToNewsletter?: boolean;
  newsletterTags?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    company,
    heardAbout,
    referralName,
    message,
    mode = "smtp",
    listId,
    tags,
    subscribeToNewsletter,
    newsletterTags,
  } = req.body as ContactBody;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required" });
  }

  // ── SMTP mode (Resend) ──────────────────────────────────────
  if (mode === "smtp") {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Email sending not configured" });
    }

    const heardLine = heardAbout
      ? `How they heard about us: ${heardAbout}${
          referralName ? ` (Referred by: ${referralName})` : ""
        }`
      : "";

    // Send notification to DIRT
    const notificationResult = await resend.emails.send({
      from: "DIRT Contact Form <no-reply@thedirtagency.com>",
      to: "hello@thedirtagency.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#FAFAF2;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF2;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background-color:#5C0004;padding:32px 40px;text-align:center;">
          <img src="https://www.wearethedirt.com/logo.png" alt="DIRT" width="120" style="display:inline-block;" />
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:#FFFFFF;padding:40px;">
          <h1 style="margin:0 0 24px;font-size:24px;color:#5C0004;">New Contact Form Submission</h1>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#30261D;line-height:1.6;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #FAFAF2;"><strong>Name:</strong></td><td style="padding:8px 0;border-bottom:1px solid #FAFAF2;">${name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #FAFAF2;"><strong>Email:</strong></td><td style="padding:8px 0;border-bottom:1px solid #FAFAF2;"><a href="mailto:${email}" style="color:#FE5C02;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;border-bottom:1px solid #FAFAF2;"><strong>Company:</strong></td><td style="padding:8px 0;border-bottom:1px solid #FAFAF2;">${company}</td></tr>` : ""}
            ${heardLine ? `<tr><td colspan="2" style="padding:8px 0;border-bottom:1px solid #FAFAF2;">${heardLine}</td></tr>` : ""}
          </table>
          <div style="margin-top:24px;padding:20px;background-color:#FAFAF2;border-left:4px solid #FE5C02;">
            <p style="margin:0 0 8px;font-size:13px;color:#5C0004;text-transform:uppercase;font-weight:bold;letter-spacing:1px;">Message</p>
            <p style="margin:0;font-size:15px;color:#30261D;line-height:1.6;">${message.replace(/\n/g, "<br />")}</p>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background-color:#5C0004;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#FAFAF2;opacity:0.6;">This message was sent from the contact form at thedirtagency.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim(),
    });

    if (notificationResult.error) {
      console.error("Resend notification email failed:", notificationResult.error);
      return res.status(502).json({ error: "Failed to send notification email" });
    }

    // Send thank-you to the user
    const thankYouResult = await resend.emails.send({
      from: "DIRT Agency <no-reply@thedirtagency.com>",
      to: email,
      subject: "Thanks for reaching out to DIRT!",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#FAFAF2;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF2;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background-color:#5C0004;padding:32px 40px;text-align:center;">
          <img src="https://www.wearethedirt.com/logo.png" alt="DIRT" width="120" style="display:inline-block;" />
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:#FFFFFF;padding:40px;text-align:center;">
          <h1 style="margin:0 0 16px;font-size:28px;color:#5C0004;">Thanks for reaching out, ${name}!</h1>
          <p style="margin:0 0 24px;font-size:16px;color:#30261D;line-height:1.6;">We&rsquo;ve received your message and one of the DIRT crew will be in touch soon.</p>
          <div style="width:60px;height:3px;background-color:#FE5C02;margin:0 auto 24px;"></div>
          <p style="margin:0 0 32px;font-size:15px;color:#30261D;line-height:1.6;">In the meantime, feel free to check out what we&rsquo;re up to:</p>
          <a href="https://thedirtagency.com" style="display:inline-block;padding:14px 32px;background-color:#FE5C02;color:#5C0004;font-size:16px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">Visit DIRT</a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background-color:#5C0004;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 8px;font-size:12px;color:#FAFAF2;opacity:0.6;">&copy; ${new Date().getFullYear()} DIRT Agency. All rights reserved.</p>
          <p style="margin:0;font-size:12px;color:#FAFAF2;opacity:0.6;">Built from the ground up.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim(),
    });

    if (thankYouResult.error) {
      console.error("Resend thank-you email failed:", thankYouResult.error);
      // Non-fatal — notification already sent
    }

    return res.status(200).json({ success: true });
  }

  // ── ActiveCampaign mode ─────────────────────────────────────
  if (mode === "activecampaign") {
    if (!AC_URL || !AC_KEY) {
      return res.status(500).json({ error: "ActiveCampaign not configured" });
    }

    // 1. Create or update contact
    const contactRes = await acFetch("contact/sync", {
      method: "POST",
      body: JSON.stringify({
        contact: {
          email,
          firstName: name,
        },
      }),
    });

    if (!contactRes.ok) {
      console.error("AC contact/sync failed:", await contactRes.text());
      return res.status(502).json({ error: "Failed to create contact" });
    }

    const contactData = await contactRes.json();
    const contactId = contactData.contact?.id;

    if (!contactId) {
      return res.status(502).json({ error: "No contact ID returned" });
    }

    // 2. Set custom fields (non-fatal)
    const customFields: [string, string | undefined][] = [
      ["Company Name", company],
      ["Heard About", heardAbout],
      ["Referral Name", referralName],
      ["Message", message],
    ];
    for (const [title, value] of customFields) {
      if (value) {
        try {
          await setCustomFieldValue(contactId, title, value);
        } catch (err) {
          console.error(`AC custom field error for "${title}":`, err);
        }
      }
    }

    // 3. Subscribe to list (non-fatal)
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

    // 4. Add tags (non-fatal) — includes newsletter tags when opted in
    const combinedTags = [
      tags,
      subscribeToNewsletter ? newsletterTags : undefined,
    ]
      .filter(Boolean)
      .join(",");
    if (combinedTags) {
      const tagNames = combinedTags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);

      for (const tagName of tagNames) {
        try {
          const tagId = await resolveTagId(tagName);
          if (tagId) {
            const tagRes = await acFetch("contactTags", {
              method: "POST",
              body: JSON.stringify({
                contactTag: { contact: contactId, tag: tagId },
              }),
            });
            if (!tagRes.ok) {
              console.error(
                `AC contactTags failed for "${tagName}":`,
                await tagRes.text()
              );
            }
          }
        } catch (err) {
          console.error(`AC tag error for "${tagName}":`, err);
        }
      }
    }

    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Invalid mode" });
}
