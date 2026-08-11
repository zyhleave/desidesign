import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resvg } from "@resvg/resvg-js";
import path from "path";

// Embed the font so text renders in ANY environment (Vercel's Linux runtime
// has no Georgia/serif fonts, which silently dropped all <text> before).
const FONT_PATH = path.join(process.cwd(), "src/assets/fonts/NotoSerif-Bold.ttf");

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

function balloon(x: number, y: number, s: number, color: string): string {
  const r = 16 * s;
  return `<g>` +
    `<ellipse cx="${x}" cy="${y - r}" rx="${r}" ry="${(r * 1.15).toFixed(1)}" fill="${color}"/>` +
    `<path d="M${(x - r * 0.35).toFixed(1)} ${(y - r * 0.15).toFixed(1)} L${x} ${y} L${(x + r * 0.35).toFixed(1)} ${(y - r * 0.15).toFixed(1)} Z" fill="${color}"/>` +
    `<path d="M${x} ${y} Q${(x - 3 * s).toFixed(1)} ${(y + 30 * s).toFixed(1)} ${(x + 4 * s).toFixed(1)} ${(y + 58 * s).toFixed(1)}" fill="none" stroke="#9a9a9a" stroke-width="1"/>` +
    `<ellipse cx="${(x - r * 0.35).toFixed(1)}" cy="${(y - r * 1.15).toFixed(1)}" rx="${(r * 0.18).toFixed(1)}" ry="${(r * 0.3).toFixed(1)}" fill="#fff" fill-opacity="0.45" transform="rotate(-20 ${(x - r * 0.35).toFixed(1)} ${(y - r * 1.15).toFixed(1)})"/>` +
    `</g>`;
}

function cloud(x: number, y: number, s: number): string {
  return `<g fill="#ffffff" fill-opacity="0.75">` +
    `<ellipse cx="${x}" cy="${y}" rx="${(26 * s).toFixed(1)}" ry="${(12 * s).toFixed(1)}"/>` +
    `<ellipse cx="${(x - 18 * s).toFixed(1)}" cy="${(y + 4 * s).toFixed(1)}" rx="${(16 * s).toFixed(1)}" ry="${(9 * s).toFixed(1)}"/>` +
    `<ellipse cx="${(x + 20 * s).toFixed(1)}" cy="${(y + 3 * s).toFixed(1)}" rx="${(17 * s).toFixed(1)}" ry="${(9 * s).toFixed(1)}"/>` +
    `<ellipse cx="${(x - 8 * s).toFixed(1)}" cy="${(y - 8 * s).toFixed(1)}" rx="${(15 * s).toFixed(1)}" ry="${(10 * s).toFixed(1)}"/>` +
    `</g>`;
}

function starShape(x: number, y: number, r: number, color: string): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${color}" fill-opacity="0.8"/>`;
}

function bunting(x: number, y: number, count: number, gap: number, h: number, colors: string[]): string {
  let s = `<g>`;
  for (let i = 0; i < count; i++) {
    const cx = x + i * gap;
    s += `<path d="M${cx} ${y} L${(cx + gap / 2).toFixed(1)} ${(y + h).toFixed(1)} L${(cx + gap).toFixed(1)} ${y} Z" fill="${colors[i % colors.length]}" stroke="#fff" stroke-width="0.6" stroke-opacity="0.5"/>`;
  }
  return s + `</g>`;
}

