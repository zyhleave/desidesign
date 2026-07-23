"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CircleUserRound, Cloud, Download, Grid2X2, RefreshCw, Sparkles, Type, Upload } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import LoginModal from "@/components/LoginModal";
import { SCENES, type SceneId } from "@/lib/scenes";

const GREETING_PRESETS = [
  "May your Deepavali be full of light and love.",
  "Shubh Deepavali. Wishing you abundant wealth and peace.",
  "Light, laughter, and a glowing new beginning!",
];

type HistoryItem = { id: string; url: string; kind: "preview" | "ai"; createdAt?: string };

export default function Home() {
  const [portraitType, setPortraitType] = useState("Solo");
  const [sceneId, setSceneId] = useState<SceneId>("fireworks");
  const [style, setStyle] = useState("Modern Flat");
  const [attire, setAttire] = useState("Traditional Ethnic");
  const [greeting, setGreeting] = useState("Happy Diwali");
  const [name, setName] = useState("YH & Family");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [previewCount, setPreviewCount] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const loadHistory = useCallback(async () => {
    const response = await fetch("/api/history", { cache: "no-store" });
    const data = await response.json();
    setHistory(data.items || []);
  }, []);

  useEffect(() => {
    const savedCount = Number.parseInt(localStorage.getItem("desidesign-preview-count") || "0", 10);
    queueMicrotask(() => setPreviewCount(Math.min(Math.max(savedCount, 0), 3)));
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/history", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => { if (active) setHistory(data.items || []); })
      .catch(() => { if (active) setHistory([]); });
    return () => { active = false; };
  }, []);

  async function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) { setPhoto(URL.createObjectURL(file)); const reader = new FileReader(); reader.onload = () => setPhotoBase64(reader.result as string); reader.readAsDataURL(file); }
  }

  async function generatePreview() {
    if (previewCount >= 3) {
      setNotice("Free previews used up (3/3). Use AI Enhance for the final 2K image.");
      return;
    }
    setIsPreviewLoading(true);
    setNotice("Testing your composition...");
    try {
      const scene = SCENES.find((item) => item.id === sceneId) ?? SCENES[0];
      const response = await fetch("/api/preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ background: scene.legacyName, greeting, name, photo: photoBase64 }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not create preview.");
      setGeneratedImage(data.url);
      const nextCount = Math.min(previewCount + 1, 3);
      setPreviewCount(nextCount);
      localStorage.setItem("desidesign-preview-count", String(nextCount));
      setNotice("Preview ready. Remaining free tries: " + (3 - nextCount) + "/3.");
      await loadHistory();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Preview failed.");
    } finally {
      setIsPreviewLoading(false);
    }
  }


  async function downloadImage() {
    const url = generatedImage;
    if (!url) { setNotice("No image to download. Generate one first."); return; }
    // Check auth before download
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setShowLoginModal(true);
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "desidesign-" + Date.now() + ".jpg";
    anchor.click();
    setNotice("Download started!");
  }

  function resetPreviewCount() {
    setPreviewCount(0);
    localStorage.removeItem("desidesign-preview-count");
    setNotice("Free previews reset. You have 3 tries.");
  }

  async function generatePortrait() {
    setIsAiLoading(true);
    setNotice("Starting 2K AI generation...");
    try {
      const createResponse = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sceneId, portraitType, attire, style, photo: photoBase64 }) });
      const createData = await createResponse.json();
      if (!createResponse.ok) throw new Error(createData.error || "Could not start generation.");
      const deadline = Date.now() + 120_000;
      while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const statusResponse = await fetch(`/api/generate/status?taskId=${encodeURIComponent(createData.taskId)}`);
        const statusData = await statusResponse.json();
        if (!statusResponse.ok) throw new Error(statusData.error || "Could not check generation status.");
        if (statusData.status === "failed") throw new Error(statusData.error || "Generation failed.");
        if (statusData.status === "completed") {
          if (!statusData.results?.[0]) throw new Error("Generation completed without an image.");
          setGeneratedImage(statusData.results[0]);
          setNotice("2K AI portrait generated and saved.");
          await loadHistory();
          return;
        }
        setNotice(`Creating 2K portrait... ${statusData.progress || 0}%`);
      }
      throw new Error("Generation timed out. Please try again.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Generation failed. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar"><div className="topbar-inner"><div className="brand">DesiDesign</div><div className="saved"><Cloud size={16} /> Saved locally</div><div className="top-actions"><button>Saved</button><AuthButton /></div></div></header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="studio-heading"><p>PORTRAIT STUDIO</p><span>AI Diwali photo editor for festive avatars</span></div>
          <Control title="PORTRAIT TYPE" active><div className="segmented three">{["Solo", "Couple"].map((item) => <button key={item} className={portraitType === item ? "selected" : ""} onClick={() => setPortraitType(item)}>{item}</button>)}<button disabled><span>Family</span><small>SOON</small></button></div></Control>
          <Control title="PHOTO UPLOAD"><label className="upload-box"><Upload size={29} /><span>{photo ? "Photo ready - preview only" : "Drop photo or click to browse"}</span><input type="file" accept="image/*" onChange={handlePhoto} /></label></Control>
          <Control title="CHOOSE LOOK">
            <div className="field"><label>ATTIRE</label><select value={attire} onChange={(event) => setAttire(event.target.value)}><option>Traditional Ethnic</option><option>Elegant Festive</option><option>Keep Original</option></select></div>
            <div className="field"><label>CHOOSE YOUR FESTIVE STORY</label><div className="scene-list">{SCENES.map((scene) => <button key={scene.id} className={sceneId === scene.id ? "selected" : ""} onClick={() => { setSceneId(scene.id); if (previewCount < 3) setTimeout(generatePreview, 100); }}><span className={`scene-swatch ${scene.id}`} aria-hidden="true" /><span className="scene-copy"><strong>{scene.title}</strong><small>{scene.subtitle}</small></span></button>)}</div></div>
            <div className="field"><label>STYLE</label><div className="segmented">{["Hand-drawn", "Modern Flat"].map((item) => <button key={item} className={style === item ? "selected" : ""} onClick={() => setStyle(item)}>{item}</button>)}</div></div>
          </Control>
          <Control title="PERSONALIZE">
            <div className="form-stack"><label>Greeting<input value={greeting} onChange={(event) => setGreeting(event.target.value)} maxLength={72} /></label><div className="greeting-presets">{GREETING_PRESETS.map((preset, index) => <button key={preset} onClick={() => { setGreeting(preset); setGeneratedImage(null); if (previewCount < 3) setTimeout(generatePreview, 200); }} title={preset}>{index === 0 ? "Light & love" : index === 1 ? "Wealth & peace" : "New beginning"}</button>)}</div><label>Name<input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} /></label><p className="text-note">Your words are typeset as a crisp overlay, separate from the AI artwork.</p></div>
            <div className="preview-row"><button className="preview-button" onClick={generatePreview} disabled={isPreviewLoading || previewCount >= 3}><Grid2X2 size={16} /> {isPreviewLoading ? "Testing..." : previewCount >= 3 ? "Free previews used (3/3)" : `Generate Free Preview (${3 - previewCount}/3)`}</button>{previewCount >= 3 && <button className="reset-preview-btn" onClick={resetPreviewCount} title="Reset preview count">Reset</button>}</div>
            <button className="generate-button disabled" disabled title="Coming soon"><Sparkles size={15} /> AI Enhance - 2K - Coming soon</button>
            {notice && <p className="status-notice" role="status">{notice}</p>}
          </Control>
        </aside>
        <section className="canvas-area">
          <div className={`portrait-canvas ${sceneId} ${style === "Hand-drawn" ? "drawn" : ""}`} style={!(generatedImage || photo) ? { backgroundImage: "url('/generated/preview-default.png')", backgroundSize: "cover", backgroundPosition: "center" } : undefined}>{(generatedImage || photo) && <img src={(generatedImage ?? photo) as string} alt="Festive portrait preview" />}{!generatedImage && <div className="portrait-copy"><strong>{greeting}</strong><span>{name}</span></div>}<div className="crop-guide" /></div>
          <div className="toolbar"><button title="Free preview" onClick={generatePreview}><RefreshCw size={17} /><span>New Preview</span></button><i /><button title="Change layout"><Grid2X2 size={17} /><span>Layout</span></button><button title="Text size"><Type size={17} /><span>Text Size</span></button><button className="download" onClick={downloadImage} title="Download selected image"><Download size={17} /><span>Download Selected</span></button></div>
          <div className="history-strip"><div className="history-title"><strong>History</strong><span>{history.length} saved</span></div><div className="history-list">{history.length === 0 ? <span className="history-empty">No saved images yet</span> : history.map((item) => <button key={item.id} className={generatedImage === item.url ? "selected" : ""} onClick={() => setGeneratedImage(item.url)} title={item.kind === "ai" ? "2K AI image" : "512px preview"}><img src={item.url} alt="Saved generation" /><small>{item.kind === "ai" ? "2K AI" : "PREVIEW"}</small></button>)}</div></div>
        </section>
      </div>
      <section className="tools-listing" aria-label="More free Diwali design tools">
        <h2>More Free Diwali Design Tools</h2>
        <p className="tools-sub">Pick a tool to create your festive designs in 1 click — all free, no signup.</p>
        <div className="tools-grid">
          <a className="tool-card" href="/happy-diwali-post-generator">
            <strong>Diwali Post Generator</strong>
            <span>Make share-ready Diwali posts for Instagram & WhatsApp — free</span>
          </a>
        </div>
      </section>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onSuccess={() => setNotice("Logged in! You can now download.")} />}
      <footer className="editorial-footer"><div><h2>AI Diwali Photo Editor</h2><p>DesiDesign turns portraits into personalized Indian festive greetings with curated fireworks, diya, and Rangoli scenes.</p></div><div><h2>Made for your story</h2><p>Upload a portrait, choose a festive story, and add a greeting and family name as a crisp, editable text layer.</p></div><div><h2>Preview before 2K</h2><p>Explore the composition with a free local preview, then create a polished 2K AI artwork when the design feels right.</p></div></footer>
    </main>
  );
}

function Control({ title, active = false, children }: { title: string; active?: boolean; children: React.ReactNode }) {
  return <section className="control"><h2 className={active ? "active" : ""}>{title}</h2><div className="control-body">{children}</div></section>;
}


