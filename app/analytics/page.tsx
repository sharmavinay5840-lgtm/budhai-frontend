'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Analytics() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [stats, setStats] = useState({ total: 0, today: 0, resolved: 0, satisfaction: 4.8 });
  const [topCategories, setTopCategories] = useState<any[]>([]);
  const [dailyVolume, setDailyVolume] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryLabels: any = {
    order_tracking: { label: 'Order Tracking', color: 'bg-blue-500', emoji: '📦' },
    returns: { label: 'Returns & Refunds', color: 'bg-red-500', emoji: '🔄' },
    pricing: { label: 'Price Queries', color: 'bg-yellow-500', emoji: '💰' },
    delivery: { label: 'Delivery', color: 'bg-green-500', emoji: '🚚' },
    payment: { label: 'Payment', color: 'bg-purple-500', emoji: '💳' },
    product: { label: 'Product Info', color: 'bg-pink-500', emoji: '🛍️' },
    complaint: { label: 'Complaints', color: 'bg-orange-500', emoji: '😤' },
    general: { label: 'General', color: 'bg-gray-500', emoji: '💬' },
  };

  useEffect(() => {
    const b = localStorage.getItem('business');
    const t = localStorage.getItem('token');
    if (!b || !t) { router.push('/'); return; }
    const biz = JSON.parse(b);
    setBusiness(biz);
    fetchAnalytics(biz.id);
  }, []);

  const fetchAnalytics = async (businessId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/analytics/${businessId}`
      );
      if (res.ok) {
        const data = await res.json();
        setTopCategories(data.topCategories || []);
        setDailyVolume(data.dailyVolume || []);
        setStats(s => ({ ...s, total: data.totalQueries || 0 }));
      }
    } catch (e) {
      console.error('Analytics fetch failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const maxCount = topCategories.length > 0
    ? Math.max(...topCategories.map((c: any) => parseInt(c.count)))
    : 1;

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
          <button onClick={() => router.push('/settings')} className="text-xs text-gray-400 hover:text-white">Settings</button>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="text-xs text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Queries (30 din)', value: stats.total, color: 'text-blue-400', icon: '💬' },
            { label: 'Aaj ki queries', value: dailyVolume.length > 0 ? dailyVolume[dailyVolume.length-1]?.count || 0 : 0, color: 'text-green-400', icon: '📅' },
            { label: 'AI Resolution Rate', value: '94%', color: 'text-purple-400', icon: '🤖' },
            { label: 'CSAT Score', value: '4.8 ⭐', color: 'text-yellow-400', icon: '😊' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <p className="text-lg mb-1">{s.icon}</p>
              <p className="text-xs text-gray-500 mb-2">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Feature 07 — Top Queries (Real Data) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">REAL DATA</span>
                <h3 className="text-sm font-semibold text-gray-300">Top Query Categories</h3>
              </div>
              <p className="text-xs text-gray-500">Last 30 days — kaunsi queries sabse zyada aayi</p>
            </div>
            <button
              onClick={() => business && fetchAnalytics(business.id)}
              className="text-xs text-blue-400 hover:text-blue-300 border border-blue-800 px-3 py-1 rounded-lg"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500 text-sm">Loading analytics...</div>
          ) : topCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm mb-2">Abhi tak koi queries nahi aai</p>
              <p className="text-gray-600 text-xs">Dashboard pe chat karo — data yahan dikhega!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topCategories.map((cat: any, i: number) => {
                const info = categoryLabels[cat.query_category] || categoryLabels.general;
                const pct = Math.round((parseInt(cat.count) / maxCount) * 100);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-lg w-7">{info.emoji}</span>
                    <span className="text-xs text-gray-400 w-36">{info.label}</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${info.color} rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400 w-10 text-right">{cat.count}</span>
                    <span className="text-xs text-gray-600 w-10 text-right">{cat.percentage}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Daily Volume — Last 7 days */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Daily Volume</h3>
          <p className="text-xs text-gray-500 mb-4">Last 7 days ki conversations</p>

          {dailyVolume.length === 0 ? (
            <div className="text-center py-6 text-gray-600 text-sm">Koi data nahi abhi</div>
          ) : (
            <div className="flex items-end gap-2 h-24">
              {dailyVolume.map((d: any, i: number) => {
                const maxVol = Math.max(...dailyVolume.map((x: any) => parseInt(x.count)));
                const height = Math.round((parseInt(d.count) / maxVol) * 100);
                const date = new Date(d.date);
                const label = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500">{d.count}</span>
                    <div className="w-full bg-gray-800 rounded-t-sm" style={{ height: '80px' }}>
                      <div
                        className="w-full bg-blue-500 rounded-t-sm transition-all"
                        style={{ height: `${height}%`, marginTop: `${100-height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Insights Box */}
        {topCategories.length > 0 && (
          <div className="bg-blue-950 border border-blue-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-blue-300 mb-3">💡 AI Insights</h3>
            <div className="space-y-2">
              {topCategories[0] && (
                <p className="text-xs text-blue-200">
                  📦 Sabse zyada queries <strong>{categoryLabels[topCategories[0].query_category]?.label}</strong> ki hain ({topCategories[0].percentage}%) — is section ko settings mein aur improve karo!
                </p>
              )}
              {topCategories.length > 1 && topCategories[1] && (
                <p className="text-xs text-blue-200">
                  🔄 Doosri sabse common query <strong>{categoryLabels[topCategories[1].query_category]?.label}</strong> ({topCategories[1].percentage}%) — ensure karo AI ke paas accurate info hai.
                </p>
              )}
              <p className="text-xs text-blue-300 mt-3">
                ✅ Total <strong>{stats.total}</strong> queries AI ne handle ki — manually karte toh {Math.round(stats.total * 5)} minutes lagte!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}