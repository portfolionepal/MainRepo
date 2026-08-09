import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { queryClient } from '../../queryClient';
import { useAbout } from '../../hooks/usePortfolioQueries';

export default function AboutAdmin({ showToast, db }) {
  const [bullets, setBullets] = useState(['']);
  const [saving, setSaving] = useState(false);

  const { data: aboutData } = useAbout();

  useEffect(() => {
    if (aboutData?.bullets?.length) setBullets(aboutData.bullets);
  }, [aboutData]);

  const updateBullet = (i, val) => setBullets(b => b.map((x, j) => j === i ? val : x));
  const addBullet = () => setBullets(b => [...b, '']);
  const removeBullet = (i) => setBullets(b => b.filter((_, j) => j !== i));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'about', 'main'), { bullets: bullets.filter(b => b.trim()) }, { merge: true }); queryClient.invalidateQueries({ queryKey: ['about'] });
      showToast('About saved!');
    } catch { showToast('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">About / Career Objective</h2>
      <p className="admin-panel-sub">These bullet points appear in the About section. Each bullet is one sentence or statement.</p>
      <form onSubmit={handleSave}>
        <div className="admin-form" style={{marginBottom:'16px'}}>
          {bullets.map((b, i) => (
            <div key={i} style={{display:'flex', gap:'10px', alignItems:'flex-start'}}>
              <textarea
                rows={2}
                value={b}
                onChange={e => updateBullet(i, e.target.value)}
                placeholder={`Bullet point ${i + 1}`}
                style={{flex:1, border:'1.5px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', fontFamily:'var(--font-sans)', fontSize:'0.9rem', resize:'vertical', outline:'none'}}
                id={`about-bullet-${i}`}
              />
              <button type="button" className="btn-delete" onClick={() => removeBullet(i)} style={{marginTop:'4px'}}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={addBullet} id="about-add-bullet">+ Add bullet</button>
        </div>
        <button type="submit" className="btn-primary" id="about-save-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save About'}
        </button>
      </form>
    </div>
  );
}
