import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? `https://${process.env.VERCEL_URL ?? "localhost:3000"}`}/auth/callback`,
    },
  })
  if (data.url) {
    return NextResponse.redirect(data.url)
  }
  return NextResponse.redirect("/")
}
