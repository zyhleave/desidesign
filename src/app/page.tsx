"use client";

import { ChangeEvent, useState } from "react";
import { CircleUserRound, Cloud, Download, Grid2X2, RefreshCw, Sparkles, Type, Upload } from "lucide-react";

const backgrounds = ["Fireworks", "Diyas", "Rangoli"];

export default function Home() {
  const [portraitType, setPortraitType] = useState("Solo");
  const [background, setBackground] = useState("Fireworks");
  const [style, setStyle] = useState("Modern Flat");
  const [greeting, setGreeting] = useState("Happy Diwali");
  const [name, setName] = useState("YH & Family");
  const [photo, setPhoto] = useState<string | null>(null);

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">DesiDesign</div>
          <div className="saved"><Cloud size={16} /> Saved locally</div>
          <div className="top-actions"><button>Saved</button><button className="icon-button" aria-label="Account"><CircleUserRound size={22} /></button></div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="studio-heading"><p>PORTRAIT STUDIO</p><span>Create your festive avatar</span></div>

          <Control title="PORTRAIT TYPE" active>
            <div className="segmented three">
              {["Solo", "Couple"].map((item) => <button key={item} className={portraitType === item ? "selected" : ""} onClick={() => setPortraitType(item)}>{item}</button>)}
              <button disabled><span>Family</span><small>SOON</small></button>
            </div>
          </Control>

          <Control title="PHOTO UPLOAD">
            <label className="upload-box">
              <Upload size={29} />
              <span>{photo ? "Photo ready - click to replace" : "Drop photo or click to browse"}</span>
              <input type="file" accept="image/*" onChange={handlePhoto} />
            </label>
          </Control>

          <Control title="CHOOSE LOOK">
            <div className="field"><label>ATTIRE</label><select defaultValue="Traditional Ethnic"><option>Traditional Ethnic</option><option>Elegant Festive</option><option>Keep Original</option></select></div>
            <div className="field"><label>BACKGROUND</label><div className="background-grid">{backgrounds.map((item) => <button key={item} className={background === item ? "selected" : ""} onClick={() => setBackground(item)}><span className={`swatch ${item.toLowerCase()}`} />{item}</button>)}</div></div>
            <div className="field"><label>STYLE</label><div className="segmented">{["Hand-drawn", "Modern Flat"].map((item) => <button key={item} className={style === item ? "selected" : ""} onClick={() => setStyle(item)}>{item}</button>)}</div></div>
          </Control>

          <Control title="PERSONALIZE">
            <div className="form-stack"><label>Greeting<input value={greeting} onChange={(event) => setGreeting(event.target.value)} /></label><label>Name<input value={name} onChange={(event) => setName(event.target.value)} /></label></div>
            <button className="primary-button"><Download size={16} /> Download High-Res · INR 49</button>
            <button className="generate-button"><Sparkles size={15} /> Generate Portrait</button>
          </Control>
        </aside>

        <section className="canvas-area">
          <div className={`portrait-canvas ${background.toLowerCase().replace(" ", "-")} ${style === "Hand-drawn" ? "drawn" : ""}`}>
            {photo ? <img src={photo} alt="Uploaded portrait" /> : <div className="portrait-art" aria-label="Festive portrait preview"><div className="halo" /><div className="figure"><div className="head" /><div className="body" /></div><div className="lamp one" /><div className="lamp two" /></div>}
            <div className="portrait-copy"><strong>{greeting}</strong><span>{name}</span></div>
            <div className="crop-guide" />
          </div>

          <div className="toolbar">
            <button title="Regenerate"><RefreshCw size={17} /><span>Regenerate</span></button><i />
            <button title="Change layout"><Grid2X2 size={17} /><span>Layout</span></button>
            <button title="Text size"><Type size={17} /><span>Text Size</span></button>
            <button className="download"><Download size={17} /><span>Download High-Res · INR 49</span></button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Control({ title, active = false, children }: { title: string; active?: boolean; children: React.ReactNode }) {
  return <section className="control"><h2 className={active ? "active" : ""}>{title}</h2><div className="control-body">{children}</div></section>;
}