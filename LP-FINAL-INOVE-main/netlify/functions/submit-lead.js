/* Netlify Function: submit-lead
   Proxies form submissions to Make webhook to avoid CORS and ensure proper JSON.
   Required env var: MAKE_WEBHOOK_URL
*/

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing MAKE_WEBHOOK_URL environment variable' }) };
    }

    const data = JSON.parse(event.body || '{}');
    const { nome, celular } = data;

    if (!nome || !celular) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Nome e celular são obrigatórios.' }) };
    }

    const payload = {
      nome,
      celular,
      data: new Date().toISOString(),
      origem: 'Site Inove Odontologia',
      userAgent: event.headers['user-agent'] || '',
      ip: event.headers['x-forwarded-for'] || event.ip || '',
    };

    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Upstream webhook error', status: resp.status }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error', details: String(err) }) };
  }
}
