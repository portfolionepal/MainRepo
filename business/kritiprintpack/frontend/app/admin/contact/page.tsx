"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const CONTACT_FIELDS = [
  { name: 'name', label: 'Company Name' },
  { name: 'address', label: 'Address' },
  { name: 'phone', label: 'Phone' },
  { name: 'mobile', label: 'Mobile' },
  { name: 'email', label: 'Email' },
  { name: 'mapUrl', label: 'Google Map Embed URL' },
  { name: 'workingHours', label: 'Working Hours' },
  { name: 'facebookUrl', label: 'Facebook URL' },
  { name: 'twitterUrl', label: 'Twitter URL' },
  { name: 'linkedinUrl', label: 'LinkedIn URL' },
];

export default function AdminContactPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/contact`, { cache: 'no-store' });
        const json = await res.json();
        if (json.data) {
          const state: Record<string, string> = {};
          CONTACT_FIELDS.forEach(f => { state[f.name] = json.data[f.name] || ''; });
          setFormState(state);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/contact`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      setSuccess("Contact info updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-500 py-10 text-center">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONTACT_FIELDS.map(f => (
            <div key={f.name} className={f.name === 'mapUrl' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              {f.name === 'mapUrl' ? (
                <textarea
                  value={formState[f.name] || ''}
                  onChange={(e) => setFormState(prev => ({ ...prev, [f.name]: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all"
                />
              ) : (
                <input
                  type={f.name === 'email' ? 'email' : 'text'}
                  value={formState[f.name] || ''}
                  onChange={(e) => setFormState(prev => ({ ...prev, [f.name]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t pt-6">
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium text-sm hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 shadow-sm transition-all">
            {saving ? "Saving..." : "Update Contact Info"}
          </button>
        </div>
      </form>
    </div>
  );
}
