"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface WaitlistModalProps {
  onClose: () => void
}

export default function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus() }, [])

  function fireGA() {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
    if (typeof win.gtag === "function") {
      win.gtag("event", "waitlist_signup", { method: "email" })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      // Replace FORM_ID with your Formspree form ID from https://formspree.io
      const FORM_ID = "maqrpyab"
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
        fireGA()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data?.errors?.[0]?.message || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "44px 36px 36px",
        maxWidth: "420px",
        width: "92%",
        textAlign: "center",
        boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
        position: "relative",
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none", cursor: "pointer",
            color: "#a8a29e", padding: 4,
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #ea580c)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28,
            }}>
              ✨
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1c1917", marginBottom: 10 }}>
              You&apos;re on the list!
            </h2>
            <p style={{ fontSize: 15, color: "#78716c", lineHeight: 1.65 }}>
              We&apos;ll email you the moment HD, watermark-free images go live.<br />
              Stay tuned!
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 24, padding: "11px 28px",
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}
            >
              Got it!
            </button>
          </>
        ) : (
          <>
            {/* Sparkle icon */}
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px", fontSize: 26,
            }}>
              ✨
            </div>

            <h2 style={{ fontSize: 23, fontWeight: 700, color: "#1c1917", marginBottom: 8 }}>
              HD, watermark-free images<br />are almost here.
            </h2>
            <p style={{ fontSize: 14, color: "#78716c", lineHeight: 1.65, marginBottom: 26 }}>
              Drop your email — we&apos;ll unlock it for you<br />the moment it&apos;s live.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                placeholder="your@email.com"
                required
                style={{
                  width: "100%", padding: "13px 16px",
                  border: `1.5px solid ${error ? "#ef4444" : "#e7e5e4"}`,
                  borderRadius: 10, fontSize: 15,
                  outline: "none", boxSizing: "border-box",
                  marginBottom: error ? 8 : 12,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#f59e0b" }}
                onBlur={(e) => { e.target.style.borderColor = error ? "#ef4444" : "#e7e5e4" }}
              />
              {error && (
                <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 10, textAlign: "left" }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "13px",
                  background: loading ? "#fcd34d" : "linear-gradient(135deg, #f59e0b, #ea580c)",
                  color: "white", border: "none", borderRadius: 10,
                  fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? "Submitting..." : "Notify me →"}
              </button>
            </form>

            <p style={{ marginTop: 14, fontSize: 12, color: "#a8a29e" }}>
              Free forever. No spam, ever.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
