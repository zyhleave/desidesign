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

function starField(count: number, w: number, h: number): string {
  let s = `<g fill="#fff">`;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w, y = Math.random() * h * 0.6;
    const r = 0.5 + Math.random() * 1.5;
    const o = 0.3 + Math.random() * 0.7;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill-opacity="${o.toFixed(2)}"/>`;
  }
  return s + `</g>`;
}

function bigFirework(cx: number, cy: number, R: number, petalColor: string, coreColor: string): string {
  const petals = 16;
  let s = `<g>`;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * R * 0.2, y1 = cy + Math.sin(a) * R * 0.2;
    const x2 = cx + Math.cos(a) * R, y2 = cy + Math.sin(a) * R;
    s += `<ellipse cx="${((x1+x2)/2).toFixed(1)}" cy="${((y1+y2)/2).toFixed(1)}" rx="${(R*0.12).toFixed(1)}" ry="${(R*0.55).toFixed(1)}" fill="${petalColor}" fill-opacity=".75" transform="rotate(${(a*180/Math.PI).toFixed(1)} ${((x1+x2)/2).toFixed(1)} ${((y1+y2)/2).toFixed(1)})"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(R*0.18).toFixed(1)}" fill="${coreColor}"/>`;
  return s + `</g>`;
}

function rangoliPattern(cx: number, cy: number, R: number): string {
  const colors = ["#e63946", "#f4a261", "#2a9d8f", "#9b5de5", "#f15bb5"];
  let s = `<g>`;
  for (let ring = 0; ring < 5; ring++) {
    const r = R - ring * 18;
    const petals = 12 + ring * 4;
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(8 - ring).toFixed(1)}" fill="${colors[ring % colors.length]}" fill-opacity=".85"/>`;
    }
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * 30, y1 = cy + Math.sin(a) * 30;
    const x2 = cx + Math.cos(a) * (R - 10), y2 = cy + Math.sin(a) * (R - 10);
    s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#fff" stroke-width="1.5" stroke-opacity=".4"/>`;
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

    const photoBlock = body.photo
      ? `<image href="${escapeXml(body.photo)}" x="128" y="80" width="256" height="256" preserveAspectRatio="xMidYMid slice" clip-path="url(#circle-clip)" opacity="0.95"/>`
      : "";

    let svg = "";
    if (background === "Fireworks") {
      // Starry Sparkle: Deep blue night sky, big fireworks, stars
      const bg = `<defs><radialGradient id="bg" cx="50%" cy="35%" r="80%"><stop offset="0" stop-color="#0d1b2a"/><stop offset="1" stop-color="#050a10"/></radialGradient><clipPath id="circle-clip"><circle cx="256" cy="208" r="128"/></clipPath></defs><rect width="512" height="512" fill="url(#bg)"/>`;
      const stars = starField(80, 512, 512);
      const fw = bigFirework(140, 110, 90, "#4cc9f0", "#f72585") + bigFirework(380, 85, 75, "#7209b7", "#f72585") + bigFirework(256, 55, 55, "#4895ef", "#4cc9f0");
      const frame = `<circle cx="256" cy="208" r="128" fill="none" stroke="#4cc9f0" stroke-width="4"/><circle cx="256" cy="208" r="134" fill="none" stroke="#4895ef" stroke-width="1.5" stroke-opacity=".5"/><rect x="26" y="26" width="460" height="460" rx="24" fill="none" stroke="#4cc9f0" stroke-opacity=".35" stroke-width="2"/>`;
      const text = `<g text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"><text x="256" y="390" font-size="28" font-weight="700" fill="#caf0f8">${greetingLines.map((line, index) => `<tspan x="256" dy="${index === 0 ? 0 : 34}">${line}</tspan>`).join("")}</text><text x="256" y="448" font-size="17" fill="#90e0ef" fill-opacity=".95">${name}</text></g><text x="500" y="506" text-anchor="end" fill="#90e0ef" fill-opacity=".5" font-family="Arial" font-size="10">desidesign.me</text>`;
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${bg}${stars}${fw}${photoBlock}${frame}${text}</svg>`;
    } else if (background === "Diyas") {
      // Sacred Glow: Warm temple amber/gold, big lamps, soft glow
      const bg = `<defs><radialGradient id="bg" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#8b4513"/><stop offset=".6" stop-color="#5d2e0c"/><stop offset="1" stop-color="#2a1506"/></radialGradient><radialGradient id="lampglow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd700" stop-opacity=".45"/><stop offset="1" stop-color="#ff8c00" stop-opacity="0"/></radialGradient><clipPath id="circle-clip"><circle cx="256" cy="208" r="128"/></clipPath></defs><rect width="512" height="512" fill="url(#bg)"/>`;
      const glows = `<ellipse cx="256" cy="480" rx="180" ry="40" fill="url(#lampglow)"/><circle cx="256" cy="480" r="120" fill="url(#lampglow)" fill-opacity=".5"/>`;
      const lamps = diya(90, 475, 1.1) + diya(175, 485, 1.25) + diya(256, 492, 1.4) + diya(337, 485, 1.25) + diya(422, 475, 1.1);
      const frame = `<circle cx="256" cy="208" r="128" fill="none" stroke="#ffd700" stroke-width="5"/><circle cx="256" cy="208" r="135" fill="none" stroke="#ff8c00" stroke-width="1.5" stroke-opacity=".5"/><rect x="28" y="28" width="456" height="456" rx="22" fill="none" stroke="#ffd700" stroke-opacity=".4" stroke-width="2.5"/>`;
      const text = `<g text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"><text x="256" y="390" font-size="28" font-weight="700" fill="#ffe4b5">${greetingLines.map((line, index) => `<tspan x="256" dy="${index === 0 ? 0 : 34}">${line}</tspan>`).join("")}</text><text x="256" y="448" font-size="17" fill="#ffd700" fill-opacity=".95">${name}</text></g><text x="500" y="506" text-anchor="end" fill="#ffd700" fill-opacity=".55" font-family="Arial" font-size="10">desidesign.me</text>`;
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${bg}${glows}${lamps}${photoBlock}${frame}${text}</svg>`;
    } else {
      // Mandala Blessing: Colorful rangoli, vibrant pinks/purples/oranges
      const bg = `<defs><radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#5a189a"/><stop offset="1" stop-color="#240046"/></radialGradient><clipPath id="circle-clip"><circle cx="256" cy="208" r="128"/></clipPath></defs><rect width="512" height="512" fill="url(#bg)"/>`;
      const rangoliTop = rangoliPattern(256, 208, 160);
      const rangoliBottom = `<g transform="translate(0, 280) scale(1, 0.6)">${rangoliPattern(256, 280, 90)}</g>`;
      const frame = `<circle cx="256" cy="208" r="128" fill="none" stroke="#f72585" stroke-width="5"/><circle cx="256" cy="208" r="135" fill="none" stroke="#f4a261" stroke-width="1.5" stroke-opacity=".6"/><rect x="28" y="28" width="456" height="456" rx="22" fill="none" stroke="#f72585" stroke-opacity=".4" stroke-width="2"/>`;
      const text = `<g text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"><text x="256" y="390" font-size="28" font-weight="700" fill="#ff9e00">${greetingLines.map((line, index) => `<tspan x="256" dy="${index === 0 ? 0 : 34}">${line}</tspan>`).join("")}</text><text x="256" y="448" font-size="17" fill="#f72585" fill-opacity=".95">${name}</text></g><text x="500" y="506" text-anchor="end" fill="#f72585" fill-opacity=".55" font-family="Arial" font-size="10">desidesign.me</text>`;
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${bg}${rangoliTop}${photoBlock}${rangoliBottom}${frame}${text}</svg>`;
    }

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
