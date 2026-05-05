const CLICKUP_API = "https://api.clickup.com/api/v2";
const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
const CLICKUP_TASK_STATUS = process.env.CLICKUP_TASK_STATUS ?? "to do";

// Form field key → ClickUp custom field title (case-insensitive match).
// Edit if any titles differ in the Enquiry space.
const FIELD_TITLES: Record<string, string> = {
  name: "Name",
  email: "Contact Person Email Address",
  company: "Company",
  website: "Website",
  heardAbout: "How did you hear about us?",
  referralName: "Referral Name",
};

interface ClickUpField {
  id: string;
  name: string;
  type: string;
  type_config?: {
    options?: Array<{ id: string; name: string }>;
  };
}

let fieldsCache: Map<string, ClickUpField> | null = null;

async function clickupFetch(path: string, options?: RequestInit) {
  return fetch(`${CLICKUP_API}${path}`, {
    ...options,
    headers: {
      Authorization: CLICKUP_API_TOKEN!,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}

async function loadFields(): Promise<Map<string, ClickUpField>> {
  if (fieldsCache) return fieldsCache;
  const res = await clickupFetch(`/list/${CLICKUP_LIST_ID}/field`);
  if (!res.ok) {
    console.error("ClickUp field list failed:", await res.text());
    return new Map();
  }
  const data = await res.json();
  const map = new Map<string, ClickUpField>();
  for (const f of data.fields ?? []) {
    map.set(String(f.name).toLowerCase(), f);
  }
  fieldsCache = map;
  return map;
}

function buildCustomFieldEntry(
  field: ClickUpField,
  rawValue: string
): { id: string; value: unknown } | null {
  if (!rawValue) return null;
  if (field.type === "drop_down" || field.type === "labels") {
    const option = field.type_config?.options?.find(
      (o) => o.name.toLowerCase() === rawValue.toLowerCase()
    );
    if (!option) {
      console.warn(
        `ClickUp option "${rawValue}" not found on field "${field.name}"`
      );
      return null;
    }
    return {
      id: field.id,
      value: field.type === "labels" ? [option.id] : option.id,
    };
  }
  return { id: field.id, value: rawValue };
}

export interface ClickUpContactPayload {
  name: string;
  email: string;
  company?: string;
  website?: string;
  heardAbout?: string;
  referralName?: string;
  message: string;
}

export async function createClickUpContactTask(
  payload: ClickUpContactPayload
): Promise<void> {
  if (!CLICKUP_API_TOKEN || !CLICKUP_LIST_ID) {
    return;
  }

  const fields = await loadFields();
  const customFields: Array<{ id: string; value: unknown }> = [];

  for (const [key, title] of Object.entries(FIELD_TITLES)) {
    const value = payload[key as keyof ClickUpContactPayload];
    if (!value) continue;
    const field = fields.get(title.toLowerCase());
    if (!field) {
      console.warn(
        `ClickUp custom field "${title}" not found on list ${CLICKUP_LIST_ID}`
      );
      continue;
    }
    const entry = buildCustomFieldEntry(field, value);
    if (entry) customFields.push(entry);
  }

  const body = {
    name: `New enquiry — ${payload.name}${
      payload.company ? ` (${payload.company})` : ""
    }`,
    description: payload.message,
    status: CLICKUP_TASK_STATUS,
    custom_fields: customFields,
  };

  const res = await clickupFetch(`/list/${CLICKUP_LIST_ID}/task`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("ClickUp task create failed:", await res.text());
    return;
  }

  const data = await res.json();
  console.log(`ClickUp task created: ${data.id} for ${payload.email}`);
}
