import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Search, Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ManageServices = () => {
  const { services, deleteService, addService, updateService } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    iconName: 'Settings',
    image: '',
    detailedFeatures: ['']
  });

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', fullDescription: '', iconName: 'Settings', image: '', detailedFeatures: [''] });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({ 
      title: service.title, 
      description: service.description, 
      fullDescription: service.fullDescription || '',
      iconName: service.iconName || (typeof service.icon === 'string' ? service.icon : 'Settings'),
      image: service.image || '',
      detailedFeatures: service.detailedFeatures || ['']
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploadingImage(true);
        const url = await uploadToCloudinary(file);
        setFormData({ ...formData, image: url });
      } catch (error) {
        alert("Failed to upload image to Cloudinary.");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      detailedFeatures: formData.detailedFeatures.filter(f => f.trim() !== ''),
      icon: formData.iconName
    };

    if (editingService) {
      await updateService({ ...editingService, ...serviceData });
    } else {
      await addService(serviceData);
    }
    setIsModalOpen(false);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.detailedFeatures];
    newFeatures[index] = value;
    setFormData({ ...formData, detailedFeatures: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, detailedFeatures: [...formData.detailedFeatures, ''] });
  };
  const removeFeatureField = (index) => {
    const newFeatures = formData.detailedFeatures.filter((_, i) => i !== index);
    setFormData({ ...formData, detailedFeatures: newFeatures });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Services</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, or remove the services you offer.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg shadow-blue-600/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </motion.button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search services..."
              className="pl-10 block w-full rounded-xl border border-slate-200 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100 bg-white">
          {filteredServices.map((service) => {
            let IconComponent = LucideIcons.Settings;
            if (service.iconName && LucideIcons[service.iconName]) {
              IconComponent = LucideIcons[service.iconName];
            } else if (typeof service.icon === 'string' && LucideIcons[service.icon]) {
              IconComponent = LucideIcons[service.icon];
            } else if (typeof service.icon === 'function' || typeof service.icon === 'object') {
              IconComponent = service.icon;
            }
            
            return (
            <div key={service.id} className="p-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center gap-5 group">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-100 group-hover:scale-105 transition-transform">
                <IconComponent className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-slate-900 mb-1 truncate">{service.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-2">{service.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {service.detailedFeatures?.length || 0} Features
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:ml-4 transition-opacity">
                <button 
                  onClick={() => openEditModal(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => deleteService(service.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            );
          })}
          
          {filteredServices.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No services found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Service Title</label>
                  <input 
                    type="text" required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Icon Name (Lucide React)</label>
                  <input 
                    type="text" required placeholder="e.g. Map, Building, Settings"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.iconName} onChange={(e) => setFormData({...formData, iconName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hero Image Upload (or URL)</label>
                  <div className="flex gap-3 items-center mb-3">
                    <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium text-slate-600 shadow-sm">
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload File'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                    <span className="text-xs text-slate-400">Max size 5MB</span>
                  </div>
                  <input 
                    type="url"
                    placeholder="Or enter image URL..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                  {formData.image && (
                    <div className="mt-3 h-24 w-40 rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                       <img src={formData.image} alt="preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Short Description</label>
                  <textarea 
                    required rows="2"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Description</label>
                  <textarea 
                    required rows="4"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Detailed Features</label>
                  {formData.detailedFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-3 mb-3">
                      <input 
                        type="text" required placeholder="Feature description..."
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white focus:shadow-sm"
                        value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)}
                      />
                      {formData.detailedFeatures.length > 1 && (
                        <button type="button" onClick={() => removeFeatureField(index)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addFeatureField} className="mt-2 px-4 py-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-lg flex items-center transition-colors">
                    <Plus className="h-4 w-4 mr-1.5" /> Add Feature
                  </button>
                </div>
                
                <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-slate-100 mt-8 -mx-6 px-6 py-5">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-colors"
                  >
                    {editingService ? 'Save Changes' : 'Add Service'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageServices;
