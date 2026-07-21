import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let credits = 0
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single()
    if (profile) credits = profile.credits
  }

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-2xl text-amber-700">
              {(user.email ?? "?")[0].toUpperCase()}
            </div>
          )}
          <h1 className="text-xl font-semibold">{user.user_metadata?.full_name ?? "User"}</h1>
        </div>

        <dl className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-2">
            <dt className="text-stone-500">Email</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-stone-500">Credits</dt>
            <dd className="font-medium">{credits} credits</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-stone-500">Provider</dt>
            <dd className="font-medium capitalize">{user.app_metadata?.provider ?? "—"}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/auth/logout"
            className="text-center w-full py-2.5 rounded-lg border border-stone-300 text-sm hover:bg-stone-50 transition-colors"
          >
            Sign Out
          </Link>
          <Link
            href="/"
            className="text-center text-sm text-stone-500 hover:text-stone-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
