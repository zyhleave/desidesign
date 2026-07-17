import { NextResponse } from 'next/server';

const DEFAULT_API_URL = 'https://api.evolink.ai/v1/images/generations';

export async function POST(request: Request) {
  const apiKey = process.env.EVOLINK_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'EVOLINK_API_KEY is not configured.' }, { status: 500 });
  const body = await request.json().catch(() => null);
  if (!body?.prompt || typeof body.prompt !== 'string') return NextResponse.json({ error: 'A prompt is required.' }, { status: 400 });

  const response = await fetch(process.env.EVOLINK_API_URL || DEFAULT_API_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'doubao-seedream-4.0', prompt: body.prompt, size: '1:1', quality: '2K' }),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.error?.message || data?.message || 'Evolink request failed (' + response.status + ').' }, { status: response.status });
  if (!data?.id) return NextResponse.json({ error: 'Evolink did not return a task ID.' }, { status: 502 });
  return NextResponse.json({ taskId: data.id, status: data.status });
}