'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
  businessName: '',
  industry: 'ecommerce',
  aiPersonality: '',
  language: 'hi',
  widgetPosition: 'right',
  widgetColor: '#1a73e8',
  // Naye fields
  returnPolicy: '',
  deliveryTime: '',
  codAvailable: 'yes',
  workingHours: '',
  storeUrl: '',
  paymentMethods: '',
  shippingAreas: '',
  topProducts: ''
});

  useEffect(() => {
    const b = localStorage.getItem('business');
    const t = localStorage.getItem('token');
    if (!b || !t) { router.push('/'); return; }
    const biz = JSON.parse(b);
    setBusiness(biz);
    setForm(f => ({
      ...f,
      businessName: biz.name,
      industry: biz.industry || 'ecommerce'
    }));
  }, []);

 const save = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/business/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  } catch (e) {
    console.error('Save failed:', e);
  }
};

  const industries = [
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'edtech', label: 'Education' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'health', label: 'Healthcare' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'food', label: 'Food & Restaurant' },
    { value: 'generic', label: 'Other' },
  ];

  const embedCode = `<script
  src="https://budhai-backend-production.up.railway.app/widget.js"
  data-language="${form.language}"
  data-industry="${form.industry}"
  data-position="${form.widgetPosition}">
</script>`;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-500">BuddhAI ☿</h1>
          <p className="text-xs text-gray-400">{business?.name} — Settings</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-xs text-gray-400 hover:text-white">Dashboard</button>
          <button onClick={() => router.push('/analytics')} className="text-xs text-gray-400 hover:text-white">Analytics</button>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="text-xs text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">

        {/* Business Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Business Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Business Name</label>
              <input
                value={form.businessName}
                onChange={e => setForm({...form, businessName: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Industry</label>
              <select
                value={form.industry}
                onChange={e => setForm({...form, industry: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
              >
                {industries.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* AI Personality */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">AI Personality</h3>
          <p className="text-xs text-gray-500 mb-4">BuddhAI ko apne business ke hisaab se customize karo</p>
          <textarea
            value={form.aiPersonality}
            onChange={e => setForm({...form, aiPersonality: e.target.value})}
            placeholder="Jaise: Hamesha friendly raho. Returns ke liye 7 din ki policy hai. Delivery 3-5 din mein hoti hai..."
            rows={4}
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>

        {/* AI Personality */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          ...
          <textarea ... />
        </div>   ← YE CLOSING TAG

        {/* ← YAHAN PASTE KARO */}
        {/* Business Data — AI Accuracy */}
        <div className="bg-gray-900 ...

        {/* Widget Settings */}
        <div className="bg-gray-900 ...

        {/* Widget Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Widget Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Default Language</label>
              <div className="flex gap-3">
                {['hi', 'en'].map(l => (
                  <button
                    key={l}
                    onClick={() => setForm({...form, language: l})}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${form.language === l ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-700 text-gray-400'}`}
                  >
                    {l === 'hi' ? 'Hindi' : 'English'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Widget Position</label>
              <div className="flex gap-3">
                {['right', 'left'].map(p => (
                  <button
                    key={p}
                    onClick={() => setForm({...form, widgetPosition: p})}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${form.widgetPosition === p ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-700 text-gray-400'}`}
                  >
                    {p === 'right' ? 'Right Side' : 'Left Side'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Embed Code */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Website Par Lagao</h3>
          <p className="text-xs text-gray-500 mb-4">Yeh code apni website ke &lt;/body&gt; se pehle paste karo</p>
          <div className="bg-gray-800 rounded-xl p-4 font-mono text-xs text-green-400 whitespace-pre-wrap">
            {embedCode}
          </div>
          <button
            onClick={() => { navigator.clipboard.writeText(embedCode); }}
            className="mt-3 text-xs text-blue-400 hover:text-blue-300"
          >
            Copy Code
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={save}
          className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {saved ? '✓ Saved!' : 'Settings Save Karo'}
        </button>

      </div>
    </div>
  );
}