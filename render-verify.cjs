const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

const fontBuf = fs.readFileSync(path.join(__dirname, "src/assets/fonts/NotoSerif-Bold.ttf"));

function makeSvg(fontFamily) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#0d1b2a"/>
    <circle cx="256" cy="200" r="120" fill="none" stroke="#4cc9f0" stroke-width="4"/>
    <g text-anchor="middle" font-family="${fontFamily}">
      <text x="256" y="390" font-size="30" font-weight="700" fill="#caf0f8">Light &amp; love</text>
      <text x="256" y="440" font-size="18" fill="#90e0ef">Sharma Family</text>
    </g>
    <text x="500" y="506" text-anchor="end" fill="#90e0ef" font-family="Arial" font-size="10">desidesign.me</text>
  </svg>`;
}

// Case 1: NO custom font, system fonts OFF -> simulates Vercel Linux (text should VANISH)
const r1 = new Resvg(makeSvg("Georgia, serif"), { font: { loadSystemFonts: false } });
fs.writeFileSync(path.join(__dirname, "verify-nofont.png"), r1.render().asPng());
console.log("wrote verify-nofont.png (no font, sysfonts off = should have NO text)");

// Case 2: embedded font buffer, system fonts OFF -> the fix (text should APPEAR)
const r2 = new Resvg(makeSvg("Noto Serif"), {
  font: { loadSystemFonts: false, fontBuffers: [fontBuf], defaultFontFamily: "Noto Serif" },
});
fs.writeFileSync(path.join(__dirname, "verify-withfont.png"), r2.render().asPng());
console.log("wrote verify-withfont.png (embedded font, sysfonts off = should HAVE text)");
