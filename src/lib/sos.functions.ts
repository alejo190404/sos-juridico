import { createServerFn } from "@tanstack/react-start";

const GMAIL_GATEWAY =
  "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const SHEETS_GATEWAY =
  "https://connector-gateway.lovable.dev/google_sheets/v4";
const NOTICIAS_SHEET_ID = "1t8qBepCgi052BgH3QWSSvv8Qs0sTsgeaSZ5ZEY2gBkk";
const NOTICIAS_RANGE = "noticia!A:I";

function gatewayHeaders(connectorKey: string | undefined) {
  return {
    Authorization: `Bearer ${process.env["LOVABLE_API_KEY"]}`,
    "X-Connection-Api-Key": connectorKey ?? "",
    "Content-Type": "application/json",
  };
}

/* ---------- Gmail ---------- */

const b64 = (s: string) =>
  btoa(
    Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(
      "",
    ),
  );
const header = (v: string) =>
  /^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`;

function createRawEmail(to: string, subject: string, body: string): string {
  const email = [
    `To: ${to}`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  return b64(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      email: string;
      name: string;
      subject?: string;
      area: string;
      body: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const headers = gatewayHeaders(process.env["GOOGLE_MAIL_API_KEY"]);

    // The inbox that receives the consultation is the connected Gmail account itself.
    const profileRes = await fetch(`${GMAIL_GATEWAY}/users/me/profile`, {
      headers,
    });
    if (!profileRes.ok) {
      const text = await profileRes.text();
      console.error(`Gmail profile failed [${profileRes.status}]: ${text}`);
      throw new Error(`Provider request failed [${profileRes.status}]: ${text}`);
    }
    const profile = (await profileRes.json()) as { emailAddress: string };

    const subject = `Nueva consulta web: ${data.area} — ${data.name}`;
    const body = [
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      `Área legal: ${data.area}`,
      `Asunto: ${data.subject || "(sin asunto)"}`,
      "",
      "Descripción del caso:",
      data.body,
    ].join("\n");

    const sendRes = await fetch(`${GMAIL_GATEWAY}/users/me/messages/send`, {
      method: "POST",
      headers,
      body: JSON.stringify({ raw: createRawEmail(profile.emailAddress, subject, body) }),
    });
    if (!sendRes.ok) {
      const text = await sendRes.text();
      console.error(`Gmail send failed [${sendRes.status}]: ${text}`);
      throw new Error(`Provider request failed [${sendRes.status}]: ${text}`);
    }
    return { success: true };
  });

/* ---------- Google Sheets (noticias) ---------- */

type Noticia = Record<string, string>;

async function fetchNoticias(): Promise<Noticia[]> {
  const res = await fetch(
    `${SHEETS_GATEWAY}/spreadsheets/${NOTICIAS_SHEET_ID}/values/${NOTICIAS_RANGE}`,
    { headers: gatewayHeaders(process.env["GOOGLE_SHEETS_API_KEY"]) },
  );
  if (!res.ok) {
    const text = await res.text();
    console.error(`Sheets read failed [${res.status}]: ${text}`);
    throw new Error(`Provider request failed [${res.status}]: ${text}`);
  }
  const json = (await res.json()) as { values?: string[][] };
  const rows = json.values ?? [];
  const [head, ...data] = rows;
  if (!head) return [];
  return data.map((row) =>
    Object.fromEntries(head.map((h, i) => [h, row[i] ?? ""])),
  );
}

export const getNoticias = createServerFn({ method: "GET" }).handler(
  async () => {
    const noticias = await fetchNoticias();
    noticias.sort((a, b) =>
      (b["created_at"] || b["published_at"] || "").localeCompare(
        a["created_at"] || a["published_at"] || "",
      ),
    );
    return noticias.slice(0, 4);
  },
);

export const getNoticia = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const noticias = await fetchNoticias();
    return noticias.find((n) => n["id"] === data.id) ?? null;
  });

/* ---------- Google Sheets (casos de éxito) ---------- */

const CASOS_SHEET_ID = "1cuQPCK5SD-opYsY8xFEroo5LXL8pjOtKe4KvifgAfwc";
const CASOS_RANGE = "caso!A:E";

export const getCasos = createServerFn({ method: "GET" }).handler(
  async () => {
    const res = await fetch(
      `${SHEETS_GATEWAY}/spreadsheets/${CASOS_SHEET_ID}/values/${CASOS_RANGE}`,
      { headers: gatewayHeaders(process.env["GOOGLE_SHEETS_API_KEY"]) },
    );
    if (!res.ok) {
      const text = await res.text();
      console.error(`Sheets read failed [${res.status}]: ${text}`);
      throw new Error(`Provider request failed [${res.status}]: ${text}`);
    }
    const json = (await res.json()) as { values?: string[][] };
    const rows = json.values ?? [];
    const [head, ...data] = rows;
    if (!head) return [];
    return data.map((row) =>
      Object.fromEntries(head.map((h, i) => [h, row[i] ?? ""])),
    );
  },
);
