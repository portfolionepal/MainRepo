// Shared Cloudinary upload helper
export async function uploadToCloudinary(file, isPdf = false) {
  const maxSize = isPdf ? 2 * 1024 * 1024 : 1 * 1024 * 1024; // 2MB for PDF, 1MB for Image
  if (file.size > maxSize) {
    throw new Error(`File is too large. Maximum size is ${isPdf ? '2MB' : '1MB'}.`);
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  const res = await fetch(url, { method: 'POST', body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Cloudinary upload failed');
  return data.secure_url;
}

// Extract Cloudinary Public ID from a secure URL
export function getCloudinaryPublicId(url) {
  if (!url || !url.includes('cloudinary.com')) return null;
  // URL format: https://res.cloudinary.com/cloudname/image/upload/v1234/folder/filename.ext
  const parts = url.split('/');
  const uploadIndex = parts.findIndex(p => p === 'upload');
  if (uploadIndex === -1) return null;
  
  // parts[uploadIndex + 1] is usually the version number (e.g. v1612345678)
  // Everything after that, without the extension, is the public ID
  const publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
  return publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.')) || publicIdWithExt;
}

// Client-side helper to call our Vercel Serverless Function to delete
export async function deleteFromCloudinary(url) {
  const publicId = getCloudinaryPublicId(url);
  if (!publicId) return;

  try {
    await fetch('/api/delete-cloudinary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId })
    });
  } catch (err) {
    console.error('Failed to delete image from Cloudinary:', err);
  }
}

// Shared form field component
export function Field({ label, id, value, onChange, type = 'text', placeholder = '', required = false, rows }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}{required && ' *'}</label>
      {rows ? (
        <textarea id={id} rows={rows} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}
