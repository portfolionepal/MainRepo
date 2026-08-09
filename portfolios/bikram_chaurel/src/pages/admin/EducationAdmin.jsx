import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Field } from './adminHelpers';
import { queryClient } from '../../queryClient';
import { useEducation } from '../../hooks/usePortfolioQueries';

const EMPTY = { year: '', level: '', institution: '', order: 0 };

export default function EducationAdmin({ showToast, db }) {
  const { data: items = [] } = useEducation();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const handleEdit = (item) => { setEditing(item.id); setForm({ year: item.year || '', level: item.level || '', institution: item.institution || '', order: item.order || 0 }); };
  const handleNew = () => { setEditing('new'); setForm({ ...EMPTY, order: items.length }); };
  const handleCancel = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editing === 'new') { await addDoc(collection(db, 'education'), payload); queryClient.invalidateQueries({ queryKey: ['education'] }); showToast('Education added!'); }
      else { await updateDoc(doc(db, 'education', editing), payload); queryClient.invalidateQueries({ queryKey: ['education'] }); showToast('Education updated!'); }
      handleCancel();
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try { await deleteDoc(doc(db, 'education', id)); queryClient.invalidateQueries({ queryKey: ['education'] }); showToast('Deleted!'); }
    catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Education</h2>
      <p className="admin-panel-sub">Academic qualifications shown in the Education timeline.</p>
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <div><p className="admin-item-title">{item.level}</p><p className="admin-item-sub">{item.institution} · {item.year}</p></div>
            <div className="admin-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{color:'var(--gray-light)', fontSize:'0.88rem'}}>No education entries yet.</p>}
      </div>
      {editing && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3 style={{fontSize:'1rem', fontWeight:700}}>{editing === 'new' ? 'Add Education' : 'Edit Education'}</h3>
          <Field label="Year" id="edu-year" value={form.year} onChange={set('year')} placeholder="2015" required />
          <Field label="Degree / Level" id="edu-level" value={form.level} onChange={set('level')} placeholder="M.Ed. – Social Studies" required />
          <Field label="Institution" id="edu-inst" value={form.institution} onChange={set('institution')} placeholder="Tribhuvan University" required />
          <Field label="Order (number)" id="edu-order" type="number" value={form.order} onChange={set('order')} />
          <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-edit" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && <button className="btn-add" onClick={handleNew} id="edu-add-btn">+ Add Education</button>}
    </div>
  );
}
