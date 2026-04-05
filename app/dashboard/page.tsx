'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    const b = localStorage.getItem('business');
    const t = localStorage.getItem('token');
    if (!b || !t) { router.push('/'); return; }
    setBusiness(JSON.parse(b));

    // Chat history restore karo
    try {
      const saved = localStorage.getItem('chatHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      localStorage.removeItem('chatHistory');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const saveHistory = (h: any[]) => {
    setHistory(h);
    try {
      localStorage.setItem('chatHistory', JSON.stringify(h));
    } catch (e) {
      console.log('History save failed');
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    setLoading(true);
    const userMsg = message.trim();
    setMessage('');

    const newHistory = [...history, { role: 'user', content: userMsg }];
    saveHistory(newHistory);

    try {
      const b = JSON.parse(localStorage.getItem('business') || '{}');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          language,
          industry: b?.industry,
          history: history,
          businessId: b?.id
        })
      });
      const data = await res.json();
      if (data.success) {
        saveHistory([...newHistory, { role: 'assistant', content: data.reply }]);
      } else {
        saveHistory([...newHistory, { role: 'assistant', content: 'Kuch error hua — dobara try karo!' }]);
      }
    } catch (err) {
      saveHistory([...newHistory, { role: 'assistant', content: 'Server se connect nahi ho pa raha. Thodi der baad try karo!' }]);
    }
    setLoading(false);
  };

  const clearChat = () => {
    setHistory([]);
    localStorage.removeItem('chatHistory');
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
            <button onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded text-xs ${language === 'hi' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>हिं</button>
            <button onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded text-xs ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>EN</button>
          </div>
          <button onClick={() => router.push('/analytics')} className="text-xs text-gray-400 hover:text-white">Analytics</button>
          <button onClick={() => router.push('/settings')} className="text-xs text-gray-400 hover:text-white">Settings</button>
          <button onClick={clearChat} className="text-xs text-gray-400 hover:text-red-400">Clear Chat</button>
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
                <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0.1s'}}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-4 flex gap-3">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && sendMessage()}
              placeholder={language === 'hi' ? 'Kuch bhi poochho...' : 'Ask anything...'}
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm disabled:opacity-50 transition-all"
            >
              ➤
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['Mera order kahan hai?', 'Return policy kya hai?', 'Delivery time?', 'COD available hai?'].map((q, i) => (
            <button key={i} onClick={() => { setMessage(q); }}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1.5 rounded-full border border-gray-700 transition-all">
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}