/**
 * Converts a File object to a Base64 string.
 * This is useful for saving small images in LocalStorage for mockup purposes.
 * 
 * @param {File} file 
 * @returns {Promise<string>}
 */
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
