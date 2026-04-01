'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Analytics() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [stats, setStats] = useState({
    total: 0, today: 0, resolved: 0, satisfaction: 4.8
  });

  useEffect(() => {
    const b = localStorage.getItem('business');
    const t = localStorage.getItem('token');
    if (!b || !t) { router.push('/'); return; }
    setBusiness(JSON.parse(b));
    // Demo stats — baad mein real API se aayega
    setStats({ total: 47, today: 12, resolved: 44, satisfaction: 4.8 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-500">BuddhAI ☿</h1>
          <p className="text-xs text-gray-400">{business?.name} — Analytics</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-xs text-gray-400 hover:text-white">Dashboard</button>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="text-xs text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Conversations', value: stats.total, color: 'text-blue-400' },
            { label: 'Aaj Ki Baat', value: stats.today, color: 'text-green-400' },
            { label: 'Resolved by AI', value: `${Math.round((stats.resolved/stats.total)*100)}%`, color: 'text-purple-400' },
            { label: 'Satisfaction', value: `${stats.satisfaction}⭐`, color: 'text-yellow-400' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <p className="text-xs text-gray-500 mb-2">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Common Topics</h3>
          {[
            { topic: 'Order Status', pct: 78 },
            { topic: 'Returns & Refunds', pct: 54 },
            { topic: 'Product Info', pct: 41 },
            { topic: 'Payment Issues', pct: 29 },
            { topic: 'Delivery Query', pct: 21 },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <span className="text-xs text-gray-400 w-32">{t.topic}</span>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${t.pct}%` }}></div>
              </div>
              <span className="text-xs text-gray-500 w-8">{t.pct}%</span>
            </div>
          ))}
        </div>

        {/* Recent Conversations */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Recent Conversations</h3>
          {[
            { name: 'Rahul S.', query: 'Order status poochha', time: '2 min ago', status: 'Resolved' },
            { name: 'Priya M.', query: 'Return request', time: '15 min ago', status: 'Active' },
            { name: 'Amit K.', query: 'Product price', time: '32 min ago', status: 'Resolved' },
            { name: 'Sneha P.', query: 'Delivery delay', time: '1 hr ago', status: 'Escalated' },
            { name: 'Vikram S.', query: 'Payment failed', time: '2 hr ago', status: 'Resolved' },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-gray-500">{c.query}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  c.status === 'Resolved' ? 'bg-green-900 text-green-400' :
                  c.status === 'Active' ? 'bg-blue-900 text-blue-400' :
                  'bg-yellow-900 text-yellow-400'
                }`}>{c.status}</span>
                <p className="text-xs text-gray-600 mt-1">{c.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}