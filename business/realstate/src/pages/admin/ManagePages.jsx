import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { Save, CheckCircle2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ManagePages = () => {
  const { siteConfig, updateSiteConfig } = useContext(DataContext);
  const [formData, setFormData] = useState(siteConfig);
  const [activeTab, setActiveTab] = useState('Hero');
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    setFormData(siteConfig);
  }, [siteConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleStatChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      statistics: prev.statistics?.map(stat => 
        stat.id === id ? { ...stat, [field]: value } : stat
      ) || []
    }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploadingImage(true);
        const url = await uploadToCloudinary(file);
        setFormData(prev => ({ ...prev, [fieldName]: url }));
      } catch (error) {
        alert("Failed to upload image to Cloudinary.");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    // Simulate slight delay for effect
    setTimeout(() => {
      updateSiteConfig(formData);
      setSaveStatus('success');
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Page Contents</h1>
          <p className="text-sm text-slate-500 mt-1">Customize your website's text, images, and links.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col md:flex-row">
        
        {/* Tabs sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 flex flex-row md:flex-col p-4 md:p-6 overflow-x-auto md:overflow-x-visible">
          {['Hero', 'About', 'Contact Info', 'Social Links'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-5 py-3 rounded-xl mb-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-md shadow-slate-200/50 border border-slate-100' 
                  : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
              }`}
            >
              {tab} Section
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <AnimatePresence mode="wait">
              {activeTab === 'Hero' && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Home Page Hero</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tagline</label>
                    <input 
                      type="text" name="tagline" value={formData.tagline} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subheading / Brief description</label>
                    <textarea 
                      name="subheading" rows="3" value={formData.subheading} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hero Background Image</label>
                    <div className="flex gap-3 items-center mb-3">
                      <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium text-slate-600 shadow-sm">
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'heroImage')} disabled={uploadingImage} />
                      </label>
                      <span className="text-xs text-slate-400">Max size 5MB</span>
                    </div>
                    {formData.heroImage && (
                      <div className="mt-3 h-40 w-full max-w-lg rounded-xl border border-slate-200 overflow-hidden shadow-sm relative group">
                         <img src={formData.heroImage} alt="hero preview" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'About' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">About Page Section</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">About Us Title</label>
                    <input 
                      type="text" name="aboutTitle" value={formData.aboutTitle} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">About Us Text (Supports paragraphs)</label>
                    <textarea 
                      name="aboutText" rows="10" value={formData.aboutText} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    ></textarea>
                    <p className="text-xs text-slate-400 mt-2">Leave blank lines to create multiple paragraphs.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">About Section Image</label>
                    <div className="flex gap-3 items-center mb-3">
                      <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium text-slate-600 shadow-sm">
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'aboutImage')} disabled={uploadingImage} />
                      </label>
                      <span className="text-xs text-slate-400">Max size 5MB</span>
                    </div>
                    {formData.aboutImage && (
                      <div className="mt-3 h-40 w-40 rounded-xl border border-slate-200 overflow-hidden shadow-sm relative group">
                         <img src={formData.aboutImage} alt="about preview" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Statistics</h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {formData.statistics?.map((stat) => (
                        <div key={stat.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Value (Number)</label>
                          <input 
                            type="number" 
                            value={stat.value} 
                            onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 mb-3 outline-none bg-white"
                          />
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Label</label>
                          <input 
                            type="text" 
                            value={stat.label} 
                            onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Contact Info' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <input 
                      type="text" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location / Address</label>
                    <input 
                      type="text" name="location" value={formData.location} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'Social Links' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Social Media Links</h3>
                  
                  {['linkedin', 'facebook', 'instagram', 'youtube', 'whatsapp'].map(platform => (
                    <div key={platform}>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 capitalize">{platform} URL</label>
                      <input 
                        type="text" name={platform} value={formData.socialLinks[platform]} onChange={handleSocialChange}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                        placeholder={`https://${platform}.com/...`}
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-end">
              {saveStatus === 'success' && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-600 flex items-center text-sm font-medium mr-5"
                >
                  <CheckCircle2 className="w-5 h-5 mr-1.5" />
                  Saved successfully
                </motion.span>
              )}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={saveStatus === 'saving'}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-70 shadow-lg shadow-blue-600/20"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ManagePages;
