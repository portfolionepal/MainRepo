import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { Plus, Trash2, Save, Check } from 'lucide-react';
import { uploadToCloudinary } from '../utils/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';

export default function GenericEditor() {
  const { pageId } = useParams();
  const { siteContent, updatePageContent } = useAdminContext();
  
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileUpload = async (e, isArray, arrayKey, index, itemKey) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      if (isArray) {
        handleArrayChange(arrayKey, index, itemKey, imageUrl);
      } else {
        handleChange(itemKey, imageUrl); // For scalar, itemKey is the key
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  // When the pageId changes, load the data for that page into the local form state
  useEffect(() => {
    if (siteContent[pageId]) {
      setFormData(siteContent[pageId]);
    } else {
      // Handle case where page doesn't exist in context yet
      setFormData({ title: `Placeholder for ${pageId}` });
    }
  }, [pageId, siteContent]);

  // Reset success message when navigating to a different page
  useEffect(() => {
    setShowSuccess(false);
  }, [pageId]);

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayChange = (arrayKey, index, itemKey, value) => {
    setFormData(prev => {
      const newArray = [...prev[arrayKey]];
      if (itemKey === null) {
        // It's an array of strings/primitives
        newArray[index] = value;
      } else {
        newArray[index] = { ...newArray[index], [itemKey]: value };
      }
      return { ...prev, [arrayKey]: newArray };
    });
  };

  const handleAddItem = (arrayKey) => {
    setFormData(prev => {
      const currentArray = prev[arrayKey] || [];
      const templateItem = currentArray.length > 0 ? currentArray[0] : {};
      
      let newItem;
      if (typeof templateItem === 'string') {
        newItem = '';
      } else {
        newItem = Object.keys(templateItem).reduce((acc, k) => {
          acc[k] = typeof templateItem[k] === 'number' ? 0 : '';
          return acc;
        }, { id: Date.now() });
      }

      return { ...prev, [arrayKey]: [...currentArray, newItem] };
    });
  };

  const handleRemoveItem = (arrayKey, index) => {
    if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      setFormData(prev => {
        const newArray = [...prev[arrayKey]];
        newArray.splice(index, 1);
        return { ...prev, [arrayKey]: newArray };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate network delay
    setTimeout(() => {
      updatePageContent(pageId, formData);
      setIsSaving(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  // Helper to format camelCase keys into Readable Labels
  const formatLabel = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  if (!siteContent[pageId] && Object.keys(formData).length === 0) {
    return <div className="text-gray-500">Loading editor for {pageId}...</div>;
  }

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize font-serif border-b pb-4">
          Editing: {pageId.replace(/([A-Z])/g, " $1")}
        </h1>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed top-6 right-6 z-50 bg-[#0B7A38] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3"
          >
            <Check className="w-6 h-6" />
            <span className="font-semibold text-lg">Changes saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          {Object.entries(formData).map(([key, value]) => {
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
                    <div key={item.id || index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative">
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
                          Object.entries(item).map(([itemKey, itemVal]) => {
                            if (itemKey === 'id') return null; // Don't edit internal IDs
                            
                            const isImageField = itemKey.toLowerCase().includes('image') || itemKey.toLowerCase().includes('url');
                            const isLongText = !isImageField && typeof itemVal === 'string' && itemVal.length > 50;
                            
                            return (
                              <div key={itemKey}>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  {formatLabel(itemKey)}
                                </label>
                                {isLongText ? (
                                  <textarea
                                    value={itemVal}
                                    onChange={(e) => handleArrayChange(key, index, itemKey, e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-colors min-h-[80px] text-sm text-gray-800"
                                  />
                                ) : (
                                  <div>
                                    <input
                                      type="text"
                                      value={itemVal}
                                      onChange={(e) => handleArrayChange(key, index, itemKey, e.target.value)}
                                      placeholder={isImageField ? "Enter image URL or upload below" : ""}
                                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-sm text-gray-800"
                                    />
                                    {isImageField && (
                                      <div className="mt-2 flex items-center">
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          onChange={(e) => handleFileUpload(e, true, key, index, itemKey)}
                                          disabled={uploadingImage}
                                          className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                                        />
                                        {itemVal && (itemVal.startsWith('http') || itemVal.startsWith('data:image')) && <span className="text-xs text-green-600 ml-2">Image loaded</span>}
                                        {uploadingImage && <span className="text-xs text-blue-600 ml-2 animate-pulse">Uploading...</span>}
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

            // Determine if it should be a textarea or input based on string length
            const isImageField = key.toLowerCase().includes('image') || key.toLowerCase().includes('url');
            const isLongText = !isImageField && typeof value === 'string' && value.length > 60;
            
            return (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formatLabel(key)}
                </label>
                {isLongText ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors min-h-[120px] text-gray-800"
                  />
                ) : (
                  <div>
                    <input
                      type="text"
                      value={value}
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
                          disabled={uploadingImage}
                          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                        />
                        {value && (value.startsWith('http') || value.startsWith('data:image')) && <span className="text-sm text-green-600 ml-2">Image loaded</span>}
                        {uploadingImage && <span className="text-sm text-blue-600 ml-2 animate-pulse">Uploading...</span>}
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
            disabled={isSaving || uploadingImage}
            className={`flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md transition-all ${
              (isSaving || uploadingImage) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-light hover:-translate-y-0.5'
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
