import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, LogOut, User, Cpu, Terminal as TerminalIcon, Menu, X } from 'lucide-react';
import LetterGlitch from '../components/LetterGlitch';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SurveX online. Ask anything.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM_ERROR: Connection failed. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#020202] font-mono text-cyan-400 isolate">
      <div className="fixed inset-0 opacity-70">
        <LetterGlitch
          glitchSpeed={50}
          smooth
          colors={['#12332b', '#37d6b4', '#5db8ff']}
          showCenterVignette
          showOuterVignette={false}
        />
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.3)_0%,rgba(2,6,12,0.58)_34%,#020202_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_34%)]" />

      {/* HUD Scanline Effect */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-45" />

      {/* Sidebar */}
      <div className={`relative z-20 shrink-0 overflow-hidden border-cyan-900/50 bg-black/60 backdrop-blur-xl transition-all duration-300 ${sidebarOpen ? 'w-80 border-r p-6' : 'w-0 border-r-0 p-0'}`}>
        <div className="flex items-center gap-4 mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 animate-pulse" />
            <div className="relative w-12 h-12 bg-black border border-cyan-500/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white uppercase italic">SURVE<span className="text-cyan-500">X</span></h1>
            <p className="text-[8px] tracking-[0.3em] text-cyan-500/50 uppercase">System Active</p>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-4 rounded-xl border border-cyan-900/50 bg-slate-950/85 p-4 shadow-[0_0_18px_rgba(8,145,178,0.12)]">
            <p className="text-[10px] tracking-[0.2em] font-bold text-cyan-500/30 uppercase">Status</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-500/70 uppercase">Ready</span>
              <span className="text-[10px] text-white">Online</span>
            </div>
            <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[99%] animate-pulse" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-cyan-900/50">
          <div className="mb-4 flex items-center gap-4 rounded-2xl border border-cyan-500/20 bg-slate-950/90 p-4">
            <div className="w-10 h-10 bg-black border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-white truncate uppercase tracking-widest">{user?.username}</p>
              <p className="text-[8px] text-cyan-500/50 uppercase tracking-tighter italic">Active User</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-500/50 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Command Center */}
      <div className="relative z-20 flex min-w-0 flex-1 flex-col">
        {/* Header HUD Bar */}
        <div className="flex items-center justify-between border-b border-cyan-900/50 bg-black/60 px-10 py-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-black/50 text-cyan-400 transition-all hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            <h2 className="font-black text-sm text-white uppercase tracking-[0.3em]">SURVE<span className="text-cyan-500">X</span></h2>
          </div>
          <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-500/40 uppercase">
            <span className="text-cyan-400">Online</span>
          </div>
        </div>

        {/* Neural Log (Messages) */}
        <div className="relative flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-6 max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all ${
                  msg.role === 'user' 
                    ? 'bg-slate-950/95 border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.12)]' 
                    : 'bg-slate-950/95 border-cyan-400/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                }`}>
                  {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div className={`relative p-6 rounded-2xl border ${
                  msg.role === 'user' 
                    ? 'bg-slate-950/92 border-cyan-700/50 text-cyan-50 rounded-tr-none backdrop-blur-md shadow-[0_14px_30px_rgba(2,6,23,0.42)]' 
                    : 'bg-slate-950/88 border-cyan-400/35 text-white rounded-tl-none backdrop-blur-md shadow-[0_14px_30px_rgba(8,145,178,0.1)]'
                }`}>
                  {msg.role === 'assistant' && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl rounded-tl-none bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_55%)]" />
                  )}
                  <p className="text-sm leading-relaxed tracking-wide relative z-10">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-6 max-w-[70%] flex-row">
                <div className="flex h-12 w-12 flex-shrink-0 animate-pulse items-center justify-center rounded-xl border border-cyan-400/60 bg-slate-950/95 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-cyan-400/35 bg-slate-950/88 p-6 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef}></div>
        </div>

        {/* Input Terminal */}
        <div className="p-10 pt-0">
          <form onSubmit={handleSend} className="relative group">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-10 transition-opacity group-focus-within:opacity-20" />
            <div className="relative flex items-center gap-4 rounded-2xl border border-cyan-400/35 bg-slate-950/92 p-2 backdrop-blur-xl transition-all shadow-2xl shadow-cyan-950/50 focus-within:border-cyan-300">
              <div className="pl-4 text-cyan-500/50"><TerminalIcon className="w-5 h-5" /></div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask SurveX..."
                className="flex-1 bg-transparent py-4 text-sm font-black uppercase tracking-widest text-white outline-none placeholder:text-cyan-200/35"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-14 h-14 bg-cyan-600 text-black rounded-xl flex items-center justify-center hover:bg-cyan-400 disabled:bg-cyan-950 disabled:text-cyan-900 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] group/btn"
              >
                <Send className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </form>
          <div className="mt-6 flex justify-between items-center px-4">
            <div className="flex gap-4">
              <span className="text-[8px] tracking-[0.2em] text-cyan-500/30 uppercase font-black">Secure</span>
              <span className="text-[8px] tracking-[0.2em] text-cyan-500/30 uppercase font-black">14ms</span>
            </div>
            <p className="text-[8px] tracking-[0.2em] text-cyan-900 uppercase font-black">
              SurveX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
