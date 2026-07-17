import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const SAVE_DIR = path.join(process.cwd(), "public", "generated");
const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8",
};

export async function GET(request: Request) {
  const filename = new URL(request.url).searchParams.get("file") || "";
  const extension = path.extname(filename).toLowerCase();
  if (path.basename(filename) !== filename || !CONTENT_TYPES[extension]) {
    return NextResponse.json({ error: "Invalid image filename." }, { status: 400 });
  }

  try {
    const image = await readFile(path.join(SAVE_DIR, filename));
    return new NextResponse(image, {
      headers: { "Content-Type": CONTENT_TYPES[extension], "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}