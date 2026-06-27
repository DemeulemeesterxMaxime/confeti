export const prerender = false;

// Normalise la réponse IA : aplatit les objets imbriqués en clés avec points
// ex: { s1: { kicker: "a", line: "b" } } → { "s1.kicker": "a", "s1.line": "b" }
export function flattenAiJson(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenAiJson(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = String(value ?? '');
    }
  }
  return result;
}

export async function POST({ request }: { request: Request }) {
  let prompt: string, tone: string, occasion: string, langue: string;
  try {
    ({ prompt, tone, occasion, langue } = await request.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Corps de requête invalide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiBase = import.meta.env.AI_API_BASE_URL;
  const apiKey = import.meta.env.AI_API_KEY;
  const model = import.meta.env.AI_MODEL;

  if (!apiBase || !apiKey) {
    return new Response(JSON.stringify({ error: 'IA non configurée sur ce serveur.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const systemPrompt = `Tu génères le contenu textuel d'un site d'anniversaire.
Réponds UNIQUEMENT avec cet objet JSON (remplace les valeurs, garde les clés identiques) :

{
  "name": "Prénom",
  "opening.eyebrow": "Pour toi,",
  "opening.title": "Titre d'ouverture accrocheur",
  "s1.kicker": "Étiquette scène 1",
  "s1.line": "Message scène 1 (1-2 phrases)",
  "s2.kicker": "Étiquette scène 2",
  "s2.line": "Message scène 2",
  "s3.kicker": "Étiquette scène 3",
  "s3.line": "Message scène 3",
  "s4.kicker": "Étiquette scène 4",
  "s4.line": "Message scène 4",
  "s5.kicker": "Étiquette scène 5",
  "s5.line": "Message scène 5",
  "s6.kicker": "Étiquette scène 6",
  "s6.line": "Message scène 6",
  "s7.kicker": "Étiquette scène 7",
  "s7.line": "Message scène 7",
  "s8.kicker": "Étiquette scène 8",
  "s8.line": "Message scène 8",
  "finale.eyebrow": "Et voilà,",
  "finale.title": "Titre de fin accrocheur",
  "finale.sub": "Sous-titre de fin"
}

Règles :
- Langue : ${langue || 'Français'}
- Ton : ${tone || 'Tendre'}
- Occasion : ${occasion || 'Anniversaire'}
- Kickers < 30 caractères, lignes < 90 caractères
- Messages personnalisés à la description fournie
- PAS de markdown, PAS d'explication - JUSTE le JSON`;

  const isCloudflare = apiBase.includes('cloudflare.com');

  // Cloudflare Workers AI : URL = base complète (modèle dans l'URL), réponse dans result.response
  // OpenAI-compatible : URL = base + /chat/completions, modèle dans le body, réponse dans choices[0].message.content
  const url = isCloudflare ? apiBase : `${apiBase}/chat/completions`;
  const body: Record<string, unknown> = {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt || "Crée un site d'anniversaire touchant." },
    ],
    max_tokens: 2048,
  };
  if (!isCloudflare) body.model = model || 'gpt-4o-mini';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[/api/generate] Erreur API amont', res.status, errBody);
      let detail = errBody;
      try {
        detail = JSON.parse(errBody)?.error?.message || errBody;
      } catch {
        /* pas JSON */
      }
      return new Response(JSON.stringify({ error: `Erreur API (${res.status}) : ${detail}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const content = isCloudflare ? data.result?.response : data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ error: "Réponse vide de l'IA." }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      console.error('[/api/generate] Aucun objet JSON dans la réponse :', content);
      return new Response(JSON.stringify({ error: 'Réponse IA invalide (pas de JSON).' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const parsed = flattenAiJson(JSON.parse(content.slice(start, end + 1)));
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[/api/generate] Exception inattendue', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
