import "server-only";
import type { SceneId } from "./scenes";

const SCENE_PROMPTS: Record<SceneId, string> = {
  fireworks: "Spectacular golden fireworks exploding in a velvety midnight sky, warm ambient glow, highly cinematic, bokeh depth of field, festive luxury aura.",
  diyas: "Exquisite glowing clay diyas with long warm dancing flames, smooth soft-focus oil painting textures, warm terracotta tones, deep rich shadows, spiritual ambience.",
  rangoli: "Intricate vibrant floor Rangoli patterns made of colorful chalk and flower petals, symmetrical geometric mandala art, luxury traditional aesthetic, top-down angle view.",
};

export function getScenePrompt(sceneId: unknown) {
  return SCENE_PROMPTS[sceneId as SceneId] ?? SCENE_PROMPTS.fireworks;
}