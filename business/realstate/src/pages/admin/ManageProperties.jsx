import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Search, Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ManageProperties = () => {
  const { properties, deleteProperty, addProperty, updateProperty } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Land',
    status: 'For Sale',
    price: '',
    location: '',
    description: '',
    images: []
  });

  const filteredProperties = properties.filter(prop => 
    prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    prop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({ 
      title: '', type: 'Land', status: 'For Sale', price: '', 
      location: '', description: '', images: [] 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prop) => {
    setEditingProperty(prop);
    setFormData({ 
      title: prop.title, 
      type: prop.type, 
      status: prop.status, 
      price: prop.price, 
      location: prop.location,
      description: prop.description, 
      images: prop.images || []
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploadingImage(true);
        const url = await uploadToCloudinary(file);
        setFormData({ ...formData, images: [...formData.images, url] });
      } catch (error) {
        alert("Failed to upload image to Cloudinary.");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProperty) {
      await updateProperty({ ...editingProperty, ...formData });
    } else {
      await addProperty(formData);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'For Sale': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Sold': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Properties</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, or remove real estate listings.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg shadow-blue-600/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Property
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
              placeholder="Search by title or location..."
              className="pl-10 block w-full rounded-xl border border-slate-200 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Property Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status & Type</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {filteredProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-14 w-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:shadow-md transition-all">
                      {prop.images && prop.images.length > 0 ? (
                        <img src={prop.images[0]} alt={prop.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">No Image</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-800 mb-0.5">{prop.title}</div>
                    <div className="text-xs text-slate-500">{prop.location} • {prop.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`px-2.5 py-0.5 inline-flex text-[10px] font-semibold rounded-full border ${getStatusColor(prop.status)}`}>
                        {prop.status}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{prop.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2 transition-opacity">
                      <button 
                        onClick={() => openEditModal(prop)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteProperty(prop.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No properties found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow">
                <form id="propertyForm" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Title</label>
                      <input 
                        type="text" required
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                        value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Type</label>
                      <select 
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white appearance-none"
                        value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="Land">Land</option>
                        <option value="House">House</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                      <select 
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white appearance-none"
                        value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="For Sale">For Sale</option>
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price</label>
                      <input 
                        type="text" required placeholder="e.g. Rs. 45,00,000 per aana"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                        value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                      <input 
                        type="text" required placeholder="e.g. Kathmandu, Bhaisepati"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                        value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Images</label>
                      <div className="flex gap-3 items-center mb-3">
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium text-slate-600 shadow-sm">
                          <Upload className="h-4 w-4 mr-2" />
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                        <span className="text-xs text-slate-400">Add multiple images one by one</span>
                      </div>
                      
                      {formData.images.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                          {formData.images.map((img, idx) => (
                            <div key={idx} className="relative h-20 w-24 rounded-lg border border-slate-200 overflow-hidden shadow-sm group">
                              <img src={img} alt={`preview ${idx}`} className="h-full w-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-white/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                      <textarea 
                        required rows="4"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                        value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 mt-auto">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
                  Cancel
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  form="propertyForm"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-colors"
                >
                  {editingProperty ? 'Save Changes' : 'Add Property'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageProperties;
