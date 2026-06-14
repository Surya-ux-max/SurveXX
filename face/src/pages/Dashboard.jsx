import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, LogOut, User, Sparkles, Cpu, Activity, Shield, Terminal as TerminalIcon, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Survex neural interface online. Greetings, Suryaprakash. All systems are operational. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM_ERROR: Uplink to core failed. Ensure neural bridge is active." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020202] text-cyan-400 font-mono overflow-hidden">
      {/* HUD Scanline Effect */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-30" />

      {/* Sidebar - Advanced HUD Panel */}
      <div className="w-80 bg-black/40 border-r border-cyan-900/50 flex flex-col p-6 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 animate-pulse" />
            <div className="relative w-12 h-12 bg-black border border-cyan-500/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white uppercase italic">SURVE<span className="text-cyan-500">X</span></h1>
            <p className="text-[8px] tracking-[0.3em] text-cyan-500/50 uppercase">Neural Core OS v4.0</p>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] font-bold text-cyan-500/30 uppercase mb-4">Core Systems</p>
            <button className="w-full flex items-center gap-4 px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg font-bold text-xs transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              <TerminalIcon className="w-4 h-4" /> NEURAL_BRIDGE
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-cyan-500/5 text-cyan-500/50 rounded-lg font-bold text-xs transition-all">
              <Shield className="w-4 h-4" /> DEFENSE_GRID
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-cyan-500/5 text-cyan-500/50 rounded-lg font-bold text-xs transition-all">
              <Zap className="w-4 h-4" /> POWER_CORE
            </button>
          </div>

          <div className="p-4 border border-cyan-900/50 rounded-xl bg-cyan-950/10 space-y-4">
            <p className="text-[10px] tracking-[0.2em] font-bold text-cyan-500/30 uppercase">Biometrics</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-500/70 uppercase">Uptime</span>
              <span className="text-[10px] text-white">99.98%</span>
            </div>
            <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[99%] animate-pulse" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-cyan-900/50">
          <div className="flex items-center gap-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl mb-4">
            <div className="w-10 h-10 bg-black border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-white truncate uppercase tracking-widest">{user?.username}</p>
              <p className="text-[8px] text-cyan-500/50 uppercase tracking-tighter italic">Authorized Creator</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-500/50 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            <LogOut className="w-3 h-3" /> Terminate Session
          </button>
        </div>
      </div>

      {/* Main Command Center */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header HUD Bar */}
        <div className="px-10 py-6 border-b border-cyan-900/50 bg-black/20 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            <h2 className="font-black text-sm text-white uppercase tracking-[0.3em]">AI_BRIDGE_ESTABLISHED</h2>
          </div>
          <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] text-cyan-500/40 uppercase">
            <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> SYNC: 100%</span>
            <span className="flex items-center gap-2 text-cyan-400 animate-pulse"><Sparkles className="w-3 h-3" /> SURVEX: LISTENING</span>
          </div>
        </div>

        {/* Neural Log (Messages) */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-6 max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all ${
                  msg.role === 'user' 
                    ? 'bg-black border-cyan-500/30 text-cyan-500' 
                    : 'bg-cyan-600/10 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                }`}>
                  {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div className={`relative p-6 rounded-2xl border ${
                  msg.role === 'user' 
                    ? 'bg-black/40 border-cyan-900/50 text-cyan-100 rounded-tr-none' 
                    : 'bg-cyan-950/20 border-cyan-500/30 text-white rounded-tl-none shadow-inner'
                }`}>
                  {/* Hexagon Pattern Overlay for AI Messages */}
                  {msg.role === 'assistant' && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  )}
                  <p className="text-sm leading-relaxed tracking-wide relative z-10">{msg.content}</p>
                  <div className={`absolute bottom-[-20px] text-[8px] font-bold tracking-widest uppercase opacity-30 ${
                    msg.role === 'user' ? 'right-0' : 'left-0'
                  }`}>
                    {msg.role === 'user' ? 'TRANSMISSION_ID: TX-774' : 'SYNTHESIS_ID: RX-991'}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-6 max-w-[70%] flex-row">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-cyan-600/10 border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-pulse">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 rounded-tl-none flex items-center gap-2">
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
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-5 group-focus-within:opacity-20 transition-opacity" />
            <div className="relative flex items-center gap-4 bg-black/60 border border-cyan-500/30 rounded-2xl p-2 focus-within:border-cyan-400 transition-all shadow-2xl shadow-cyan-950/50">
              <div className="pl-4 text-cyan-500/50"><TerminalIcon className="w-5 h-5" /></div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="INPUT COMMAND OR QUERY..."
                className="flex-1 bg-transparent py-4 text-sm text-white placeholder-cyan-900 outline-none uppercase tracking-widest font-black"
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
              <span className="text-[8px] tracking-[0.2em] text-cyan-500/30 uppercase font-black">ENC_MODE: RSA_4096</span>
              <span className="text-[8px] tracking-[0.2em] text-cyan-500/30 uppercase font-black">LATENCY: 14MS</span>
            </div>
            <p className="text-[8px] tracking-[0.2em] text-cyan-900 uppercase font-black">
              Property of Suryaprakash Neural Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
