'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', password: '', industry: 'ecommerce'
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const url = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/signup';

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

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-500 mb-2">BuddhAI</h1>
          <p className="text-gray-400 text-sm">Vyapar Ki Tez Buddhi ☿</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">

          {/* Tabs */}
          <div className="flex mb-6 bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                isLogin ? 'bg-blue-600 text-white' : 'text-gray-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                !isLogin ? 'bg-blue-600 text-white' : 'text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Business ka naam"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            {!isLogin && (
              <select
                value={form.industry}
                onChange={e => setForm({...form, industry: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="ecommerce">E-Commerce</option>
                <option value="edtech">Education</option>
                <option value="fintech">FinTech</option>
                <option value="health">Healthcare</option>
                <option value="realestate">Real Estate</option>
                <option value="food">Food & Restaurant</option>
                <option value="generic">Other</option>
              </select>
            )}

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-medium transition-all disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login Karein' : 'Account Banayein'}
            </button>
          </div>

          <p className="text-center text-gray-500 text-xs mt-6">
            {isLogin ? 'Naya account?' : 'Already account hai?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 ml-1"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}