"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Field {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'checkbox' | 'file' | 'list' | 'keyvalue' | 'number' | 'objectlist';
  required?: boolean;
  placeholder?: string;
  rows?: number;
  objectFields?: { name: string; label: string; placeholder?: string }[];
}

interface AdminFormProps {
  title: string;
  apiEndpoint: string;
  redirectPath: string;
  fields: Field[];
  initialData?: any;
  isEdit?: boolean;
  useFormData?: boolean;
}

// --- Dynamic List Input (for arrays of strings like features, applications, tags) ---
function DynamicListInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const addItem = () => onChange([...value, '']);
  const removeItem = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const updateItem = (i: number, v: string) => {
    const updated = [...value];
    updated[i] = v;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={placeholder || `Item ${i + 1}`}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none"
          />
          <button type="button" onClick={() => removeItem(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium py-1">
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
}

// --- Dynamic Key-Value Input (for objects like specifications: { "Board Type": "E-Flute", ... }) ---
function DynamicKeyValueInput({ value, onChange }: { value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  const entries = Object.entries(value);
  const addEntry = () => onChange({ ...value, '': '' });
  const removeEntry = (oldKey: string) => {
    const copy = { ...value };
    delete copy[oldKey];
    onChange(copy);
  };
  const updateEntry = (oldKey: string, newKey: string, newVal: string) => {
    const copy: Record<string, string> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === oldKey) {
        copy[newKey] = newVal;
      } else {
        copy[k] = v;
      }
    }
    onChange(copy);
  };

  return (
    <div className="space-y-2">
      {entries.map(([key, val], i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={key}
            onChange={(e) => updateEntry(key, e.target.value, val)}
            placeholder="Name (e.g. Board Type)"
            className="w-2/5 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none"
          />
          <input
            type="text"
            value={val}
            onChange={(e) => updateEntry(key, key, e.target.value)}
            placeholder="Value (e.g. E-Flute)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none"
          />
          <button type="button" onClick={() => removeEntry(key)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={addEntry} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium py-1">
        <Plus className="w-3.5 h-3.5" /> Add specification
      </button>
    </div>
  );
}

// --- Dynamic Object List Input (for arrays of objects like process steps: [{ title, description }]) ---
function DynamicObjectListInput({ value, onChange, objectFields }: { value: any[]; onChange: (v: any[]) => void; objectFields: { name: string; label: string; placeholder?: string }[] }) {
  const addItem = () => {
    const empty: Record<string, string> = {};
    objectFields.forEach(f => { empty[f.name] = ''; });
    onChange([...value, empty]);
  };
  const removeItem = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: string, v: string) => {
    const updated = [...value];
    updated[i] = { ...updated[i], [field]: v };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 space-y-2 relative">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">#{i + 1}</span>
            <button type="button" onClick={() => removeItem(i)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {objectFields.map(f => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
              <input
                type="text"
                value={item[f.name] || ''}
                onChange={(e) => updateItem(i, f.name, e.target.value)}
                placeholder={f.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none"
              />
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={addItem} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium py-1">
        <Plus className="w-3.5 h-3.5" /> Add entry
      </button>
    </div>
  );
}

// ==================== MAIN FORM ====================

export function AdminForm({ title, apiEndpoint, redirectPath, fields, initialData, isEdit, useFormData }: AdminFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState<Record<string, any>>(() => {
    const state: Record<string, any> = {};
    fields.forEach(f => {
      if (f.type === 'file') {
        state[f.name] = null;
      } else if (f.type === 'list') {
        const raw = initialData?.[f.name];
        state[f.name] = Array.isArray(raw) ? raw : [];
      } else if (f.type === 'keyvalue') {
        const raw = initialData?.[f.name];
        state[f.name] = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
      } else if (f.type === 'objectlist') {
        const raw = initialData?.[f.name];
        state[f.name] = Array.isArray(raw) ? raw : [];
      } else if (f.type === 'checkbox') {
        state[f.name] = initialData?.[f.name] || false;
      } else {
        state[f.name] = initialData?.[f.name] ?? '';
      }
    });
    return state;
  });

  const handleChange = (name: string, value: any) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      console.log('[AdminForm] Token being sent:', token ? token.substring(0, 20) + '...' : 'NULL/MISSING');

      if (!token) {
        setError("You are not logged in. Please log in first.");
        window.location.href = '/admin/login';
        return;
      }

      const endpoint = isEdit ? `${apiEndpoint}/${initialData.id}` : apiEndpoint;
      const method = isEdit ? "PUT" : "POST";

      let body: any;
      let headers: Record<string, string> = { Authorization: `Bearer ${token}` };

      if (useFormData) {
        const fd = new FormData();
        fields.forEach(f => {
          if (f.type === 'file') {
            if (formState[f.name]) fd.append(f.name, formState[f.name]);
          } else if (f.type === 'checkbox') {
            fd.append(f.name, String(formState[f.name]));
          } else if (f.type === 'list' || f.type === 'keyvalue' || f.type === 'objectlist') {
            fd.append(f.name, JSON.stringify(formState[f.name]));
          } else {
            fd.append(f.name, formState[f.name] ?? '');
          }
        });
        body = fd;
      } else {
        headers['Content-Type'] = 'application/json';
        const jsonBody: Record<string, any> = {};
        fields.forEach(f => {
          if (f.type === 'number') {
            jsonBody[f.name] = parseInt(formState[f.name]) || 0;
          } else {
            jsonBody[f.name] = formState[f.name];
          }
        });
        body = JSON.stringify(jsonBody);
      }

      const res = await fetch(`${API_URL}${endpoint}`, { method, headers, body });
      const data = await res.json();

      if (res.status === 401) {
        // Token is invalid/expired — force re-login
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        return;
      }

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Separate fields by type for layout
  const inlineFields = fields.filter(f => !['textarea', 'list', 'keyvalue', 'objectlist', 'checkbox'].includes(f.type || 'text'));
  const checkboxFields = fields.filter(f => f.type === 'checkbox');
  const textareaFields = fields.filter(f => f.type === 'textarea');
  const dynamicFields = fields.filter(f => ['list', 'keyvalue', 'objectlist'].includes(f.type || ''));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{error}</div>}

        {/* Text / Number / File fields in 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {inlineFields.map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              {f.type === 'file' ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(f.name, e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  required={f.required}
                  value={formState[f.name] || ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all"
                />
              )}
            </div>
          ))}
        </div>

        {/* Checkboxes */}
        {checkboxFields.map(f => (
          <div key={f.name}>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={formState[f.name] || false} onChange={(e) => handleChange(f.name, e.target.checked)} className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
              <span className="text-sm font-medium text-gray-700">{f.label}</span>
            </label>
          </div>
        ))}

        {/* Textareas */}
        {textareaFields.map(f => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
            <textarea
              required={f.required}
              value={formState[f.name] || ''}
              onChange={(e) => handleChange(f.name, e.target.value)}
              rows={f.rows || 3}
              placeholder={f.placeholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all"
            />
          </div>
        ))}

        {/* Dynamic fields (lists, key-value, object lists) */}
        {dynamicFields.map(f => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
            {f.type === 'list' && (
              <DynamicListInput value={formState[f.name] || []} onChange={(v) => handleChange(f.name, v)} placeholder={f.placeholder} />
            )}
            {f.type === 'keyvalue' && (
              <DynamicKeyValueInput value={formState[f.name] || {}} onChange={(v) => handleChange(f.name, v)} />
            )}
            {f.type === 'objectlist' && f.objectFields && (
              <DynamicObjectListInput value={formState[f.name] || []} onChange={(v) => handleChange(f.name, v)} objectFields={f.objectFields} />
            )}
          </div>
        ))}

        <div className="flex justify-end gap-3 border-t pt-6">
          <button type="button" onClick={() => router.back()} className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium text-sm hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 shadow-sm transition-all">
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
