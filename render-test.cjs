const http = require("http");
const sharp = require("sharp");
const fs = require("fs");

async function postPreview(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      { host: "localhost", port: 3000, path: "/api/preview", method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } },
      (res) => {
        let buf = "";
        res.on("data", (c) => (buf += c));
        res.on("end", () => resolve(JSON.parse(buf)));
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function fetchPng(url) {
  return new Promise((resolve, reject) => {
    const file = url.split("file=")[1];
    http.get({ host: "localhost", port: 3000, path: "/api/image?file=" + file }, (r) => {
      const chunks = [];
      r.on("data", (c) => chunks.push(c));
      r.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

(async () => {
  // 80x80 blue photo so we can see it rendered in the circle
  const photo = "data:image/png;base64," + (await sharp({ create: { width: 80, height: 80, channels: 3, background: { r: 40, g: 120, b: 220 } } }).png().toBuffer()).toString("base64");
  for (const bg of ["Fireworks", "Diyas", "Rangoli"]) {
    const r = await postPreview({ background: bg, greeting: "Happy Diwali", name: "YH & Family", photo });
    if (r.url.startsWith("data:")) {
      const b64 = r.url.split(",")[1];
      fs.writeFileSync(`D:\\Program Files\\QClaw\\workspace-projects\\render-${bg}.png`, Buffer.from(b64, "base64"));
    } else {
      const png = await fetchPng(r.url);
      fs.writeFileSync(`D:\\Program Files\\QClaw\\workspace-projects\\render-${bg}.png`, png);
    }
    console.log(bg, "saved");
  }
})().catch((e) => console.error("ERR", e && e.message));
