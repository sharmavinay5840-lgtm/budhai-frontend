'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', industry: 'ecommerce'
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const url = isLogin
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`;
      const body = isLogin
        ? { email: form.email, password: form.password }
        : form;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('business', JSON.stringify(data.business));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Kuch galat hua!');
      }
    } catch (err) {
      setError('Server se connect nahi ho pa raha!');
    }
    setLoading(false);
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-blue-500 mb-2">BuddhAI</h1>
            <p className="text-gray-400 text-sm">Vyapar Ki Tez Buddhi ☿</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <div className="flex mb-6 bg-gray-800 rounded-xl p-1">
              <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isLogin ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>Login</button>
              <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>Sign Up</button>
            </div>
            <div className="space-y-4">
              {!isLogin && (
                <input type="text" placeholder="Business ka naam" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
              )}
              <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
              <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
              {!isLogin && (
                <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none">
                  <option value="ecommerce">E-Commerce</option>
                  <option value="edtech">Education</option>
                  <option value="fintech">FinTech / Bank</option>
                  <option value="health">Healthcare</option>
                  <option value="realestate">Real Estate</option>
                  <option value="food">Food & Restaurant</option>
                  <option value="insurance">Insurance</option>
                  <option value="generic">Other</option>
                </select>
              )}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-medium transition-all disabled:opacity-50">
                {loading ? 'Please wait...' : isLogin ? 'Login Karein' : 'Account Banayein'}
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              <button onClick={() => setShowAuth(false)} className="text-blue-400">← Wapas jaao</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <div>
          <span className="text-2xl font-bold text-blue-500">BuddhAI</span>
          <span className="text-gray-500 text-xs ml-2">☿</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white">Pricing</a>
          <a href="#compare" className="text-sm text-gray-400 hover:text-white">Compare</a>
          <button onClick={() => { setIsLogin(true); setShowAuth(true); }} className="text-sm text-gray-400 hover:text-white">Login</button>
          <button onClick={() => { setIsLogin(false); setShowAuth(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
            Free Trial Shuru Karo
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center px-6 py-20 max-w-4xl mx-auto">
        <div className="inline-block bg-blue-950 border border-blue-800 text-blue-400 text-xs px-4 py-2 rounded-full mb-6">
          🇮🇳 India ka #1 AI Business Platform
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Vyapar Ki</span>
          <br />
          <span className="text-blue-500">Tez Buddhi ☿</span>
        </h1>
        <p className="text-gray-400 text-xl mb-4 max-w-2xl mx-auto">
          AI-powered Support, Marketing aur Sales — Hindi mein — sirf ₹4,999/month
        </p>
        <p className="text-gray-500 text-sm mb-10">Sierra AI se 300x sasta. Haptik se zyada smart. Indian businesses ke liye bana.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => { setIsLogin(false); setShowAuth(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all">
            30 Din Free Try Karo →
          </button>
          <button onClick={() => { setIsLogin(true); setShowAuth(true); }} className="border border-gray-700 text-gray-300 hover:border-gray-500 px-8 py-4 rounded-xl font-medium text-lg transition-all">
            Login Karein
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-4">No credit card required • 30 din free • Cancel anytime</p>
      </div>

      {/* Stats */}
      <div className="border-y border-gray-800 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6">
          {[
            { num: '60M+', label: 'Indian SMEs — Our Market' },
            { num: '94%', label: 'Queries AI Resolve Karta Hai' },
            { num: '5 Min', label: 'Setup Time' },
            { num: '300x', label: 'Sierra Se Sasta' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-blue-500 mb-1">{s.num}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Teen Pillars — Ek Platform</h2>
        <p className="text-gray-500 text-center mb-12 text-sm">Support + Marketing + Sales — sab Hindi mein</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🤖', title: 'Support AI', color: 'border-blue-800 bg-blue-950',
              features: ['24/7 Hindi + English chat', 'WhatsApp integration', 'Human handoff', 'Embeddable widget', 'Multi-industry support']
            },
            {
              icon: '📣', title: 'Marketing AI', color: 'border-green-800 bg-green-950',
              features: ['Festival campaigns — Diwali, Holi', 'WhatsApp broadcasts', 'Social media content', 'Google review replies', 'Email campaigns']
            },
            {
              icon: '💰', title: 'Sales AI', color: 'border-purple-800 bg-purple-950',
              features: ['Lead qualification auto', 'Follow-up sequences', 'Abandoned cart recovery', 'Voice AI calls — Hindi', 'Pipeline management']
            },
          ].map((f, i) => (
            <div key={i} className={`border rounded-2xl p-6 ${f.color}`}>
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold mb-4">{f.title}</h3>
              <ul className="space-y-2">
                {f.features.map((feat, j) => (
                  <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-green-500 text-xs">✓</span>{feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-500 text-center mb-12 text-sm">Koi hidden charges nahi — seedha transparent pricing</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '4,999', period: '/month', color: 'border-gray-700', badge: '', features: ['Support AI', '1,000 conversations', 'Hindi + English', 'Web widget', 'Email support'] },
              { name: 'Growth', price: '14,999', period: '/month', color: 'border-blue-500', badge: 'Most Popular', features: ['Support + Marketing AI', '10,000 conversations', 'WhatsApp integration', 'Social media content', 'Priority support'] },
              { name: 'Pro', price: '29,999', period: '/month', color: 'border-purple-500', badge: '', features: ['All 3 Pillars', 'Unlimited conversations', 'Voice AI calls', 'Sales automation', 'Dedicated support'] },
            ].map((p, i) => (
              <div key={i} className={`border-2 ${p.color} bg-gray-950 rounded-2xl p-6 relative`}>
                {p.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{p.badge}</div>}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-400 text-sm">₹</span>
                  <span className="text-4xl font-bold text-white">{p.price}</span>
                  <span className="text-gray-500 text-sm">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="text-green-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => { setIsLogin(false); setShowAuth(true); }} className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${i === 1 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border border-gray-700 text-gray-300 hover:border-gray-500'}`}>
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6">Banks aur Insurance ke liye enterprise pricing available — <span className="text-blue-400">contact karo</span></p>
        </div>
      </div>

      {/* Compare */}
      <div id="compare" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">BuddhAI vs Baaki Sab</h2>
        <p className="text-gray-500 text-center mb-12 text-sm">Kyun BuddhAI India ka best choice hai</p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Feature</th>
                <th className="px-4 py-4 text-blue-400 font-bold">BuddhAI</th>
                <th className="px-4 py-4 text-gray-500">Haptik</th>
                <th className="px-4 py-4 text-gray-500">Sierra AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Hindi-first AI', '✅', '⚠️', '❌'],
                ['SME pricing', '₹4,999/mo', '❌ Lakhs', '❌ Crores'],
                ['Marketing AI', '✅', '❌', '❌'],
                ['Sales AI', '✅', '❌', '⚠️'],
                ['5 min setup', '✅', '❌', '❌'],
                ['Festival campaigns', '✅', '❌', '❌'],
                ['Indian support', '✅', '✅', '❌'],
              ].map((row, i) => (
                <tr key={i} className={`border-b border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-900'}`}>
                  <td className="px-6 py-3 text-gray-300">{row[0]}</td>
                  <td className="px-4 py-3 text-center text-green-400 font-medium">{row[1]}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{row[2]}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-950 border-t border-blue-900 py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready ho? Abhi shuru karo!</h2>
        <p className="text-blue-300 mb-8 text-sm">30 din free — no credit card — cancel anytime</p>
        <button onClick={() => { setIsLogin(false); setShowAuth(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all">
          Free Trial Shuru Karo →
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-8 text-center">
        <p className="text-gray-600 text-sm">BuddhAI — Vyapar Ki Tez Buddhi ☿</p>
        <p className="text-gray-700 text-xs mt-1">India ka #1 AI Business Platform | Support + Marketing + Sales</p>
      </div>

    </div>
  );
}