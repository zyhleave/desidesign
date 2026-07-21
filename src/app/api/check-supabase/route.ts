import { NextResponse } from "next/server"

export async function GET() {
  const results: Record<string, unknown> = {}

  // 1. DNS 解析
  try {
    const url = new URL("https://csvlqtrzmscrumeuyvqip.supabase.co/auth/v1/health")
    results.dns = url.hostname
  } catch (e) {
    results.dns_error = String(e)
  }

  // 2. HTTP 连接
  try {
    const res = await fetch("https://csvlqtrzmscrumeuyvqip.supabase.co/auth/v1/health", {
      signal: AbortSignal.timeout(10000),
    })
    results.supabase_status = res.status
    results.supabase_ok = res.ok
  } catch (e) {
    results.supabase_error = String(e)
  }

  // 3. Supabase client 版本
  try {
    const { version } = require("@supabase/ssr/package.json")
    results.supabase_ssr_version = version
  } catch {
    results.supabase_ssr_version = "not found"
  }

  return NextResponse.json(results)
}
