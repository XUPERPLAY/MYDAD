import axios from 'axios';

export default async function handler(req, res) {
  const num = parseInt(req.query.num || 1, 10);
  const url = `https://thedaddy.top/cast/stream-${num}.php`;

  try {
    const html = await axios.get(url, {
      headers: {
        'Origin': 'https://thedaddy.top',
        'Referer': 'https://thedaddy.top/',
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15'
      }
    });

    // Extrae el m3u8 real
    const match = html.data.match(/"hlsUrl":"([^"]+)"/);
    if (!match) return res.status(404).send('#EXTM3U\n#EXT-X-ERROR: no encontrado');

    const m3u8 = await axios.get(match[1], { headers: { Referer: 'https://thedaddy.top' } });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(m3u8.data);

  } catch (e) {
    res.status(500).send('#EXTM3U\n#EXT-X-ERROR: servidor no disponible');
  }
}
