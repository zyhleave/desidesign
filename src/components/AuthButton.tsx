"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { CircleUserRound } from "lucide-react"
import Link from "next/link"

export default function AuthButton() {
  const [user, setUser] = useState<{ email?: string; avatarUrl?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          email: data.user.email,
          avatarUrl: data.user.user_metadata?.avatar_url,
        })
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function signInWithGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  if (loading) return null

  if (user) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        title={user.email}
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="w-7 h-7 rounded-full" />
        ) : (
          <CircleUserRound size={20} />
        )}
        <span className="hidden sm:inline">Account</span>
      </Link>
    )
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors px-1"
    >
      Sign In
    </button>
  )
}
