import { NextResponse } from "next/server";
import { saveFile, fileExists } from "@/lib/storage";

export async function GET(request: Request) {
  const apiKey = process.env.EVOLINK_API_KEY;
  const taskId = new URL(request.url).searchParams.get("taskId");
  if (!apiKey) return NextResponse.json({ error: "EVOLINK_API_KEY is not configured." }, { status: 500 });
  if (!taskId || !/^[a-zA-Z0-9_-]+$/.test(taskId)) return NextResponse.json({ error: "A valid task ID is required." }, { status: 400 });

  const response = await fetch(`https://api.evolink.ai/v1/tasks/${encodeURIComponent(taskId)}`, {
    headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.error?.message || data?.message || `Task lookup failed (${response.status}).` }, { status: response.status });
  if (data?.error?.message) return NextResponse.json({ status: "failed", error: data.error.message });

  if (data?.status === "completed" && data?.results?.[0]) {
    const imgUrl = data.results[0];
    const ext = ".jpg";
    const filename = `${taskId}${ext}`;

    if (!(await fileExists(filename))) {
      try {
        const imgRes = await fetch(imgUrl);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        await saveFile(filename, buffer);
      } catch {
        return NextResponse.json({ status: "completed", progress: 100, results: [imgUrl], local: false });
      }
    }
    return NextResponse.json({ status: "completed", progress: 100, results: [`/api/image?file=${encodeURIComponent(filename)}`], local: true });
  }

  return NextResponse.json({ status: data?.status, progress: data?.progress ?? 0, results: [] });
}