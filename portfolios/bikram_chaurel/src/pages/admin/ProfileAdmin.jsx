import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary, Field, deleteFromCloudinary } from './adminHelpers';
import { queryClient } from '../../queryClient';
import { useProfile } from '../../hooks/usePortfolioQueries';

export default function ProfileAdmin({ showToast, db }) {
  const [form, setForm] = useState({ name: '', tagline: '', subtitle: '', address: '', contact: '', email: '', dob: '', photo: '' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [originalPhoto, setOriginalPhoto] = useState('');

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData) {
      setForm(f => ({ ...f, ...profileData }));
      setOriginalPhoto(profileData.photo || '');
    }
  }, [profileData]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm(f => ({ ...f, photo: url }));
      showToast('Photo uploaded!');
    } catch (err) { showToast(err.message || 'Upload failed', 'error'); }
    finally { setUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'profile', 'main'), form, { merge: true }); queryClient.invalidateQueries({ queryKey: ['profile'] });
      if (originalPhoto && originalPhoto !== form.photo) {
        await deleteFromCloudinary(originalPhoto);
        setOriginalPhoto(form.photo || '');
      }
      showToast('Profile saved!');
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Profile</h2>
      <p className="admin-panel-sub">Name, tagline, photo, and contact info shown in the Hero section.</p>
      <form className="admin-form" onSubmit={handleSave}>
        <Field label="Full Name" id="p-name" value={form.name} onChange={set('name')} placeholder="Bikram Chaurel" required />
        <Field label="Tagline" id="p-tagline" value={form.tagline} onChange={set('tagline')} placeholder="Educator. Leader. Community Builder." />
        <Field label="Subtitle (use \\n for line break)" id="p-subtitle" value={form.subtitle} onChange={set('subtitle')} rows={2} />
        <Field label="Address" id="p-address" value={form.address} onChange={set('address')} placeholder="Makawanpurgadhi, Makawanpur, Nepal" />
        <div className="admin-form-row">
          <Field label="Phone / Contact" id="p-contact" value={form.contact} onChange={set('contact')} placeholder="9855070249" />
          <Field label="Email" id="p-email" value={form.email} onChange={set('email')} placeholder="name@example.com" />
        </div>
        <Field label="Date of Birth" id="p-dob" value={form.dob} onChange={set('dob')} placeholder="August 4, 1991" />
        <div className="form-group">
          <label>Profile Photo</label>
          <input type="file" accept="image/*" onChange={handlePhoto} id="p-photo-upload" />
          {uploading && <p style={{fontSize:'0.82rem', color:'var(--gray-light)', marginTop:'6px'}}>Uploading...</p>}
          {form.photo && <img src={form.photo} alt="Profile" className="cloudinary-preview" />}
        </div>
        <div>
          <button type="submit" className="btn-primary admin-form-save" id="profile-save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
