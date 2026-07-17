import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const SAVE_DIR = path.join(process.cwd(), "public", "generated");

function escapeXml(value: unknown) {
  return String(value ?? "").replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[char] ?? char));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const background = ["Fireworks", "Diyas", "Rangoli"].includes(body.background) ? body.background : "Fireworks";
  const greeting = escapeXml(String(body.greeting || "Happy Diwali").slice(0, 40));
  const name = escapeXml(String(body.name || "").slice(0, 40));
  const id = `preview-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const filename = `${id}.svg`;

  const decorations = background === "Diyas"
    ? `<g fill="#ffc857"><path d="M55 365 Q110 430 165 365 Q110 390 55 365Z"/><path d="M347 365 Q402 430 457 365 Q402 390 347 365Z"/></g><g fill="#fff1a8"><path d="M110 365 C85 330 105 305 110 285 C126 316 137 338 110 365Z"/><path d="M402 365 C377 330 397 305 402 285 C418 316 429 338 402 365Z"/></g>`
    : background === "Rangoli"
      ? `<g transform="translate(256 250)" fill="none" stroke-width="18"><circle r="145" stroke="#f9c74f"/><circle r="105" stroke="#f94144" stroke-dasharray="30 18"/><circle r="65" stroke="#43aa8b"/><path d="M0-160 38-75 130-92 65-18 145 35 50 42 55 140 0 72-55 140-50 42-145 35-65-18-130-92-38-75Z" stroke="#9b5de5"/></g>`
      : `<g stroke="#ffd166" stroke-width="5" fill="none"><path d="M95 65v90M50 110h90M63 78l64 64M127 78l-64 64"/><path d="M410 50v110M355 105h110M370 65l80 80M450 65l-80 80"/></g><g fill="#fff"><circle cx="62" cy="190" r="4"/><circle cx="450" cy="205" r="5"/><circle cx="220" cy="85" r="4"/><circle cx="300" cy="135" r="3"/></g>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background === "Diyas" ? "#7c241c" : background === "Rangoli" ? "#fff3dd" : "#24103d"}"/><stop offset="1" stop-color="${background === "Diyas" ? "#d95d39" : background === "Rangoli" ? "#f2a65a" : "#7b2d6f"}"/></linearGradient></defs><rect width="512" height="512" fill="url(#bg)"/>${decorations}<rect x="32" y="32" width="448" height="448" rx="18" fill="none" stroke="#fff" stroke-opacity=".28"/><g text-anchor="middle" fill="#fff" font-family="Arial,sans-serif"><text x="256" y="420" font-size="35" font-weight="700">${greeting}</text><text x="256" y="452" font-size="17">${name}</text></g><text x="256" y="490" text-anchor="middle" fill="#fff" fill-opacity=".32" font-family="Arial" font-size="12">DESIDESIGN PREVIEW</text></svg>`;

  await mkdir(SAVE_DIR, { recursive: true });
  await writeFile(path.join(SAVE_DIR, filename), svg, "utf8");
  return NextResponse.json({ id, url: `/api/image?file=${encodeURIComponent(filename)}`, kind: "preview", width: 512, height: 512 });
}
