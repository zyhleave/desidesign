"use client";

import { useEffect, useRef, useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  /** styleId passed through so the server knows which HD image to generate */
  styleId: string;
  styleName: string;
  /** Base64 data URL of the current preview image — used as a reference */
  previewDataUrl: string;
  onClose: () => void;
  onSuccess: (hdBlob: Blob, filename: string) => void;
}

type Step = "idle" | "loading" | "error";

export default function PaymentModal({ styleId, styleName, previewDataUrl, onClose, onSuccess }: PaymentModalProps) {
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const buttonsRendered = useRef(false);

  // Fire GA event on open
  useEffect(() => {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    win.gtag?.("event", "hd_payment_open", { style_id: styleId });
  }, [styleId]);

  // Load PayPal JS SDK and render buttons
  useEffect(() => {
    if (buttonsRendered.current) return;
    buttonsRendered.current = true;

    const container = paypalContainerRef.current;
    if (!container) return;

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? process.env.PAYPAL_CLIENT_ID;
    if (!clientId) {
      setErrorMsg("PayPal is not configured. Please contact support.");
      setStep("error");
      return;
    }

    // Load PayPal script if not already loaded
    const scriptId = "paypal-sdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&locale=en_US`;
      script.onload = () => renderButtons(container, clientId);
      document.head.appendChild(script);
    } else {
      renderButtons(container, clientId);
    }
  }, []);

  function renderButtons(container: HTMLDivElement, clientId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paypal = (window as any).paypal;
    if (!paypal) {
      setErrorMsg("Failed to load PayPal SDK. Please refresh and try again.");
      setStep("error");
      return;
    }

    paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "pay",
      },
      async onApprove(data: { orderID: string }) {
        setStep("loading");
        setErrorMsg(null);
        try {
          // Capture the order on our server
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          const json = await res.json();
          if (!res.ok || json.error) {
            throw new Error(json.error || "Payment capture failed");
          }

          // GA success
          const win = window as unknown as { gtag?: (...args: unknown[]) => void };
          win.gtag?.("event", "hd_payment_success", { style_id: styleId, order_id: data.orderID });

          // Download HD image — the capture endpoint already re-generated the HD image
          // For now, use the preview as the "HD" (MVP placeholder — full HD generation comes next PR)
          // TODO: call /api/paypal/download-hd with orderId → returns signed blob URL
          const a = document.createElement("a");
          a.href = previewDataUrl;
          a.download = `desidesign-${styleId}-hd.png`;
          a.click();

          onSuccess(new Blob([await fetch(previewDataUrl).then(r => r.blob())], { type: "image/png" }), `desidesign-${styleId}-hd.png`);
          onClose();
        } catch (err) {
          setStep("error");
          setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
      },
      onError(err: unknown) {
        setStep("error");
        setErrorMsg("Payment failed. Please try again or contact support.");
        console.error("[PayPal onError]", err);
      },
      createOrder() {
        // Create order when user clicks PayPal button
        return fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ styleId, styleName }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.error) throw new Error(data.error);
            return data.id;
          })
          .catch((err) => {
            setStep("error");
            setErrorMsg(err instanceof Error ? err.message : "Could not initiate payment.");
            throw err; // Re-throw so PayPal SDK knows it failed
          });
      },
    }).render(container);
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "44px 36px 36px",
        maxWidth: "400px",
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

        {/* Icon */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "linear-gradient(135deg, #f59e0b, #ea580c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 18px", fontSize: 26,
        }}>
          ✨
        </div>

        <h2 style={{ fontSize: 23, fontWeight: 700, color: "#1c1917", marginBottom: 8 }}>
          Unlock HD, watermark-free
        </h2>
        <p style={{ fontSize: 14, color: "#78716c", lineHeight: 1.65, marginBottom: 20 }}>
          Download <strong>{styleName}</strong> in full resolution — no watermark, no DesiDesign label.
        </p>

        {/* Price tag */}
        <div style={{
          display: "inline-block",
          background: "#fef3c7",
          border: "1.5px solid #f59e0b",
          borderRadius: 10,
          padding: "8px 20px",
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#ea580c" }}>$2.99</span>
          <span style={{ fontSize: 13, color: "#92400e", marginLeft: 6 }}>one-time</span>
        </div>

        {/* PayPal buttons container */}
        {step !== "error" && (
          <div
            ref={paypalContainerRef}
            style={{ minHeight: 150, marginBottom: 16 }}
          />
        )}

        {/* Loading */}
        {step === "loading" && (
          <div style={{ color: "#78716c", fontSize: 14, marginBottom: 16 }}>
            ⏳ Processing your payment...
          </div>
        )}

        {/* Error */}
        {step === "error" && errorMsg && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 16,
            color: "#dc2626",
            fontSize: 14,
          }}>
            {errorMsg}
          </div>
        )}

        <p style={{ marginTop: 12, fontSize: 12, color: "#a8a29e" }}>
          🔒 Secured by PayPal · Instant delivery
        </p>
      </div>
    </div>
  );
}
