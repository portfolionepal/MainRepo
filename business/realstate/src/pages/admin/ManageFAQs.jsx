import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageFAQs = () => {
  const { faqs, addFAQ, deleteFAQ, updateFAQ } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingFAQ(null);
    setFormData({ question: '', answer: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFAQ(faq);
    setFormData({ ...faq });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFAQ) {
      updateFAQ({ ...editingFAQ, ...formData });
    } else {
      addFAQ(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage FAQs</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, or remove Frequently Asked Questions.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg shadow-blue-600/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New FAQ
        </motion.button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col h-[calc(100vh-220px)]">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions or answers..."
              className="pl-11 block w-full rounded-xl border border-slate-200 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="overflow-y-auto flex-1 bg-white custom-scrollbar">
          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {filteredFAQs.map((faq) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={faq.id} 
                  className="p-6 transition-all duration-200 group hover:bg-slate-50 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-slate-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                  
                  <div className="flex items-start justify-end sm:ml-4 space-x-2 transition-opacity">
                    <button 
                      onClick={() => openEditModal(faq)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => deleteFAQ(faq.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredFAQs.length === 0 && (
              <div className="p-20 text-center flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-slate-800 mb-1">No FAQs found</h3>
                <p className="text-sm text-slate-500 font-medium">You don't have any FAQs matching your criteria.</p>
              </div>
            )}
          </div>
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
                  {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Question</label>
                  <input 
                    type="text" required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Answer</label>
                  <textarea 
                    required rows="4"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                    value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  ></textarea>
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
                    {editingFAQ ? 'Save Changes' : 'Add FAQ'}
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

export default ManageFAQs;
