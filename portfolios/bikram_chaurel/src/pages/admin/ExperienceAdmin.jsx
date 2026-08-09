import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Field } from './adminHelpers';
import IconPicker from './IconPicker';
import { queryClient } from '../../queryClient';
import { useExperience } from '../../hooks/usePortfolioQueries';

const EMPTY = { role: '', org: '', location: '', period: '', description: '', order: 0, icon: '' };

export default function ExperienceAdmin({ showToast, db }) {
  const { data: items = [] } = useExperience();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const handleEdit = (item) => { setEditing(item.id); setForm({ role: item.role || '', org: item.org || '', location: item.location || '', period: item.period || '', description: item.description || '', order: item.order || 0, icon: item.icon || '' }); };
  const handleNew = () => { setEditing('new'); setForm({ ...EMPTY, order: items.length }); };
  const handleCancel = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editing === 'new') { await addDoc(collection(db, 'experience'), payload); queryClient.invalidateQueries({ queryKey: ['experience'] }); showToast('Experience added!'); }
      else { await updateDoc(doc(db, 'experience', editing), payload); queryClient.invalidateQueries({ queryKey: ['experience'] }); showToast('Experience updated!'); }
      handleCancel();
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try { await deleteDoc(doc(db, 'experience', id)); queryClient.invalidateQueries({ queryKey: ['experience'] }); showToast('Deleted!'); }
    catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Experience & Leadership</h2>
      <p className="admin-panel-sub">Manage all professional roles and organizational positions.</p>
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <div><p className="admin-item-title">{item.role}</p><p className="admin-item-sub">{item.org} · {item.period}</p></div>
            <div className="admin-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{color:'var(--gray-light)', fontSize:'0.88rem'}}>No experience entries yet.</p>}
      </div>
      {editing && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3 style={{fontSize:'1rem', fontWeight:700}}>{editing === 'new' ? 'Add Experience' : 'Edit Experience'}</h3>
          <Field label="Role / Title" id="exp-role" value={form.role} onChange={set('role')} required />
          <Field label="Organization" id="exp-org" value={form.org} onChange={set('org')} />
          <div className="admin-form-row">
            <Field label="Location" id="exp-loc" value={form.location} onChange={set('location')} />
            <Field label="Period" id="exp-period" value={form.period} onChange={set('period')} placeholder="2022 – Present" />
          </div>
          <Field label="Description" id="exp-desc" value={form.description} onChange={set('description')} rows={3} />
          <IconPicker value={form.icon} onChange={(val) => setForm(f => ({ ...f, icon: val }))} />
          <Field label="Order (number)" id="exp-order" type="number" value={form.order} onChange={set('order')} />
          <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-edit" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && <button className="btn-add" onClick={handleNew} id="exp-add-btn">+ Add Experience</button>}
    </div>
  );
}
