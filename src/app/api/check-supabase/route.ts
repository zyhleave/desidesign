import { NextResponse } from "next/server"

export async function GET() {
  const results: Record<string, unknown> = {}

  async function testUrl(label: string, url: string) {
    try {
      const start = Date.now()
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
      const text = await res.text().catch(() => "(body not text)")
      results[label] = {
        status: res.status,
        ok: res.ok,
        ms: Date.now() - start,
        body: text.slice(0, 200),
      }
    } catch (e) {
      results[label] = String(e)
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  await testUrl("supabase_health", `${supabaseUrl}/auth/v1/health`)
  await testUrl("supabase_rest", `${supabaseUrl}/rest/v1/`)
  await testUrl("google", "https://accounts.google.com/.well-known/openid-configuration")
  await testUrl("github", "https://api.github.com")

  return NextResponse.json(results)
}
