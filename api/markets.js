export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const maxDate = new Date(Date.now() + 14 * 86400000).toISOString();
  const url = `https://gamma-api.polymarket.com/events?active=true&closed=false&limit=200&end_date_max=${maxDate}&order=end_date_min&ascending=true`;
  try {
    const events = await fetch(url).then(r => r.json());
    const markets = [];
    for (const ev of events) {
      const tags = (ev.tags || []).map(t => t.label || t.slug || String(t)).filter(Boolean);
      for (const m of (ev.markets || [])) {
        markets.push({ ...m, _tags: tags });
      }
    }
    res.status(200).json(markets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
