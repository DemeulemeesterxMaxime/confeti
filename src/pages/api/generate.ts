export const prerender = false;

export async function POST({ request }: { request: Request }) {
  const { prompt, tone, occasion, langue } = await request.json();

  const apiBase = import.meta.env.AI_API_BASE_URL;
  const apiKey = import.meta.env.AI_API_KEY;
  const model = import.meta.env.AI_MODEL;

  if (!apiBase || !apiKey) {
    return new Response(JSON.stringify({ error: 'IA non configurée sur ce serveur.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const systemPrompt = `Tu génères le contenu textuel d'un site d'anniversaire pour le modèle "romantic-scroll".
Réponds UNIQUEMENT avec un objet JSON valide contenant ces clés exactes :
- "name" : prénom de la personne fêtée
- "opening.eyebrow" : court sur-titre d'ouverture (ex: "Pour toi,")
- "opening.title" : titre d'ouverture (ex: "Joyeux anniversaire Marie !")
- "s1.kicker" à "s8.kicker" : étiquette courte de chaque scène (< 30 caractères)
- "s1.line" à "s8.line" : message de chaque scène (1-2 phrases, < 90 caractères)
- "finale.eyebrow" : sur-titre de fin (ex: "Et voilà,")
- "finale.title" : titre de fin accrocheur
- "finale.sub" : sous-titre de fin

Règles :
- Langue : ${langue || 'Français'}
- Ton : ${tone || 'Tendre'}
- Occasion : ${occasion || 'Anniversaire'}
- Messages courts, touchants, personnalisés à la description fournie
- PAS de markdown, PAS d'explication — JUSTE le JSON`;

  try {
    const res = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'openrouter/fusion',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt || "Crée un site d'anniversaire touchant." },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Erreur API (${res.status}).` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(JSON.stringify({ error: 'Réponse vide de l\'IA.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const parsed = JSON.parse(content);
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erreur inattendue.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
