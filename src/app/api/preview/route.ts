import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp from "sharp";

function escapeXml(value: unknown): string {
  return String(value ?? "").replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[char] ?? char));
}

function firework(x: number, y: number, R: number, color: string): string {
  let s = `<g stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-opacity=".85">`;
  const rays = 14;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const x1 = x + Math.cos(a) * R * 0.35, y1 = y + Math.sin(a) * R * 0.35;
    const x2 = x + Math.cos(a) * R, y2 = y + Math.sin(a) * R;
    s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    s += `<circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="2.2" fill="${color}" stroke="none"/>`;
  }
  return s + `</g>`;
}

function diya(x: number, y: number, s: number): string {
  const w = 22 * s, h = 11 * s;
  return `<g transform="translate(${x},${y})">` +
    `<path d="M${-w} 0 Q0 ${h * 1.5} ${w} 0 Q0 ${h * 0.7} ${-w} 0Z" fill="#e8b84b"/>` +
    `<path d="M${-w * 0.7} 0 Q0 ${h * 1.1} ${w * 0.7} 0 Z" fill="#ffd97a" fill-opacity=".7"/>` +
    `<path d="M0 ${-h * 0.2} C${-5 * s} ${-h * 1.4} 0 ${-h * 2.4} 0 ${-h * 2.4} C0 ${-h * 2.4} ${5 * s} ${-h * 1.4} 0 ${-h * 0.2}Z" fill="#ff9d3c"/>` +
    `<path d="M0 ${-h * 0.6} C${-2 * s} ${-h * 1.4} 0 ${-h * 1.9} 0 ${-h * 1.9} C0 ${-h * 1.9} ${2 * s} ${-h * 1.4} 0 ${-h * 0.6}Z" fill="#ffd97a"/>` +
    `</g>`;
}

function mandalaRing(cx: number, cy: number, r: number, count: number, color: string): string {
  let s = `<g fill="none" stroke="${color}" stroke-width="1.2" stroke-opacity=".55">`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${(r - 14).toFixed(1)}" stroke-opacity=".3"/>`;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="${color}" stroke="none" fill-opacity=".6"/>`;
  }
  return s + `</g>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const background = ["Fireworks", "Diyas", "Rangoli"].includes(body.background) ? body.background : "Fireworks";
    const greetingValue = String(body.greeting || "Happy Diwali").slice(0, 72);
    const words = greetingValue.split(/\s+/);
    const greetingLines = words.reduce<string[]>((lines, word) => {
      const current = lines.at(-1) || "";
      if (lines.length < 2 && current && `${current} ${word}`.length > 34) lines.push(word);
      else if (lines.length === 0) lines.push(word);
      else lines[lines.length - 1] = `${current} ${word}`;
      return lines;
    }, []).slice(0, 2).map(escapeXml);
    const name = escapeXml(String(body.name || "").slice(0, 40));
    const id = `preview-${Date.now()}-${randomUUID().slice(0, 8)}`;

    const GOLD = "#e8b84b";
    const GOLD_LT = "#ffd97a";

    let decorations = `<circle cx="256" cy="208" r="152" fill="url(#glow)"/>`;
    decorations += mandalaRing(256, 208, 170, 24, GOLD);
    if (background === "Fireworks") {
      decorations += firework(118, 92, 72, GOLD_LT) + firework(398, 78, 60, GOLD) + firework(256, 52, 48, GOLD_LT);
      decorations += diya(160, 470, 0.85) + diya(256, 480, 1.0) + diya(352, 470, 0.85);
    } else if (background === "Diyas") {
      decorations += firework(256, 64, 42, GOLD_LT);
      decorations += diya(118, 472, 0.9) + diya(194, 482, 1.05) + diya(256, 488, 1.15) + diya(318, 482, 1.05) + diya(394, 472, 0.9);
    } else {
      decorations += firework(108, 88, 54, GOLD) + firework(404, 92, 54, GOLD);
      decorations += mandalaRing(256, 452, 56, 16, GOLD_LT);
      decorations += diya(256, 480, 1.0);
    }

    const bgColor = "#2a1245";
    const bgColorEnd = "#120a22";
    const photoBlock = body.photo
      ? `<image href="${escapeXml(body.photo)}" x="128" y="80" width="256" height="256" preserveAspectRatio="xMidYMid slice" clip-path="url(#circle-clip)" opacity="0.92"/>`
      : "";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="${bgColor}"/><stop offset="1" stop-color="${bgColorEnd}"/></radialGradient><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#f5c542" stop-opacity=".30"/><stop offset="1" stop-color="#f5c542" stop-opacity="0"/></radialGradient><clipPath id="circle-clip"><circle cx="256" cy="208" r="128"/></clipPath></defs><rect width="512" height="512" fill="url(#bg)"/>${decorations}${photoBlock}<circle cx="256" cy="208" r="128" fill="none" stroke="${GOLD}" stroke-width="5"/><circle cx="256" cy="208" r="135" fill="none" stroke="${GOLD}" stroke-width="1.5" stroke-opacity=".5"/><rect x="28" y="28" width="456" height="456" rx="22" fill="none" stroke="${GOLD}" stroke-opacity=".35" stroke-width="2"/><g text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"><text x="256" y="392" font-size="27" font-weight="700" fill="#f7e3a1">${greetingLines.map((line, index) => `<tspan x="256" dy="${index === 0 ? 0 : 33}">${line}</tspan>`).join("")}</text><text x="256" y="446" font-size="16" fill="${GOLD}" fill-opacity=".9">${name}</text></g><text x="500" y="506" text-anchor="end" fill="${GOLD}" fill-opacity=".55" font-family="Arial" font-size="10">desidesign.me</text></svg>`;

    // Convert SVG → PNG and return as a data URL (works on Cloudflare Pages / any host,
    // no server-side file storage needed for download + history)
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    const url = `data:image/png;base64,${pngBuffer.toString("base64")}`;

    return NextResponse.json(
      { id, url, kind: "preview", width: 512, height: 512, hasPhoto: !!body.photo },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/preview]", err);
    return NextResponse.json(
      { error: "Preview generation failed. Please try again." },
      { status: 500 }
    );
  }
}
