import { NextResponse } from "next/server";
import { readFileBytes } from "@/lib/storage";
import path from "path";

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
  const image = await readFileBytes(filename);
  if (!image) return NextResponse.json({ error: "Image not found." }, { status: 404 });
  return new NextResponse(new Uint8Array(image), {
    headers: { "Content-Type": CONTENT_TYPES[extension], "Cache-Control": "no-store" },
  });
}