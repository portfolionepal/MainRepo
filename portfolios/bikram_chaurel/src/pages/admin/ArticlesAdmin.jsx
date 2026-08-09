import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { uploadToCloudinary, Field, deleteFromCloudinary } from './adminHelpers';
import { queryClient } from '../../queryClient';
import { useArticles } from '../../hooks/usePortfolioQueries';

const EMPTY = { url: '', title: '', image: '', order: 0 };

export default function ArticlesAdmin({ showToast, db }) {
  const { data: items = [] } = useArticles();
  const [editing, setEditing] = useState(null); // null | 'new' | doc id
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(false);
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

  const handleFetchMetadata = async () => {
    if (!form.url) {
      showToast('Please enter an Article URL first', 'error');
      return;
    }
    setFetching(true);
    try {
      const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(form.url)}`);
      const data = await res.json();
      
      if (data.status !== 'success') {
        throw new Error('Failed to fetch article data');
      }
      
      const title = data.data?.title || '';
      const image = data.data?.image?.url || data.data?.logo?.url || '';

      setForm(f => ({ 
        ...f, 
        title: title || f.title, 
        image: image || f.image 
      }));
      
      if (!title && !image) {
        showToast('No metadata found. Please enter manually.', 'error');
      } else {
        showToast('Metadata extracted successfully!');
      }
    } catch (err) {
      showToast(err.message || 'Could not fetch metadata', 'error');
    } finally {
      setFetching(false);
    }
  };

  const handleEdit = (item) => { 
    setEditing(item.id); 
    setForm({ url: item.url || '', title: item.title || '', image: item.image || '', order: item.order || 0 }); 
    setOriginalImage(item.image || null);
  };
  
  const handleNew = () => { 
    setEditing('new'); 
    setForm({ ...EMPTY, order: items.length }); 
    setOriginalImage(null); 
  };
  
  const handleCancel = () => { 
    setEditing(null); 
    setForm(EMPTY); 
    setOriginalImage(null); 
  };

  const handleSave = async (e) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editing === 'new') { 
        await addDoc(collection(db, 'articles'), payload); queryClient.invalidateQueries({ queryKey: ['articles'] }); 
        showToast('Article added!'); 
      } else { 
        await updateDoc(doc(db, 'articles', editing), payload); queryClient.invalidateQueries({ queryKey: ['articles'] }); 
        // Only delete from Cloudinary if the old image was actually hosted on Cloudinary
        if (originalImage && originalImage !== payload.image && originalImage.includes('cloudinary.com')) {
          await deleteFromCloudinary(originalImage);
        }
        showToast('Article updated!'); 
      }
      handleCancel();
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm('Delete this article?')) return;
    try { 
      await deleteDoc(doc(db, 'articles', id)); queryClient.invalidateQueries({ queryKey: ['articles'] }); 
      if (imageUrl && imageUrl.includes('cloudinary.com')) {
        await deleteFromCloudinary(imageUrl);
      }
      showToast('Deleted!'); 
    }
    catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Published Articles</h2>
      <p className="admin-panel-sub">Manage featured articles or publications.</p>
      
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {item.image && <img src={item.image} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
              <div>
                <p className="admin-item-title" style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                <p className="admin-item-sub"><a href={item.url} target="_blank" rel="noopener noreferrer" style={{color: 'var(--red)'}}>View Link</a></p>
              </div>
            </div>
            <div className="admin-item-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id, item.image)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{color:'var(--gray-light)', fontSize:'0.88rem'}}>No articles yet.</p>}
      </div>
      
      {editing && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3 style={{fontSize:'1rem', fontWeight:700}}>{editing === 'new' ? 'Add Article' : 'Edit Article'}</h3>
          
          <div className="form-group">
            <label htmlFor="art-url">Article URL *</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="url" id="art-url" value={form.url} onChange={set('url')} placeholder="https://..." required style={{ flex: 1 }} />
              <button type="button" className="btn-primary" onClick={handleFetchMetadata} disabled={fetching} style={{ whiteSpace: 'nowrap' }}>
                {fetching ? 'Fetching...' : 'Fetch Metadata'}
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-light)', marginTop: '4px' }}>Click 'Fetch Metadata' to automatically grab the title and image.</p>
          </div>
          
          <Field label="Article Title" id="art-title" value={form.title} onChange={set('title')} required />
          
          <div className="form-group">
            <label>Image URL (or upload custom fallback)</label>
            <input type="text" value={form.image} onChange={set('image')} placeholder="https://..." style={{ marginBottom: '8px' }} />
            <input type="file" accept="image/*" onChange={handleImage} id="art-img-upload" />
            {uploading && <p style={{fontSize:'0.82rem', color:'var(--gray-light)'}}>Uploading...</p>}
            {form.image && <img src={form.image} alt="" className="cloudinary-preview" style={{ marginTop: '10px' }} />}
          </div>

          <Field label="Order (number)" id="art-order" type="number" value={form.order} onChange={set('order')} />
          <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-edit" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && <button className="btn-add" onClick={handleNew} id="art-add-btn">+ Add Article</button>}
    </div>
  );
}
