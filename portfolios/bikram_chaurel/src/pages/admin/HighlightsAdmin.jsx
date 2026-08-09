import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { uploadToCloudinary, Field, deleteFromCloudinary } from './adminHelpers';
import { queryClient } from '../../queryClient';
import { useHighlights } from '../../hooks/usePortfolioQueries';

const EMPTY = { title: '', description: '', date: '', image: '' };

export default function HighlightsAdmin({ showToast, db }) {
  const { data: items = [] } = useHighlights();

  const [editing, setEditing] = useState(null); // null | 'new' | doc id
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm(f => ({ ...f, image: url }));
      showToast('Image uploaded!');
    } catch (err) { showToast(err.message || 'Upload failed', 'error'); }
    finally { setUploading(false); }
  };

  const handleEdit = (item) => { 
    setEditing(item.id); 
    setForm({ title: item.title || '', description: item.description || '', date: item.date || '', image: item.image || '' }); 
    setOriginalImage(item.image || null);
  };
  const handleNew = () => { setEditing('new'); setForm(EMPTY); setOriginalImage(null); };
  const handleCancel = () => { setEditing(null); setForm(EMPTY); setOriginalImage(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === 'new') {
        await addDoc(collection(db, 'highlights'), form); queryClient.invalidateQueries({ queryKey: ['highlights'] });
        showToast('Highlight added!');
      } else {
        await updateDoc(doc(db, 'highlights', editing), form); queryClient.invalidateQueries({ queryKey: ['highlights'] });
        if (originalImage && originalImage !== form.image) {
          await deleteFromCloudinary(originalImage);
        }
        showToast('Highlight updated!');
      }
      handleCancel();
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm('Delete this highlight?')) return;
    try { 
      await deleteDoc(doc(db, 'highlights', id)); queryClient.invalidateQueries({ queryKey: ['highlights'] }); 
      if (imageUrl) await deleteFromCloudinary(imageUrl);
      showToast('Deleted!'); 
    }
    catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Recent Highlights</h2>
      <p className="admin-panel-sub">Add, edit, or remove highlights shown on the public site.</p>
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <div>
              <p className="admin-item-title">{item.title}</p>
              <p className="admin-item-sub">{item.date}</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id, item.image)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{color:'var(--gray-light)', fontSize:'0.88rem'}}>No highlights yet.</p>}
      </div>
      {editing && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3 style={{fontSize:'1rem', fontWeight:700, color:'var(--black)', marginBottom:'4px'}}>{editing === 'new' ? 'Add Highlight' : 'Edit Highlight'}</h3>
          <Field label="Title" id="hl-title" value={form.title} onChange={set('title')} required />
          <Field label="Description" id="hl-desc" value={form.description} onChange={set('description')} rows={3} />
          <Field label="Date / Year" id="hl-date" value={form.date} onChange={set('date')} placeholder="2024" />
          <div className="form-group">
            <label>Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImage} id="hl-img-upload" />
            {uploading && <p style={{fontSize:'0.82rem', color:'var(--gray-light)'}}>Uploading...</p>}
            {form.image && <img src={form.image} alt="" className="cloudinary-preview" />}
          </div>
          <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-edit" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && <button className="btn-add" onClick={handleNew} id="hl-add-btn">+ Add Highlight</button>}
    </div>
  );
}
