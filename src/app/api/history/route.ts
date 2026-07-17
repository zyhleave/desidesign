import { readdir, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const SAVE_DIR = path.join(process.cwd(), "public", "generated");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);

export async function GET() {
  try {
    const names = await readdir(SAVE_DIR);
    const items = await Promise.all(names.filter((name) => ALLOWED.has(path.extname(name).toLowerCase())).map(async (name) => {
      const info = await stat(path.join(SAVE_DIR, name));
      return { id: path.parse(name).name, url: `/api/image?file=${encodeURIComponent(name)}`, kind: name.startsWith("preview-") ? "preview" : "ai", createdAt: info.mtime.toISOString() };
    }));
    items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return NextResponse.json({ items: items.slice(0, 50) });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
