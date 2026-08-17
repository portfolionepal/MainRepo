import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { Plus, Trash2, Save, Check, AlertCircle } from 'lucide-react';
import { uploadMedia, getImageUrl, generateStablePublicId } from '../utils/upload';
import { motion, AnimatePresence } from 'framer-motion';

export default function GenericEditor() {
  const { pageId } = useParams();
  const { siteContent, updatePageContent } = useAdminContext();
  
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'error' }
  const [uploadingField, setUploadingField] = useState(null); // Track WHICH field is uploading

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /**
   * Handles file upload for both array and non-array image fields.
   *
   * CRITICAL DESIGN DECISIONS:
   * 1. For NON-ARRAY fields (e.g. about.bgImage): stores as string URL (not object).
   *    This is simpler and backward-compatible with all existing frontend pages.
   * 2. For ARRAY fields (e.g. blog.items[0].image): stores as string URL directly
   *    on the item field. Does NOT wrap in { imageUrl, publicId } object because
   *    that creates nested objects that break rendering and subsequent edits.
   * 3. Upload always succeeds or fails cleanly — no silent failures.
   */
  const handleFileUpload = async (e, isArray, arrayKey, index, itemKey) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Track which specific field is uploading (for per-field loading indicators)
    const fieldId = isArray ? `${arrayKey}-${index}-${itemKey}` : itemKey;
    setUploadingField(fieldId);
    const targetInput = e.target; // Save reference before async work
    
    try {
      // Generate a descriptive prefix for the Hostinger upload
      let existingItem = null;
      if (isArray) {
        existingItem = formData[arrayKey] ? formData[arrayKey][index] : null;
      }

      const prefix = generateStablePublicId(pageId, arrayKey, index, existingItem, itemKey);
      
      console.log(`[Upload] Starting upload for field: ${fieldId}, prefix: ${prefix}`);

      // Upload to Hostinger
      const uploadResult = await uploadMedia(file, prefix);

      console.log(`[Upload] Success! URL: ${uploadResult.imageUrl}`);

      // Store the plain URL string — keeps data flat and compatible with all frontend pages
      const newUrl = uploadResult.imageUrl;

      if (isArray) {
        // For array items: set item[itemKey] = url string directly
        setFormData(prev => {
          const newArray = [...(prev[arrayKey] || [])];
          newArray[index] = { ...newArray[index], [itemKey]: newUrl };
          return { ...prev, [arrayKey]: newArray };
        });
      } else {
        // For top-level fields: set formData[itemKey] = url string directly
        setFormData(prev => ({ ...prev, [itemKey]: newUrl }));
      }

      console.log(`[Upload] State updated for ${fieldId}`);
    } catch (error) {
      console.error(`[Upload] Failed for ${fieldId}:`, error);
      showToast(`Failed to upload image: ${error.message || 'Unknown error'}`, 'error');
    } finally {
      setUploadingField(null);
      // Reset the file input so the same file can be selected again
      if (targetInput) {
        targetInput.value = '';
      }
    }
  };

  const handleMultiFileUpload = async (e, arrayKey, index, itemKey, currentArray) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    const fieldId = `${arrayKey}-${index}-${itemKey}`;
    setUploadingField(fieldId);
    const targetInput = e.target;
    
    try {
      const uploadPromises = files.map((file, i) => {
        const prefix = `multi_${Date.now()}_${i}`;
        return uploadMedia(file, prefix);
      });
      
      const results = await Promise.all(uploadPromises);
      const newUrls = results.map(r => r.imageUrl);
      
      setFormData(prev => {
        const newArray = [...(prev[arrayKey] || [])];
        const updatedItem = { ...newArray[index] };
        updatedItem[itemKey] = [...(currentArray || []), ...newUrls];
        newArray[index] = updatedItem;
        return { ...prev, [arrayKey]: newArray };
      });
    } catch (error) {
      console.error(`[Upload] Failed for ${fieldId}:`, error);
      showToast(`Failed to upload images: ${error.message || 'Unknown error'}`, 'error');
    } finally {
      setUploadingField(null);
      if (targetInput) targetInput.value = '';
    }
  };

  // Load page data into local form state when navigating to a different page.
  // ONLY depends on pageId — NOT siteContent — so uploads and edits are never wiped out
  // by background context updates.
  useEffect(() => {
    if (siteContent && siteContent[pageId]) {
      let data = JSON.parse(JSON.stringify(siteContent[pageId]));
      
      // Data migration for blog items: ensure both 'url' and 'content' exist
      if (pageId === 'blog' && data.items) {
        data.items = data.items.map(item => {
          if (!('url' in item)) item.url = '';
          if (!('content' in item)) item.content = '';
          if ('excerpt' in item) {
            item.description = item.excerpt;
            delete item.excerpt;
          }
          return item;
        });
      }
      
      // Data migration for gallery items to support unbounded images array
      if (pageId === 'gallery' && data.items) {
        data.items = data.items.map(item => {
          if (!item.images) {
            item.images = [];
            if (item.image1) item.images.push(item.image1);
            if (item.image2) item.images.push(item.image2);
            if (item.image3) item.images.push(item.image3);
            if (item.url) item.images.push(item.url);
            if (item.image) item.images.push(item.image);
            if (item.imageUrl) item.images.push(item.imageUrl);
          }
          delete item.image1;
          delete item.image2;
          delete item.image3;
          delete item.url;
          delete item.image;
          delete item.imageUrl;
          return item;
        });
      }
      
      setFormData(data);
    } else {
      setFormData({ title: `Placeholder for ${pageId}` });
    }
  }, [pageId]);

  // Reset success message when navigating to a different page
  useEffect(() => {
    setToast(null);
  }, [pageId]);

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayChange = (arrayKey, index, itemKey, value) => {
    setFormData(prev => {
      const newArray = [...(prev[arrayKey] || [])];
      if (itemKey === null) {
        // It's an array of strings/primitives
        newArray[index] = value;
      } else {
        newArray[index] = { ...newArray[index], [itemKey]: value };
      }
      return { ...prev, [arrayKey]: newArray };
    });
  };

  const handleFetchMetadata = async (arrayKey, index, url) => {
    if (!url) return showToast('Please enter a valid URL first.', 'error');
    try {
      setUploadingField(`${arrayKey}-${index}-fetchMetadata`);
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        const metadata = data.data;
        setFormData(prev => {
          const newArray = [...(prev[arrayKey] || [])];
          const item = { ...newArray[index] };
          
          if (metadata.title) item.title = metadata.title;
          if (metadata.description) {
            item.description = metadata.description;
          }
          if (metadata.image?.url) {
            item.image = metadata.image.url;
          }
          newArray[index] = item;
          return { ...prev, [arrayKey]: newArray };
        });
        showToast('Metadata fetched successfully!', 'success');
      } else {
        showToast('Could not fetch metadata for this URL.', 'error');
      }
    } catch (error) {
      console.error('Fetch metadata error:', error);
      showToast('Error fetching metadata. The site might be blocking it.', 'error');
    } finally {
      setUploadingField(null);
    }
  };

  const handleAddItem = (arrayKey) => {
    setFormData(prev => {
      const currentArray = prev[arrayKey] || [];
      const templateItem = currentArray.length > 0 ? currentArray[0] : {};
      
      let newItem;
      if (typeof templateItem === 'string') {
        newItem = '';
      } else {
        // Create a blank copy of the template's shape
        newItem = Object.keys(templateItem).reduce((acc, k) => {
          const templateVal = templateItem[k];
          if (k === 'id') {
            acc[k] = Date.now();
          } else if (typeof templateVal === 'number') {
            acc[k] = 0;
          } else if (typeof templateVal === 'object' && templateVal !== null) {
            // If the template value is an object (e.g. nested image data from legacy),
            // create an empty string to keep it simple
            acc[k] = '';
          } else {
            acc[k] = '';
          }
          return acc;
        }, {});
        
        // Explicitly inject url and content fields for blog items if missing in legacy data
        if (pageId === 'blog') {
          if (!('url' in newItem)) newItem.url = '';
          if (!('content' in newItem)) newItem.content = '';
        }
        
        // Explicitly inject multiple images for gallery
        if (pageId === 'gallery') {
          newItem.images = [];
        }
      }

      return { ...prev, [arrayKey]: [...currentArray, newItem] };
    });
  };

  const handleRemoveItem = (arrayKey, index) => {
    if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      setFormData(prev => {
        const newArray = [...(prev[arrayKey] || [])];
        newArray.splice(index, 1);
        return { ...prev, [arrayKey]: newArray };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving || uploadingField) return; // Prevent double-submit

    setIsSaving(true);
    
    try {
      console.log(`[Save] Saving page "${pageId}" to Firestore...`);
      await updatePageContent(pageId, formData);
      console.log(`[Save] Success!`);
      showToast('Changes saved successfully!', 'success');
    } catch (err) {
      console.error(`[Save] Failed:`, err);
      showToast(`Failed to save changes: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to format camelCase keys into Readable Labels
  const formatLabel = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const isImageKey = (key) => {
    if (typeof key !== 'string') return false;
    const k = key.toLowerCase();
    return k.includes('image') || k.includes('url') || k.includes('logo') || k.includes('photo') || k.includes('pic') || k.includes('bg') || k.includes('sign') || k.includes('portrait') || k.includes('banner') || k.includes('avatar');
  };

  /**
   * Extract a display-ready string from any field value.
   * Handles: plain strings, { imageUrl, publicId } objects, and other legacy shapes.
   */
  const getDisplayValue = (val) => {
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val !== null) {
      return getImageUrl(val);
    }
    return String(val ?? '');
  };

  /**
   * Sort object keys into a consistent display order for array items:
   * 1. Title / Name fields first
   * 2. Short text fields (role, category, date, type, location, etc.)
   * 3. Long text fields (description, content, excerpt, overview, text, etc.)
   * 4. Image / URL fields last
   * This prevents the random key ordering that Object.entries can produce.
   */
  const sortItemKeys = (entries) => {
    const getPriority = (key) => {
      const k = key.toLowerCase();
      // Title/name always first
      if (k === 'title' || k === 'name') return 0;
      // Short metadata fields
      if (k === 'role' || k === 'category' || k === 'date' || k === 'type' || k === 'location') return 1;
      // Image/URL fields always last
      if (isImageKey(key)) return 3;
      // Long text fields near the end but before images
      if (k === 'description' || k === 'content' || k === 'excerpt' || k === 'overview' || k === 'text' || k === 'desc') return 2;
      // Everything else in the middle
      return 1.5;
    };
    return [...entries].sort((a, b) => getPriority(a[0]) - getPriority(b[0]));
  };

  if (!siteContent[pageId] && Object.keys(formData).length === 0) {
    return <div className="text-gray-500">Loading editor for {pageId}...</div>;
  }

  const isUploading = uploadingField !== null;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize font-serif border-b pb-4">
          Editing: {pageId.replace(/([A-Z])/g, " $1")}
        </h1>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className={`fixed top-6 right-6 z-50 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-[#0B7A38]'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle className="w-6 h-6" /> : <Check className="w-6 h-6" />}
            <span className="font-semibold text-lg">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          {Object.entries(formData).map(([key, value]) => {
            if (key === 'methodology' || key === 'audience' || key === 'twitterUrl') return null;
            if (Array.isArray(value)) {
              return (
                <div key={key} className="border border-gray-200 rounded-xl bg-gray-50 p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-gray-800">{formatLabel(key)} List</h2>
                    <button 
                      type="button" 
                      onClick={() => handleAddItem(key)}
                      className="flex items-center text-sm font-medium text-white bg-primary hover:bg-primary-light px-4 py-2 rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Item
                    </button>
                  </div>
                  
                  {value.map((item, index) => (
                    <div key={item?.id || index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative">
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem(key, index)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Item {index + 1}</h3>
                      
                      <div className="space-y-4">
                        {typeof item === 'object' && item !== null ? (
                          sortItemKeys(Object.entries(item)).map(([itemKey, itemVal]) => {
                            if (itemKey === 'id') return null; // Don't edit internal IDs
                            // Skip publicId fields that leaked from legacy uploads
                            if (itemKey === 'publicId' || itemKey === 'imageUrl') return null;
                            
                            const thisFieldId = `${key}-${index}-${itemKey}`;
                            const isThisUploading = uploadingField === thisFieldId;

                            if (Array.isArray(itemVal)) {
                              return (
                                <div key={itemKey} className="col-span-full">
                                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    {formatLabel(itemKey)}
                                  </label>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {itemVal.map((imgUrl, imgIdx) => (
                                      <div key={imgIdx} className="relative w-20 h-20 group">
                                        <img src={getImageUrl(imgUrl)} alt="Preview" className="w-full h-full object-cover rounded" />
                                        <button 
                                          type="button"
                                          onClick={() => {
                                            const newArr = [...itemVal];
                                            newArr.splice(imgIdx, 1);
                                            handleArrayChange(key, index, itemKey, newArr);
                                          }}
                                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center">
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      multiple
                                      onChange={(e) => handleMultiFileUpload(e, key, index, itemKey, itemVal)}
                                      disabled={isThisUploading}
                                      className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                                    />
                                    {isThisUploading && <span className="text-xs text-blue-600 ml-2 animate-pulse">Uploading...</span>}
                                  </div>
                                </div>
                              );
                            }
                            
                            const isImageField = isImageKey(itemKey);
                            const displayVal = getDisplayValue(itemVal);
                            const isLongText = !isImageField && typeof displayVal === 'string' && displayVal.length > 50;
                            
                            return (
                              <div key={itemKey}>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  {formatLabel(itemKey)}
                                </label>
                                {isLongText ? (
                                  <textarea
                                    value={displayVal}
                                    onChange={(e) => handleArrayChange(key, index, itemKey, e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-colors min-h-[80px] text-sm text-gray-800"
                                  />
                                ) : (
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={displayVal}
                                        onChange={(e) => handleArrayChange(key, index, itemKey, e.target.value)}
                                        placeholder={isImageField ? "Enter image URL or upload below" : ""}
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-sm text-gray-800"
                                      />
                                      {itemKey.toLowerCase() === 'url' && (
                                        <button
                                          type="button"
                                          onClick={() => handleFetchMetadata(key, index, displayVal)}
                                          disabled={isThisUploading || !displayVal}
                                          className={`shrink-0 px-3 py-2 bg-red-600 text-white text-xs font-bold rounded-md transition-colors ${
                                            (isThisUploading || !displayVal) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                                          }`}
                                        >
                                          {isThisUploading ? 'Fetching...' : 'Fetch Metadata'}
                                        </button>
                                      )}
                                    </div>
                                    {isImageField && (
                                      <div className="mt-2 flex items-center">
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          onChange={(e) => handleFileUpload(e, true, key, index, itemKey)}
                                          disabled={isUploading}
                                          className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                                        />
                                        {displayVal && (displayVal.startsWith('http') || displayVal.startsWith('data:image')) && <span className="text-xs text-green-600 ml-2">Image loaded</span>}
                                        {isThisUploading && <span className="text-xs text-blue-600 ml-2 animate-pulse">Uploading...</span>}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          // Handle array of strings (e.g. objectives list)
                          <div>
                            <textarea
                              value={item}
                              onChange={(e) => handleArrayChange(key, index, null, e.target.value)}
                              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-colors min-h-[80px] text-sm text-gray-800"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            // --- Non-array fields ---
            const isImageField = isImageKey(key);
            // Skip publicId/imageUrl keys that leaked to top-level from legacy uploads
            if (key === 'publicId' || (key === 'imageUrl' && formData[key.replace('imageUrl', '')] !== undefined)) return null;
            
            const displayVal = getDisplayValue(value);
            const isLongText = !isImageField && typeof displayVal === 'string' && displayVal.length > 60;
            const thisFieldId = key;
            const isThisUploading = uploadingField === thisFieldId;
            
            return (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formatLabel(key)}
                </label>
                {isLongText ? (
                  <textarea
                    value={displayVal}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors min-h-[120px] text-gray-800"
                  />
                ) : (
                  <div>
                    <input
                      type="text"
                      value={displayVal}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={isImageField ? "Enter image URL or upload below" : ""}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-800"
                    />
                    {isImageField && (
                      <div className="mt-2 flex items-center">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, false, null, null, key)}
                          disabled={isUploading}
                          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                        />
                        {displayVal && (displayVal.startsWith('http') || displayVal.startsWith('data:image')) && <span className="text-sm text-green-600 ml-2">Image loaded</span>}
                        {isThisUploading && <span className="text-sm text-blue-600 ml-2 animate-pulse">Uploading...</span>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className={`flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md transition-all ${
              (isSaving || isUploading) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-light hover:-translate-y-0.5'
            }`}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
