// Storage abstraction: local fs (dev) vs Cloudflare R2 (production)
// In Cloudflare Pages, the R2 bucket is available via process.env.R2_BUCKET
// (injected by @cloudflare/next-on-pages at runtime)

import { mkdir, writeFile, readFile, readdir, stat } from "fs/promises";
import path from "path";

const SAVE_DIR = path.join(process.cwd(), "public", "generated");

export type FileInfo = {
  name: string;
  size: number;
  mtime: Date;
  kind: "preview" | "ai";
  url: string;
};

// Get R2 binding if running on Cloudflare
function getR2(): { put: (k: string, v: string | Buffer) => Promise<void>; get: (k: string) => Promise<{ arrayBuffer: () => Promise<ArrayBuffer> } | null>; list: () => Promise<{ objects: Array<{ key: string; size: number; uploaded: string }> }>; head: (k: string) => Promise<object | null> } | null {
  try {
    const binding = (process.env as Record<string, unknown>).R2_BUCKET;
    if (binding && typeof binding === "object") {
      return binding as ReturnType<typeof getR2>;
    }
  } catch {}
  return null;
}

export async function saveFile(filename: string, data: string | Buffer): Promise<void> {
  const r2 = getR2();
  if (r2) {
    await r2.put(filename, data);
    return;
  }
  await mkdir(SAVE_DIR, { recursive: true });
  await writeFile(path.join(SAVE_DIR, filename), data);
}

export async function readFileBytes(filename: string): Promise<Buffer | null> {
  const r2 = getR2();
  if (r2) {
    const obj = await r2.get(filename);
    if (!obj) return null;
    return Buffer.from(await obj.arrayBuffer());
  }
  try {
    return await readFile(path.join(SAVE_DIR, filename));
  } catch {
    return null;
  }
}

export async function fileExists(filename: string): Promise<boolean> {
  const r2 = getR2();
  if (r2) {
    const obj = await r2.head(filename);
    return !!obj;
  }
  try {
    await stat(path.join(SAVE_DIR, filename));
    return true;
  } catch {
    return false;
  }
}

export async function listFiles(): Promise<FileInfo[]> {
  const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
  const r2 = getR2();
  if (r2) {
    const objects = await r2.list();
    const items: FileInfo[] = [];
    for (const o of objects.objects) {
      if (!allowed.has(path.extname(o.key).toLowerCase())) continue;
      items.push({
        name: o.key,
        size: o.size,
        mtime: o.uploaded ? new Date(o.uploaded) : new Date(),
        kind: o.key.startsWith("preview-") ? "preview" : "ai",
        url: `/api/image?file=${encodeURIComponent(o.key)}`,
      });
    }
    items.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    return items.slice(0, 50);
  }
  try {
    await mkdir(SAVE_DIR, { recursive: true });
    const names = await readdir(SAVE_DIR);
    const items = await Promise.all(
      names.filter((n) => allowed.has(path.extname(n).toLowerCase()))
        .map(async (name) => {
          const info = await stat(path.join(SAVE_DIR, name));
          return {
            name,
            size: info.size,
            mtime: info.mtime,
            kind: (name.startsWith("preview-") ? "preview" : "ai") as "preview" | "ai",
            url: `/api/image?file=${encodeURIComponent(name)}`,
          };
        })
    );
    items.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    return items.slice(0, 50);
  } catch {
    return [];
  }
}