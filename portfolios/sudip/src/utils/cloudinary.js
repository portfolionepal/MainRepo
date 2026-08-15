/**
 * Uploads a file to Cloudinary using unsigned upload.
 *
 * IMPORTANT: The current upload preset ("sudip-preset") does NOT allow overwriting
 * existing assets. Uploading with the same public_id returns the OLD image unchanged.
 * Therefore, every upload MUST use a unique public_id to guarantee the new image is stored.
 *
 * Strategy: Use a descriptive prefix + timestamp to create unique-but-meaningful IDs.
 * Example: "blog-items-1-image-1786777200000"
 *
 * @param {File} file - The file to upload
 * @param {string|null} descriptivePrefix - A human-readable prefix for the public_id (e.g. "blog-items-1-image")
 * @returns {Promise<{url: string, imageUrl: string, publicId: string}>}
 */
export const uploadToCloudinary = async (file, descriptivePrefix = null) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("[Cloudinary] Config missing: VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET");
    throw new Error("Cloudinary configuration is missing. Check your .env file.");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  // Always generate a UNIQUE public_id so the upload is never blocked by existing assets.
  // The descriptive prefix keeps things human-readable in the Cloudinary dashboard.
  if (descriptivePrefix) {
    const uniqueId = `${descriptivePrefix}-${Date.now()}`;
    formData.append('public_id', uniqueId);
  }

  try {
    console.log("[Cloudinary] Starting upload...", descriptivePrefix ? `prefix: ${descriptivePrefix}` : "no prefix");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Cloudinary] Upload failed:", data.error?.message);
      throw new Error(data.error?.message || 'Cloudinary upload failed');
    }

    const rawUrl = data.secure_url || data.url;
    if (!rawUrl) {
      console.error("[Cloudinary] No URL in response:", data);
      throw new Error('Cloudinary returned no image URL');
    }

    // Append cache-busting timestamp so the browser never shows a stale cached image
    const cleanUrl = rawUrl.split('?')[0];
    const finalUrl = `${cleanUrl}?t=${Date.now()}`;

    console.log("[Cloudinary] Upload successful:", data.public_id);

    return {
      url: finalUrl,
      imageUrl: finalUrl,
      publicId: data.public_id
    };
  } catch (error) {
    console.error("[Cloudinary] Upload error:", error);
    throw error;
  }
};

/**
 * Safely extracts a display-ready string URL from an image field.
 *
 * Handles all data shapes that exist in the project:
 * - Plain string URL: "https://..."
 * - Object with imageUrl: { imageUrl: "https://...", publicId: "..." }
 * - Object with url: { url: "https://..." }
 * - Nested object (legacy from previous bug): { imageUrl: "...", image: "...", publicId: "..." }
 *
 * @param {string|object} field - The image field value
 * @param {string} defaultFallback - Fallback if nothing is found
 * @returns {string} A display-ready URL string
 */
export const getImageUrl = (field, defaultFallback = '') => {
  if (!field) return defaultFallback;

  if (typeof field === 'string') return field;

  if (typeof field === 'object' && field !== null) {
    return field.imageUrl || field.url || field.secure_url || field.src || field.image || field.coverImage || defaultFallback;
  }

  return defaultFallback;
};

/**
 * Generates a descriptive prefix for Cloudinary public_ids.
 * This is NOT used as the final public_id — a timestamp is appended to ensure uniqueness.
 *
 * @param {string} pageId - e.g. "blog", "about", "home"
 * @param {string|null} arrayKey - e.g. "items", "steps", null for non-array fields
 * @param {number|null} index - Array index
 * @param {object|null} item - The array item (to extract item.id if available)
 * @param {string} itemKey - The field key, e.g. "image", "bgImage", "heroImage"
 * @returns {string} A descriptive prefix like "blog-items-1-image"
 */
export const generateStablePublicId = (pageId, arrayKey, index, item, itemKey) => {
  const sanitize = (str) => String(str).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();

  const cleanPageId = sanitize(pageId || 'general');

  if (arrayKey !== null && arrayKey !== undefined) {
    const cleanArrayKey = sanitize(arrayKey);
    const itemId = item && item.id ? sanitize(item.id) : index;
    const cleanItemKey = itemKey ? sanitize(itemKey) : 'image';
    return `${cleanPageId}-${cleanArrayKey}-${itemId}-${cleanItemKey}`;
  }

  const cleanItemKey = sanitize(itemKey || 'image');
  return `${cleanPageId}-${cleanItemKey}`;
};
