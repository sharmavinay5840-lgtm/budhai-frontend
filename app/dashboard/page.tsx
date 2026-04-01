'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [language, setLanguage] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const b = localStorage.getItem('business');
    const t = localStorage.getItem('token');
    if (!b || !t) { router.push('/'); return; }
    setBusiness(JSON.parse(b));
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const newHistory = [...history, { role: 'user', content: message }];
    setHistory(newHistory);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language,
          industry: business?.industry,
          history
        })
      });
      const data = await res.json();
      if (data.success) {
        setHistory([...newHistory, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      setHistory([...newHistory, { role: 'assistant', content: 'Error! Server se connect nahi ho pa raha.' }]);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-500">BuddhAI ☿</h1>
          <p className="text-xs text-gray-400">{business?.name} — {business?.industry}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button onClick={() => setLanguage('hi')} className={`px-3 py-1 rounded text-xs ${language === 'hi' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>हिं</button>
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-xs ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>EN</button>
          </div>
          <button onClick={logout} className="text-xs text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {history.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-4xl mb-4">☿</p>
                <p className="text-sm">BuddhAI ready hai — kuch poochho!</p>
                <p className="text-xs mt-2 text-gray-600">Vyapar Ki Tez Buddhi</p>
              </div>
            )}
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-800 text-gray-100 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-4 flex gap-3">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={language === 'hi' ? 'Kuch bhi poochho...' : 'Ask anything...'}
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}