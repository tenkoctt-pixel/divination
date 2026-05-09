export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { prompt } = req.body;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
        'HTTP-Referer': 'https://divination.vercel.app',
        'X-Title': '此时此刻'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '星辰暂时沉默，请稍后再试。';
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ text: '占卜连接失败，请稍后再试。' });
  }
}
