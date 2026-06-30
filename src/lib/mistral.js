const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 4 200 €
- Crétacé -65M (dinosaures, nature préhistorique) — à partir de 6 800 €
- Florence 1504 (Renaissance, art, Michel-Ange) — à partir de 3 900 €

Tu peux suggérer des destinations selon les intérêts du client.
Réponds toujours en français, de façon concise (3-4 phrases maximum sauf si on te demande des détails).`;

export async function sendChatMessage(messages, apiKey) {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur API Mistral: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
