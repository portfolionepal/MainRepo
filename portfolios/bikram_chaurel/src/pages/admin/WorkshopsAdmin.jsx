import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { uploadToCloudinary, Field, deleteFromCloudinary } from './adminHelpers';
import { queryClient } from '../../queryClient';
import { useWorkshops } from '../../hooks/usePortfolioQueries';

const EMPTY = { title: '', duration: '', date: '', location: '', image: '', order: 0 };

export default function WorkshopsAdmin({ showToast, db }) {
  const { data: items = [] } = useWorkshops();

  const [editing, setEditing] = useState(null);
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
    setForm({ title: item.title || '', duration: item.duration || '', date: item.date || '', location: item.location || '', image: item.image || '', order: item.order || 0 }); 
    setOriginalImage(item.image || null);
  };
  const handleNew = () => { setEditing('new'); setForm({ ...EMPTY, order: items.length }); setOriginalImage(null); };
  const handleCancel = () => { setEditing(null); setForm(EMPTY); setOriginalImage(null); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editing === 'new') { 
        await addDoc(collection(db, 'workshops'), payload); queryClient.invalidateQueries({ queryKey: ['workshops'] }); 
        showToast('Workshop added!'); 
      } else { 
        await updateDoc(doc(db, 'workshops', editing), payload); queryClient.invalidateQueries({ queryKey: ['workshops'] }); 
        if (originalImage && originalImage !== payload.image) {
          await deleteFromCloudinary(originalImage);
        }
        showToast('Workshop updated!'); 
      }
      handleCancel();
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm('Delete this workshop?')) return;
    try { 
      await deleteDoc(doc(db, 'workshops', id)); queryClient.invalidateQueries({ queryKey: ['workshops'] }); 
      if (imageUrl) await deleteFromCloudinary(imageUrl);
      showToast('Deleted!'); 
    }
    catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Workshops & Training</h2>
      <p className="admin-panel-sub">Professional development workshops and training programs.</p>
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <div><p className="admin-item-title">{item.title}</p><p className="admin-item-sub">{item.date} · {item.location}</p></div>
            <div className="admin-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id, item.image)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{color:'var(--gray-light)', fontSize:'0.88rem'}}>No workshops yet.</p>}
      </div>
      {editing && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3 style={{fontSize:'1rem', fontWeight:700}}>{editing === 'new' ? 'Add Workshop' : 'Edit Workshop'}</h3>
          <Field label="Workshop Title" id="ws-title" value={form.title} onChange={set('title')} required />
          <div className="admin-form-row">
            <Field label="Duration" id="ws-dur" value={form.duration} onChange={set('duration')} placeholder="3 days" />
            <Field label="Date" id="ws-date" value={form.date} onChange={set('date')} placeholder="June 2023" />
          </div>
          <Field label="Location" id="ws-loc" value={form.location} onChange={set('location')} placeholder="Kathmandu, Nepal" />
          
          <div className="form-group">
            <label>Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImage} id="ws-img-upload" />
            {uploading && <p style={{fontSize:'0.82rem', color:'var(--gray-light)'}}>Uploading...</p>}
            {form.image && <img src={form.image} alt="" className="cloudinary-preview" />}
          </div>

          <Field label="Order (number)" id="ws-order" type="number" value={form.order} onChange={set('order')} />
          <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-edit" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && <button className="btn-add" onClick={handleNew} id="ws-add-btn">+ Add Workshop</button>}
    </div>
  );
}
