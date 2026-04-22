export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const maxDate = new Date(Date.now() + 14 * 86400000).toISOString();
  const url = `https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=500&end_date_max=${maxDate}&order=end_date_min&ascending=true`;
  try {
    const data = await fetch(url).then(r => r.json());
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
