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
      "https://sudeepbasnet.com/upload.php",
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

  if (typeof field === 'string') {
    return field;
  }

  if (typeof field === 'object' && field !== null) {
    return (
      field.imageUrl ||
      field.url ||
      field.secure_url ||
      field.src ||
      field.image ||
      field.coverImage ||
      defaultFallback
    );
  }

  return defaultFallback;
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