import { NextResponse } from 'next/server';
import { getScenePrompt } from '@/lib/scene-prompts';

const DEFAULT_API_URL = 'https://api.evolink.ai/v1/images/generations';

export async function POST(request: Request) {
  const apiKey = process.env.EVOLINK_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'EVOLINK_API_KEY is not configured.' }, { status: 500 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Generation options are required.' }, { status: 400 });

  const scenePrompt = getScenePrompt(body.sceneId);
  const subject = body.portraitType === 'Couple' ? 'an Indian couple' : 'one Indian person';
  const attireDesc = body.attire === 'Elegant Festive' ? 'elegant festive Indian wear, embroidered silk, celebratory accessories, modern fusion style' : body.attire === 'Keep Original' ? 'keep the original clothing from the uploaded portrait, natural authentic look' : 'traditional Indian ethnic wear, rich silk fabric, intricate embroidery, ornate jewelry, cultural authenticity';
  const style = body.style === 'Hand-drawn' ? 'hand-drawn illustration' : 'modern flat illustration';
  const prompt = `A premium square Diwali portrait illustration featuring ${subject}. ${attireDesc}. ${scenePrompt} ${style}, warm joyful expression, culturally respectful details, polished commercial social media artwork, centered composition with clean negative space in the lower third for a greeting overlay. No text, no letters, no watermark, no logo.`;

  const genBody: Record<string, unknown> = { model: 'doubao-seedream-4.0', prompt, size: '1:1', quality: '2K' };
  if (body.photo && typeof body.photo === 'string' && body.photo.startsWith('data:image/')) genBody.image = body.photo;
  const response = await fetch(process.env.EVOLINK_API_URL || DEFAULT_API_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(genBody),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.error?.message || data?.message || 'Evolink request failed (' + response.status + ').' }, { status: response.status });
  if (!data?.id) return NextResponse.json({ error: 'Evolink did not return a task ID.' }, { status: 502 });
  return NextResponse.json({ taskId: data.id, status: data.status });
}