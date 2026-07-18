export const SCENES = [
  {
    id: "fireworks",
    legacyName: "Fireworks",
    title: "Starry Sparkle",
    subtitle: "Golden fireworks bloom across the night, lighting the way to a fortunate new year.",
  },
  {
    id: "diyas",
    legacyName: "Diyas",
    title: "Sacred Glow",
    subtitle: "A steadfast lamp dispels the dark and welcomes abundance, calm, and warmth.",
  },
  {
    id: "rangoli",
    legacyName: "Rangoli",
    title: "Mandala Blessing",
    subtitle: "A kaleidoscope of petals and color welcomes good fortune to your doorstep.",
  },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];
