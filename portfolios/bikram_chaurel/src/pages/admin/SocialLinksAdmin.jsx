import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { queryClient } from '../../queryClient';
import { useSocialLinks } from '../../hooks/usePortfolioQueries';

const DEFAULT_LINKS = {
  facebook: { url: '', show: true },
  instagram: { url: '', show: true },
  linkedin: { url: '', show: true },
  whatsapp: { url: 'https://wa.me/9748587848?text=Hi,%20Bikram%20Chaurel', show: true },
  youtube: { url: '', show: false },
  tiktok: { url: '', show: false },
  twitter: { url: '', show: false },
};

const PLATFORMS = [
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'instagram', label: 'Instagram URL' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'whatsapp', label: 'WhatsApp URL (wa.me link)' },
  { key: 'youtube', label: 'YouTube URL' },
  { key: 'tiktok', label: 'TikTok URL' },
  { key: 'twitter', label: 'Twitter / X URL' },
];

export default function SocialLinksAdmin({ showToast, db }) {
  const [form, setForm] = useState(DEFAULT_LINKS);
  const [saving, setSaving] = useState(false);

  const { data: socialLinksData } = useSocialLinks();

  useEffect(() => {
    if (socialLinksData) {
      const parsed = { ...DEFAULT_LINKS };
      for (const [key, value] of Object.entries(socialLinksData)) {
        if (typeof value === 'string') {
          parsed[key] = { url: value, show: value !== '' };
        } else if (value && typeof value === 'object') {
          parsed[key] = { ...parsed[key], ...value };
        }
      }
      setForm(parsed);
    }
  }, [socialLinksData]);

  const setUrl = (key) => (e) => setForm(f => ({ ...f, [key]: { ...f[key], url: e.target.value } }));
  const setShow = (key) => (e) => setForm(f => ({ ...f, [key]: { ...f[key], show: e.target.checked } }));

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await setDoc(doc(db, 'socialLinks', 'main'), form); queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      showToast('Social links saved!');
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Social Links</h2>
      <p className="admin-panel-sub">Manage your social media presence. Use the toggle to hide a platform without deleting its URL.</p>
      
      <form className="admin-form" onSubmit={handleSave}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {PLATFORMS.map(({ key, label }) => (
            <div key={key} className="form-group" style={{ marginBottom: '20px', padding: '15px', border: '1px solid var(--border-soft)', borderRadius: '12px', background: 'var(--surface-alt)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ margin: 0, fontWeight: 600 }}>{label}</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', color: form[key].show ? 'var(--red)' : 'var(--gray)' }}>
                  <input type="checkbox" checked={form[key].show} onChange={setShow(key)} style={{ cursor: 'pointer' }} />
                  {form[key].show ? 'Visible' : 'Hidden'}
                </label>
              </div>
              <input type="text" value={form[key].url} onChange={setUrl(key)} placeholder="https://..." style={{ width: '100%' }} />
            </div>
          ))}
        </div>
        
        <div>
          <button type="submit" className="btn-primary" id="sl-save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Social Links'}
          </button>
        </div>
      </form>
    </div>
  );
}
