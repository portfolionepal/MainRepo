import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { public_id } = req.body;
  if (!public_id) {
    return res.status(400).json({ error: 'Missing public_id' });
  }

  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary keys. Ensure CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set in Vercel.');
    return res.status(500).json({ error: 'Missing Cloudinary configuration' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  // Signature strictly requires parameters to be alphabetically sorted.
  const signatureString = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

  const formData = new URLSearchParams();
  formData.append('public_id', public_id);
  formData.append('timestamp', timestamp);
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    if (data.result === 'ok' || data.result === 'not found') {
      return res.status(200).json({ success: true, result: data });
    } else {
      return res.status(400).json({ success: false, result: data });
    }
  } catch (err) {
    console.error('Destroy request failed:', err);
    return res.status(500).json({ error: 'Cloudinary API request failed' });
  }
}
