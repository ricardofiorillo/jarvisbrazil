// api/send.js — Serverless function (Vercel) / Netlify Function
// Proxies the WhatsApp send request to Evolution API to avoid CORS issues

export default async function handler(req, res) {
  // CORS headers (permite chamada do frontend na mesma origem)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { evolutionUrl, evolutionKey, instanceName, phone, message } = req.body;

  if (!evolutionUrl || !evolutionKey || !instanceName || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Formata o número: remove não-dígitos, garante código do país
  const cleanPhone = phone.replace(/\D/g, '');

  try {
    const endpoint = `${evolutionUrl}/message/sendText/${instanceName}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': evolutionKey,
      },
      body: JSON.stringify({
        number: cleanPhone,
        options: {
          delay: 500,
          presence: 'composing',
        },
        textMessage: {
          text: message,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[AlarmZap] Evolution API error:', data);
      return res.status(response.status).json({ error: 'Evolution API returned error', details: data });
    }

    return res.status(200).json({ success: true, messageId: data?.key?.id || null });

  } catch (err) {
    console.error('[AlarmZap] Fetch error:', err.message);
    return res.status(500).json({ error: 'Failed to reach Evolution API', message: err.message });
  }
}
