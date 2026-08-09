export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract metadata using Regex
    const getMetaTag = (property) => {
      const regex = new RegExp(`<meta[^>]*?(?:property|name)=["']${property}["'][^>]*?content=["']([^"']*)["']`, 'i');
      const match = html.match(regex);
      if (match) return match[1];
      
      // Try reverse attribute order: content="..." property="..."
      const reverseRegex = new RegExp(`<meta[^>]*?content=["']([^"']*)["'][^>]*?(?:property|name)=["']${property}["']`, 'i');
      const reverseMatch = html.match(reverseRegex);
      return reverseMatch ? reverseMatch[1] : null;
    };

    let title = getMetaTag('og:title') || getMetaTag('twitter:title');
    let image = getMetaTag('og:image') || getMetaTag('twitter:image');

    // Fallback to <title> tag
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) title = titleMatch[1].trim();
    }

    return res.status(200).json({ title, image });
  } catch (error) {
    console.error('Metadata fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}
