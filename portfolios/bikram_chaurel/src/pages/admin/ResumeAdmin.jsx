import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary, deleteFromCloudinary } from './adminHelpers';
import { queryClient } from '../../queryClient';
import { useResume } from '../../hooks/usePortfolioQueries';

export default function ResumeAdmin({ showToast, db }) {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [originalResume, setOriginalResume] = useState(null);

  const { data: resumeData } = useResume();

  useEffect(() => {
    if (resumeData) {
      setResume(resumeData.url);
      setOriginalResume(resumeData.url);
    }
  }, [resumeData]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, true);
      setResume(url);
      showToast('Resume uploaded!');
    } catch (err) { 
      showToast(err.message || 'Upload failed', 'error'); 
    } finally { 
      setUploading(false); 
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'resume', 'main'), { url: resume || '' }); queryClient.invalidateQueries({ queryKey: ['resume'] });
      if (originalResume && originalResume !== resume) {
        await deleteFromCloudinary(originalResume);
        setOriginalResume(resume);
      }
      showToast('Resume saved successfully!');
    } catch {
      showToast('Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Resume Document</h2>
      <p className="admin-panel-sub">Upload your resume (PDF or DOC/DOCX) for visitors to view and download.</p>
      
      <div className="admin-form">
        <div className="form-group">
          <label>Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} id="resume-upload" />
          {uploading && <p style={{fontSize:'0.82rem', color:'var(--gray-light)'}}>Uploading...</p>}
          {resume && (
            <p style={{fontSize: '0.9rem', marginTop: '10px'}}>
              Current resume: <a href={resume} target="_blank" rel="noopener noreferrer" style={{color: 'var(--red)', textDecoration: 'underline'}}>View File</a>
            </p>
          )}
        </div>
        
        <button type="button" className="btn-primary" onClick={handleSave} disabled={saving || uploading} id="resume-save-btn">
          {saving ? 'Saving...' : 'Save Resume'}
        </button>
      </div>
    </div>
  );
}
