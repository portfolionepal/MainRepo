/**
 * Uploads an image to Hostinger.
 *
 * The React app is hosted on Vercel, while the media files
 * are stored on the client's Hostinger hosting.
 *
 * @param {File} file - The file to upload
 * @param {string|null} descriptivePrefix - Optional descriptive prefix
 * @returns {Promise<{url: string, imageUrl: string, publicId: string}>}
 */
export const uploadMedia = async (file, descriptivePrefix = null) => {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log(
      "[Hostinger] Starting upload...",
      descriptivePrefix
        ? `prefix: ${descriptivePrefix}`
        : "no prefix"
    );

    const response = await fetch(
      "https://media.sudeepbasnet.com/upload.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("[Hostinger] Upload failed:", data);
      throw new Error(
        data.error || "Hostinger upload failed"
      );
    }

    if (!data.url) {
      console.error("[Hostinger] No URL returned:", data);
      throw new Error("Hostinger returned no image URL.");
    }

    console.log(
      "[Hostinger] Upload successful:",
      data.fileName
    );

    return {
      url: data.url,
      imageUrl: data.imageUrl || data.url,
      publicId: data.fileName || null,
    };
  } catch (error) {
    console.error("[Hostinger] Upload error:", error);
    throw error;
  }
};

/**
 * Downloads an external image from a URL as a Blob/File and uploads it to Hostinger.
 * Handles relative URLs, hotlink protection, and multiple CORS proxy fallbacks.
 *
 * @param {string} imageUrl - External image URL to fetch and re-upload
 * @param {string|null} descriptivePrefix - Optional prefix for filename
 * @param {string|null} targetSiteUrl - Original webpage URL (used to resolve relative image paths)
 * @returns {Promise<string>} The uploaded Hostinger media URL (https://media.sudeepbasnet.com/...)
 */
export const uploadImageFromUrl = async (imageUrl, descriptivePrefix = null, targetSiteUrl = null) => {
  if (!imageUrl) return '';

  // Resolve relative or protocol-relative image URLs
  let fullImageUrl = imageUrl.trim();
  if (fullImageUrl.startsWith('//')) {
    fullImageUrl = `https:${fullImageUrl}`;
  } else if (fullImageUrl.startsWith('/') && targetSiteUrl) {
    try {
      const siteOrigin = new URL(targetSiteUrl).origin;
      fullImageUrl = `${siteOrigin}${fullImageUrl}`;
    } catch (e) {
      console.warn('[uploadImageFromUrl] Could not resolve relative URL origin:', fullImageUrl);
    }
  }

  try {
    let response = null;
    const fetchMethods = [
      // 1. Direct fetch with no-referrer (bypasses hotlink protection on news sites like nepalnews)
      () => fetch(fullImageUrl, { referrerPolicy: 'no-referrer' }),
      // 2. High-performance image CDN proxy (converts and serves remote images reliably)
      () => fetch(`https://images.weserv.nl/?url=${encodeURIComponent(fullImageUrl)}`),
      // 3. General CORS proxies
      () => fetch(`https://corsproxy.io/?${encodeURIComponent(fullImageUrl)}`),
      () => fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(fullImageUrl)}`),
    ];

    for (const fetchFn of fetchMethods) {
      try {
        const res = await fetchFn();
        if (res && res.ok) {
          response = res;
          break;
        }
      } catch (err) {
        // Try next fallback strategy
      }
    }

    if (!response || !response.ok) {
      throw new Error(`Failed to download external image from ${fullImageUrl}`);
    }

    const blob = await response.blob();
    if (!blob || blob.size === 0) {
      throw new Error('Downloaded image blob is empty.');
    }

    const contentType = blob.type || 'image/jpeg';
    
    let ext = 'jpg';
    if (contentType.includes('png')) ext = 'png';
    else if (contentType.includes('webp')) ext = 'webp';
    else if (contentType.includes('gif')) ext = 'gif';
    else if (contentType.includes('svg')) ext = 'svg';

    const filename = `${descriptivePrefix || 'fetched'}_${Date.now()}.${ext}`;
    const file = new File([blob], filename, { type: contentType });

    // Upload to media.sudeepbasnet.com using existing unchanged uploadMedia utility
    const uploadResult = await uploadMedia(file, descriptivePrefix);
    return uploadResult.imageUrl;
  } catch (error) {
    console.error('[uploadImageFromUrl] Error re-hosting external image:', error);
    throw error;
  }
};




/**
 * Safely extracts a display-ready string URL from an image field.
 *
 * Handles:
 * - Plain string URL
 * - Object with imageUrl
 * - Object with url
 * - Object with secure_url
 * - Legacy nested image objects
 *
 * @param {string|object} field - The image field value
 * @param {string} defaultFallback - Fallback if nothing is found
 * @returns {string} A display-ready URL string
 */
export const getImageUrl = (field, defaultFallback = '') => {
  if (!field) return defaultFallback;

  let finalUrl = defaultFallback;

  if (typeof field === 'string') {
    finalUrl = field;
  } else if (typeof field === 'object' && field !== null) {
    finalUrl = (
      field.imageUrl ||
      field.url ||
      field.secure_url ||
      field.src ||
      field.image ||
      field.coverImage ||
      defaultFallback
    );
  }

  if (typeof finalUrl === 'string') {
    finalUrl = finalUrl.replace('https://www.sudeepbasnet.com/media/', 'https://media.sudeepbasnet.com/media/');
    finalUrl = finalUrl.replace('https://sudeepbasnet.com/media/', 'https://media.sudeepbasnet.com/media/');
  }

  return finalUrl;
};

/**
 * Generates a descriptive identifier for an uploaded image.
 *
 * This is kept for compatibility with the existing application.
 * Hostinger itself generates the actual unique filename.
 *
 * @param {string} pageId - e.g. "blog", "about", "home"
 * @param {string|null} arrayKey - e.g. "items", "steps", null
 * @param {number|null} index - Array index
 * @param {object|null} item - Array item
 * @param {string} itemKey - Field key, e.g. "image", "bgImage"
 * @returns {string} A descriptive identifier
 */
export const generateStablePublicId = (
  pageId,
  arrayKey,
  index,
  item,
  itemKey
) => {
  const sanitize = (str) =>
    String(str)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .toLowerCase();

  const cleanPageId = sanitize(pageId || "general");

  if (arrayKey !== null && arrayKey !== undefined) {
    const cleanArrayKey = sanitize(arrayKey);
    const itemId =
      item && item.id
        ? sanitize(item.id)
        : index;

    const cleanItemKey = itemKey
      ? sanitize(itemKey)
      : "image";

    return `${cleanPageId}-${cleanArrayKey}-${itemId}-${cleanItemKey}`;
  }

  const cleanItemKey = sanitize(
    itemKey || "image"
  );

  return `${cleanPageId}-${cleanItemKey}`;
};