function confettiDots(w: number, h: number): string {
  const colors = ["#ff6b6b", "#4ecdc4", "#ffd93d", "#6c5ce7", "#ff8a5c", "#45b7d1"];
  let s = `<g>`;
  for (let i = 0; i < 26; i++) {
    const x = Math.random() * w;
    const y = 70 + Math.random() * (h - 160);
    const r = 1.5 + Math.random() * 3;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${colors[i % colors.length]}" fill-opacity="${(0.25 + Math.random() * 0.4).toFixed(2)}"/>`;
  }
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
    const kind = body.kind || "diwali";

    // Wedding flow
    if (kind === "wedding") {
      const styleId = ["boho-sage", "classic-gold", "modern-minimal", "floral-bliss", "rustic-kraft", "birthday-party", "baby-shower"].includes(body.background) ? body.background : "boho-sage";
      const partner1 = escapeXml(String(body.partner1 || "Partner 1").slice(0, 30));
      const partner2 = escapeXml(String(body.partner2 || "Partner 2").slice(0, 30));
      const dateText = escapeXml(String(body.dateText || "Date").slice(0, 40));
      const venue = escapeXml(String(body.venue || "Venue").slice(0, 60));
      const greeting = escapeXml(String(body.greeting || "").slice(0, 72));
      const id = `wedding-${Date.now()}-${randomUUID().slice(0, 8)}`;

      // Wedding invitation SVG templates (5:7 aspect ratio)
      const W = 420, H = 588;
      let svg = "";

      if (styleId === "boho-sage") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#f0ebe2"/><stop offset="0.5" stop-color="#d8cdb8"/><stop offset="1" stop-color="#c4b8a0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const arch = `<path d="M${W*0.2} 20 Q${W*0.5} -40 ${W*0.8} 20" fill="none" stroke="#7c8a6b" stroke-width="3" stroke-opacity="0.3"/>`;
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          ${greeting ? `<text x="${W/2}" y="80" font-size="11" fill="#6b6358" letter-spacing="0.1em" text-transform="uppercase">${greeting}</text>` : ""}
          <text x="${W/2}" y="${H/2-60}" font-size="14" fill="#6b6358">The wedding of</text>
          <text x="${W/2}" y="${H/2-20}" font-size="32" font-weight="400" fill="#3a3528">${partner1}</text>
          <text x="${W/2}" y="${H/2+10}" font-size="20" fill="#7c8a6b" font-style="italic">&amp;</text>
          <text x="${W/2}" y="${H/2+45}" font-size="32" font-weight="400" fill="#3a3528">${partner2}</text>
          <line x1="${W/2-20}" y1="${H/2+70}" x2="${W/2+20}" y2="${H/2+70}" stroke="#7c8a6b" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W/2}" y="${H/2+100}" font-size="16" fill="#3a3528">${dateText}</text>
          <text x="${W/2}" y="${H/2+125}" font-size="13" fill="#6b6358">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${arch}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#6b6358" fill-opacity="0.5" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else if (styleId === "classic-gold") {
        // Haldi Golden Theme: #E69C3B (金菊) / #861710 (深红) / #FAF0DB (暖米白)
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#FAF0DB"/><stop offset="0.5" stop-color="#F5E8C8"/><stop offset="1" stop-color="#E8D4A8"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const borders = `<rect x="16" y="16" width="${W-32}" height="${H-32}" fill="none" stroke="#861710" stroke-width="3" stroke-opacity="0.6"/><rect x="24" y="24" width="${W-48}" height="${H-48}" fill="none" stroke="#E69C3B" stroke-width="1.5" stroke-opacity="0.5"/>`;
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          ${greeting ? `<text x="${W/2}" y="80" font-size="11" fill="#861710" letter-spacing="0.15em" font-weight="600">${greeting}</text>` : ""}
          <text x="${W/2}" y="${H/2-60}" font-size="14" fill="#861710">The wedding of</text>
          <text x="${W/2}" y="${H/2-20}" font-size="34" font-weight="600" fill="#861710">${partner1}</text>
          <text x="${W/2}" y="${H/2+10}" font-size="22" fill="#E69C3B" font-style="italic">&amp;</text>
          <text x="${W/2}" y="${H/2+45}" font-size="34" font-weight="600" fill="#861710">${partner2}</text>
          <line x1="${W/2-30}" y1="${H/2+70}" x2="${W/2+30}" y2="${H/2+70}" stroke="#E69C3B" stroke-width="2" stroke-opacity="0.6"/>
          <text x="${W/2}" y="${H/2+105}" font-size="17" fill="#861710" font-weight="500">${dateText}</text>
          <text x="${W/2}" y="${H/2+132}" font-size="13" fill="#861710" fill-opacity="0.8">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${borders}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#861710" fill-opacity="0.4" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else if (styleId === "modern-minimal") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e8e8e8"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const lines = `<line x1="30" y1="30" x2="${W-30}" y2="30" stroke="#1a1a1a" stroke-opacity="0.2"/><line x1="30" y1="${H-30}" x2="${W-30}" y2="${H-30}" stroke="#1a1a1a" stroke-opacity="0.2"/>`;
        const text = `<g text-anchor="middle" font-family="Arial, Helvetica, sans-serif">
          ${greeting ? `<text x="${W/2}" y="80" font-size="11" fill="#888" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W/2}" y="${H/2-60}" font-size="14" fill="#888">The wedding of</text>
          <text x="${W/2}" y="${H/2-20}" font-size="32" font-weight="300" fill="#1a1a1a">${partner1}</text>
          <text x="${W/2}" y="${H/2+10}" font-size="20" fill="#666">&amp;</text>
          <text x="${W/2}" y="${H/2+45}" font-size="32" font-weight="300" fill="#1a1a1a">${partner2}</text>
          <line x1="${W/2-20}" y1="${H/2+70}" x2="${W/2+20}" y2="${H/2+70}" stroke="#1a1a1a" stroke-width="1" stroke-opacity="0.3"/>
          <text x="${W/2}" y="${H/2+100}" font-size="16" fill="#1a1a1a">${dateText}</text>
          <text x="${W/2}" y="${H/2+125}" font-size="13" fill="#888">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${lines}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#1a1a1a" fill-opacity="0.4" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else if (styleId === "floral-bliss") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#fdf0f3"/><stop offset="0.5" stop-color="#f5d8e0"/><stop offset="1" stop-color="#e8b8c8"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const florals = `<ellipse cx="${W*0.2}" cy="60" rx="80" ry="50" fill="#e8b4c8" fill-opacity="0.3"/><ellipse cx="${W*0.8}" cy="60" rx="80" ry="50" fill="#e8b4c8" fill-opacity="0.3"/><ellipse cx="${W*0.2}" cy="${H-60}" rx="80" ry="50" fill="#e8b4c8" fill-opacity="0.3"/><ellipse cx="${W*0.8}" cy="${H-60}" rx="80" ry="50" fill="#e8b4c8" fill-opacity="0.3"/>`;
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          ${greeting ? `<text x="${W/2}" y="100" font-size="11" fill="#8a5070" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W/2}" y="${H/2-60}" font-size="14" fill="#8a5070">The wedding of</text>
          <text x="${W/2}" y="${H/2-20}" font-size="32" font-weight="400" fill="#5a2840">${partner1}</text>
          <text x="${W/2}" y="${H/2+10}" font-size="20" fill="#c4728a" font-style="italic">&amp;</text>
          <text x="${W/2}" y="${H/2+45}" font-size="32" font-weight="400" fill="#5a2840">${partner2}</text>
          <line x1="${W/2-20}" y1="${H/2+70}" x2="${W/2+20}" y2="${H/2+70}" stroke="#c4728a" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W/2}" y="${H/2+100}" font-size="16" fill="#5a2840">${dateText}</text>
          <text x="${W/2}" y="${H/2+125}" font-size="13" fill="#8a5070">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${florals}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#c4728a" fill-opacity="0.5" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else if (styleId === "birthday-party") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0" stop-color="#fff8e7"/><stop offset="0.55" stop-color="#ffe9c2"/><stop offset="1" stop-color="#ffd98a"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const flags = bunting(14, 28, 9, 44, 26, ["#ff6b6b", "#4ecdc4", "#ffd93d", "#6c5ce7", "#ff8a5c"]);
        const confetti = confettiDots(W, H);
        const balLeft = balloon(62, 472, 1, "#ff6b6b");
        const balRight = balloon(358, 462, 1.1, "#4ecdc4");
        const balMid = balloon(210, 500, 0.8, "#ffd93d");
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          <text x="${W/2}" y="86" font-size="13" fill="#e8590c" letter-spacing="0.28em" font-weight="bold">BIRTHDAY PARTY</text>
          ${greeting ? `<text x="${W/2}" y="128" font-size="11" fill="#8a6a3a" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W/2}" y="222" font-size="18" fill="#e8590c" font-style="italic">You&apos;re Invited!</text>
          <text x="${W/2}" y="264" font-size="36" font-weight="400" fill="#4a2c0c">${partner1}</text>
          ${partner2 ? `<text x="${W/2}" y="304" font-size="20" fill="#e8590c" font-style="italic">&amp; ${partner2}</text>` : ""}
          <line x1="${W/2-20}" y1="348" x2="${W/2+20}" y2="348" stroke="#e8590c" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W/2}" y="376" font-size="16" fill="#4a2c0c">${dateText}</text>
          <text x="${W/2}" y="402" font-size="13" fill="#8a6a3a">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${flags}${confetti}${balLeft}${balRight}${balMid}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#e8590c" fill-opacity="0.5" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else if (styleId === "baby-shower") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0" stop-color="#fdeff5"/><stop offset="0.5" stop-color="#f9dcec"/><stop offset="1" stop-color="#e8f5ef"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const clouds = cloud(64, 58, 1) + cloud(214, 40, 1.2) + cloud(352, 62, 0.9);
        const stars = starShape(52, 128, 8, "#f7a8c4") + starShape(368, 118, 10, "#8fd0c0") + starShape(204, 96, 6, "#f7c8d8") + starShape(384, 210, 7, "#a8dcc8") + starShape(36, 212, 6, "#f7a8c4") + starShape(120, 150, 5, "#d9b8e8");
        const balLeft = balloon(78, 500, 0.9, "#f7a8c4");
        const balRight = balloon(342, 492, 1, "#a8dcc8");
        const balMid = balloon(210, 518, 0.75, "#fbd5a0");
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          <text x="${W/2}" y="86" font-size="13" fill="#c2648f" letter-spacing="0.28em" font-weight="bold">BABY SHOWER</text>
          ${greeting ? `<text x="${W/2}" y="128" font-size="11" fill="#9a7a8a" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W/2}" y="222" font-size="18" fill="#c2648f" font-style="italic">You&apos;re Invited!</text>
          <text x="${W/2}" y="264" font-size="36" font-weight="400" fill="#4a2c4a">${partner1}</text>
          ${partner2 ? `<text x="${W/2}" y="304" font-size="20" fill="#7aa8a0" font-style="italic">&amp; ${partner2}</text>` : ""}
          <line x1="${W/2-20}" y1="348" x2="${W/2+20}" y2="348" stroke="#c2648f" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W/2}" y="376" font-size="16" fill="#4a2c4a">${dateText}</text>
          <text x="${W/2}" y="402" font-size="13" fill="#9a7a8a">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${clouds}${stars}${balLeft}${balRight}${balMid}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#c2648f" fill-opacity="0.5" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else {
        // rustic-kraft
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#e8dcc8"/><stop offset="0.5" stop-color="#d4c4a8"/><stop offset="1" stop-color="#c4a882"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const dashBorder = `<rect x="12" y="12" width="${W-24}" height="${H-24}" fill="none" stroke="#8a6a3a" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.3"/>`;
        const text = `<g text-anchor="middle" font-family="Courier New, Courier, monospace">
          ${greeting ? `<text x="${W/2}" y="80" font-size="11" fill="#7a6a4e" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W/2}" y="${H/2-60}" font-size="14" fill="#7a6a4e">The wedding of</text>
          <text x="${W/2}" y="${H/2-20}" font-size="28" font-weight="400" fill="#4a3a1e">${partner1}</text>
          <text x="${W/2}" y="${H/2+10}" font-size="18" fill="#8a6a3a">&amp;</text>
          <text x="${W/2}" y="${H/2+45}" font-size="28" font-weight="400" fill="#4a3a1e">${partner2}</text>
          <line x1="${W/2-20}" y1="${H/2+70}" x2="${W/2+20}" y2="${H/2+70}" stroke="#8a6a3a" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W/2}" y="${H/2+100}" font-size="16" fill="#4a3a1e">${dateText}</text>
          <text x="${W/2}" y="${H/2+125}" font-size="13" fill="#7a6a4e">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${dashBorder}${text}<text x="${W-10}" y="${H-10}" text-anchor="end" fill="#8a6a3a" fill-opacity="0.5" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      }

      const normalizedSvg = svg.replace(/font-family="[^"]*"/g, 'font-family="Noto Serif"');
      const pngBuffer = new Resvg(normalizedSvg, {
        font: { loadSystemFonts: false, fontFiles: [FONT_PATH], defaultFontFamily: "Noto Serif" },
      }).render().asPng();
      const url = `data:image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;

      return NextResponse.json({ id, url, kind: "wedding", width: W, height: H }, { status: 200 });
    }

    // Haldi flow
    if (kind === "haldi") {
      const styleId = ["turmeric-gold", "marigold-bloom", "mandala-haldi"].includes(body.background) ? body.background : "turmeric-gold";
      const partner1 = escapeXml(String(body.partner1 || "Partner 1").slice(0, 30));
      const partner2 = escapeXml(String(body.partner2 || "Partner 2").slice(0, 30));
      const dateText = escapeXml(String(body.dateText || "Date").slice(0, 40));
      const venue = escapeXml(String(body.venue || "Venue").slice(0, 60));
      const greeting = escapeXml(String(body.greeting || "Haldi Ceremony").slice(0, 72));
      const id = `haldi-${Date.now()}-${randomUUID().slice(0, 8)}`;

      const W = 420, H = 588;
      let svg = "";

      if (styleId === "turmeric-gold") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#fdf6e3"/><stop offset="0.5" stop-color="#f5e6c8"/><stop offset="1" stop-color="#ede0c0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const borders = `<rect x="16" y="16" width="${W - 32}" height="${H - 32}" fill="none" stroke="#d4a017" stroke-width="2" stroke-opacity="0.4"/><rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="#d4a017" stroke-width="1" stroke-opacity="0.25"/>`;
        const cornerFlowers = [0, 1, 2, 3].map((i) => {
          const cx = i % 2 === 0 ? 35 : W - 35;
          const cy = i < 2 ? 35 : H - 35;
          let p = "";
          for (let j = 0; j < 6; j++) { const a = (j / 6) * Math.PI * 2; p += `<circle cx="${(cx + Math.cos(a) * 12).toFixed(1)}" cy="${(cy + Math.sin(a) * 12).toFixed(1)}" r="5" fill="#ff9800" fill-opacity="0.35"/>`; }
          return p + `<circle cx="${cx}" cy="${cy}" r="4" fill="#d4a017" fill-opacity="0.5"/>`;
        }).join("");
        const petals = `<g>${cornerFlowers}</g>`;
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          ${greeting ? `<text x="${W / 2}" y="80" font-size="12" fill="#8a7a4e" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W / 2}" y="${H / 2 - 60}" font-size="14" fill="#8a7a4e">The haldi ceremony of</text>
          <text x="${W / 2}" y="${H / 2 - 20}" font-size="32" font-weight="400" fill="#4a3c1e">${partner1}</text>
          <text x="${W / 2}" y="${H / 2 + 10}" font-size="20" fill="#d4a017" font-style="italic">&amp;</text>
          <text x="${W / 2}" y="${H / 2 + 45}" font-size="32" font-weight="400" fill="#4a3c1e">${partner2}</text>
          <line x1="${W / 2 - 20}" y1="${H / 2 + 70}" x2="${W / 2 + 20}" y2="${H / 2 + 70}" stroke="#d4a017" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W / 2}" y="${H / 2 + 100}" font-size="16" fill="#4a3c1e">${dateText}</text>
          <text x="${W / 2}" y="${H / 2 + 125}" font-size="13" fill="#8a7a4e">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${borders}${petals}${text}<text x="${W - 10}" y="${H - 10}" text-anchor="end" fill="#d4a017" fill-opacity="0.55" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else if (styleId === "marigold-bloom") {
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#fff3e0"/><stop offset="0.5" stop-color="#ffe0b2"/><stop offset="1" stop-color="#ffcc80"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const flowerRow = (y: number) => {
          let s = `<g>`;
          for (let i = 0; i < 7; i++) {
            const cx = 30 + i * 60;
            for (let j = 0; j < 6; j++) { const a = (j / 6) * Math.PI * 2; s += `<circle cx="${(cx + Math.cos(a) * 8).toFixed(1)}" cy="${(y + Math.sin(a) * 8).toFixed(1)}" r="4" fill="#ff9800" fill-opacity="0.5"/>`; }
            s += `<circle cx="${cx}" cy="${y}" r="3.5" fill="#e65100"/>`;
          }
          return s + `</g>`;
        };
        const flowers = flowerRow(30) + flowerRow(H - 30);
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          ${greeting ? `<text x="${W / 2}" y="90" font-size="12" fill="#bf360c" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W / 2}" y="${H / 2 - 60}" font-size="14" fill="#bf360c">The haldi ceremony of</text>
          <text x="${W / 2}" y="${H / 2 - 20}" font-size="32" font-weight="400" fill="#5d2e0c">${partner1}</text>
          <text x="${W / 2}" y="${H / 2 + 10}" font-size="20" fill="#ff9800" font-style="italic">&amp;</text>
          <text x="${W / 2}" y="${H / 2 + 45}" font-size="32" font-weight="400" fill="#5d2e0c">${partner2}</text>
          <line x1="${W / 2 - 20}" y1="${H / 2 + 70}" x2="${W / 2 + 20}" y2="${H / 2 + 70}" stroke="#ff9800" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W / 2}" y="${H / 2 + 100}" font-size="16" fill="#5d2e0c">${dateText}</text>
          <text x="${W / 2}" y="${H / 2 + 125}" font-size="13" fill="#bf360c">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${flowers}${text}<text x="${W - 10}" y="${H - 10}" text-anchor="end" fill="#bf360c" fill-opacity="0.55" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      } else {
        // mandala-haldi
        const bg = `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0" stop-color="#f9d976"/><stop offset="0.5" stop-color="#e6b800"/><stop offset="1" stop-color="#d4a017"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
        const rings = `<g fill="none" stroke="#fff" stroke-opacity="0.15"><circle cx="${W / 2}" cy="${H / 2 - 10}" r="140" stroke-width="1.5"/><circle cx="${W / 2}" cy="${H / 2 - 10}" r="110" stroke-width="1"/><circle cx="${W / 2}" cy="${H / 2 - 10}" r="80" stroke-width="1"/><circle cx="${W / 2}" cy="${H / 2 - 10}" r="50" stroke-width="0.8"/></g>`;
        const dots = `<g fill="#fff" fill-opacity="0.2">${Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return `<circle cx="${(W / 2 + Math.cos(a) * 125).toFixed(1)}" cy="${(H / 2 - 10 + Math.sin(a) * 125).toFixed(1)}" r="3"/>`; }).join("")}</g>`;
        const text = `<g text-anchor="middle" font-family="Georgia, serif">
          ${greeting ? `<text x="${W / 2}" y="80" font-size="12" fill="#fff" fill-opacity="0.8" letter-spacing="0.1em">${greeting}</text>` : ""}
          <text x="${W / 2}" y="${H / 2 - 60}" font-size="14" fill="#fff" fill-opacity="0.8">The haldi ceremony of</text>
          <text x="${W / 2}" y="${H / 2 - 20}" font-size="32" font-weight="400" fill="#fff">${partner1}</text>
          <text x="${W / 2}" y="${H / 2 + 10}" font-size="20" fill="#fff" fill-opacity="0.7" font-style="italic">&amp;</text>
          <text x="${W / 2}" y="${H / 2 + 45}" font-size="32" font-weight="400" fill="#fff">${partner2}</text>
          <line x1="${W / 2 - 20}" y1="${H / 2 + 70}" x2="${W / 2 + 20}" y2="${H / 2 + 70}" stroke="#fff" stroke-width="1" stroke-opacity="0.4"/>
          <text x="${W / 2}" y="${H / 2 + 100}" font-size="16" fill="#fff">${dateText}</text>
          <text x="${W / 2}" y="${H / 2 + 125}" font-size="13" fill="#fff" fill-opacity="0.8">${venue}</text>
        </g>`;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}${rings}${dots}${text}<text x="${W - 10}" y="${H - 10}" text-anchor="end" fill="#fff" fill-opacity="0.4" font-size="9" font-family="Arial">desidesign.me</text></svg>`;
      }

      const normalizedSvg = svg.replace(/font-family="[^"]*"/g, 'font-family="Noto Serif"');
      const pngBuffer = new Resvg(normalizedSvg, {
        font: { loadSystemFonts: false, fontFiles: [FONT_PATH], defaultFontFamily: "Noto Serif" },
      }).render().asPng();
      const url = `data:image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;

      return NextResponse.json({ id, url, kind: "haldi", width: W, height: H }, { status: 200 });
    }

    // Diwali flow (existing logic)
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

    // Force every text node onto the embedded font (Vercel Linux lacks Georgia/Arial),
    // then render SVG → PNG with resvg using ONLY the bundled font buffer.
    const normalizedSvg = svg.replace(/font-family="[^"]*"/g, 'font-family="Noto Serif"');
    const pngBuffer = new Resvg(normalizedSvg, {
      font: { loadSystemFonts: false, fontFiles: [FONT_PATH], defaultFontFamily: "Noto Serif" },
    }).render().asPng();
    const url = `data:image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;

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
