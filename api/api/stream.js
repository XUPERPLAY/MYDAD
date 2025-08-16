// api/stream.js
const axios = require('axios');

export default async function handler(req, res) {
  const num = req.query.num || 1;
  const url = `https://thedaddy.top/cast/stream-${num}.php`;

  try {
    // 1. Obtiene HTML con el m3u8
    const html = await axios.get(url, {
      headers: {
        'Origin': 'https://thedaddy.top',
        'Referer': 'https://thedaddy.top/',
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15'
      }
    });

    // 2. Extrae la URL m3u8 real
    const match = html.data.match(/(https?:[^\s"\']+\.m3u8[^\s"\']*)/);
    if (!match) return res.status(404).send('#EXTM3U\n#EXT-X-ERROR: no encontrado');

    // 3. Devuelve el m3u8 limpio
    const m3u8 = await axios.get(match[1], {
      headers: { Referer: 'https://thedaddy.top' }
    });
    
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(m3u8.data);

  } catch (e) {
    res.status(500).send('#EXTM3U\n#EXT-X-ERROR: servidor no disponible');
  }
}
