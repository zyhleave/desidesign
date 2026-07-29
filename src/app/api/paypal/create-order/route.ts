import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API_BASE =
  process.env.PAYPAL_ENVIRONMENT === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function POST(req: NextRequest) {
  try {
    const { styleId, styleName } = await req.json();

    if (!styleId || !styleName) {
      return NextResponse.json({ error: "Missing styleId or styleName" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `DesiDesign HD Card - ${styleName}`,
          amount: {
            currency_code: "USD",
            value: "2.99",
          },
          custom_id: styleId, // passed back on capture — used to re-generate HD
        },
      ],
    };

    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": crypto.randomUUID(),
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `PayPal create-order failed: ${err}` }, { status: 502 });
    }

    const order = await res.json();
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("[paypal/create-order]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
