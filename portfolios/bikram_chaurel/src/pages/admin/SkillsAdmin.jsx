import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Field } from './adminHelpers';
import IconPicker from './IconPicker';
import { queryClient } from '../../queryClient';
import { useSkills } from '../../hooks/usePortfolioQueries';

const EMPTY = { title: '', description: '', order: 0, icon: '' };

export default function SkillsAdmin({ showToast, db }) {
  const { data: items = [] } = useSkills();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const handleEdit = (item) => { setEditing(item.id); setForm({ title: item.title || '', description: item.description || '', order: item.order || 0, icon: item.icon || '' }); };
  const handleNew = () => { setEditing('new'); setForm({ ...EMPTY, order: items.length }); };
  const handleCancel = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editing === 'new') { await addDoc(collection(db, 'skills'), payload); queryClient.invalidateQueries({ queryKey: ['skills'] }); showToast('Skill added!'); }
      else { await updateDoc(doc(db, 'skills', editing), payload); queryClient.invalidateQueries({ queryKey: ['skills'] }); showToast('Skill updated!'); }
      handleCancel();
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try { await deleteDoc(doc(db, 'skills', id)); queryClient.invalidateQueries({ queryKey: ['skills'] }); showToast('Deleted!'); }
    catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Skills & Expertise</h2>
      <p className="admin-panel-sub">Manage skill cards shown on the public site.</p>
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <div><p className="admin-item-title">{item.title}</p><p className="admin-item-sub">{item.description?.slice(0, 60)}...</p></div>
            <div className="admin-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{color:'var(--gray-light)', fontSize:'0.88rem'}}>No skills yet.</p>}
      </div>
      {editing && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3 style={{fontSize:'1rem', fontWeight:700}}>{editing === 'new' ? 'Add Skill' : 'Edit Skill'}</h3>
          <Field label="Skill Title" id="sk-title" value={form.title} onChange={set('title')} required />
          <Field label="Description" id="sk-desc" value={form.description} onChange={set('description')} rows={2} />
          <IconPicker value={form.icon} onChange={(val) => setForm(f => ({ ...f, icon: val }))} />
          <Field label="Order (number)" id="sk-order" type="number" value={form.order} onChange={set('order')} />
          <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-edit" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && <button className="btn-add" onClick={handleNew} id="sk-add-btn">+ Add Skill</button>}
    </div>
  );
}
