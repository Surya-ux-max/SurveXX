import { Link } from 'react-router-dom';
import { Bot, Shield, Zap, ArrowRight, Sparkles, Cpu, Activity, Globe } from 'lucide-react';
import Dither from '../components/Dither';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-cyan-400 selection:bg-cyan-500/30 overflow-x-hidden font-mono">
      {/* Full Page Dither Background - Holographic Blue */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Dither 
          waveColor={[0.0, 0.8, 0.9]} // Arc Reactor Cyan
          disableAnimation={false} 
          enableMouseInteraction 
          mouseRadius={0.3} 
          colorNum={4} 
          waveAmplitude={0.2} 
          waveFrequency={4} 
          waveSpeed={0.02} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      {/* HUD Scanline Effect */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-20" />

      <div className="relative z-20">
        {/* Top HUD Bar */}
        <nav className="flex items-center justify-between px-10 py-6 border-b border-cyan-900/50 backdrop-blur-md bg-black/40">
          <div className="flex items-center gap-4 group">
            <div className="relative">
              {/* Spinning Arc Reactor Ring */}
              <div className="absolute inset-[-4px] border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-8px] border border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="relative w-12 h-12 bg-black border border-cyan-500/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-[0.2em] leading-none uppercase italic text-white">
                SURVE<span className="text-cyan-500">X</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.4em] font-bold text-cyan-500/70 uppercase">Protocol: Active</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] tracking-[0.3em] font-bold uppercase text-cyan-500/50">
            <div className="flex items-center gap-2"><Activity className="w-3 h-3" /> System: Stable</div>
            <div className="flex items-center gap-2"><Globe className="w-3 h-3" /> Network: Encrypted</div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-xs tracking-widest uppercase hover:text-white transition-colors">Access</Link>
            <Link to="/login" className="relative px-8 py-2 border border-cyan-500/50 text-cyan-400 text-[10px] tracking-[0.3em] font-black uppercase hover:bg-cyan-500/10 transition-all group overflow-hidden">
              <span className="relative z-10">Initialize</span>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:left-[100%] transition-all duration-500" />
            </Link>
          </div>
        </nav>

        {/* Main Interface */}
        <main className="max-w-7xl mx-auto px-10 pt-24 pb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-cyan-500/30 rounded-md bg-cyan-500/5 text-[10px] font-bold tracking-[0.3em] uppercase mb-10">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Neural Interface v1.0.4
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none uppercase text-white">
                It's me<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-700">SurveX</span>
              </h1>
              
              <p className="text-lg text-cyan-500/60 max-w-lg mb-12 leading-relaxed tracking-tight border-l-2 border-cyan-500/20 pl-6">
                I am Survex. Your personal knowledge ally and digital sentinel. 
                Standing by to assist you and your designated network. 
                How shall we proceed?
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-4 bg-cyan-600 text-black px-10 py-4 font-black tracking-widest uppercase hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] group">
                  Deploy Survex <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <button className="w-full sm:w-auto px-10 py-4 border border-cyan-500/30 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-cyan-500/5 transition-all">
                  Diagnostic Reports
                </button>
              </div>
            </div>

            {/* Circular HUD Visualization */}
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border-[10px] border-cyan-500/5 rounded-full" />
              <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-10 border-2 border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
              <div className="absolute inset-20 border border-cyan-500/10 rounded-full" />
              
              {/* Inner Core */}
              <div className="absolute inset-[35%] bg-cyan-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <div className="w-full h-full rounded-full animate-pulse bg-[radial-gradient(circle,rgba(6,182,212,0.4)_0%,transparent_70%)]" />
                <Bot className="absolute w-16 h-16 text-cyan-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>

              {/* Data Points */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4 flex flex-col items-center">
                <div className="h-10 w-[1px] bg-cyan-500/50" />
                <span className="text-[8px] tracking-[0.4em] font-bold text-cyan-400">CORE_TEMP: 34°C</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-4 flex flex-col items-center">
                <span className="text-[8px] tracking-[0.4em] font-bold text-cyan-400">LOGIC_LOAD: 12%</span>
                <div className="h-10 w-[1px] bg-cyan-500/50" />
              </div>
            </div>
          </div>

          {/* HUD Footer Modules */}
          <div className="grid md:grid-cols-3 gap-1 border-t border-cyan-900/50 mt-32 bg-cyan-950/10">
            <div className="p-8 border-r border-cyan-900/50 hover:bg-cyan-500/5 transition-colors group">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-cyan-500" />
                <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white">Module 01</span>
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 group-hover:text-white">Neural Processing</h3>
              <p className="text-xs text-cyan-500/50 leading-loose">Sub-second retrieval from encrypted knowledge vaults via Llama 3.3 backbone.</p>
            </div>

            <div className="p-8 border-r border-cyan-900/50 hover:bg-cyan-500/5 transition-colors group">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-cyan-500" />
                <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white">Module 02</span>
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 group-hover:text-white">Loyalty Protocol</h3>
              <p className="text-xs text-cyan-500/50 leading-loose">Prioritized defense of creator interests with adaptive truthful filtering.</p>
            </div>

            <div className="p-8 hover:bg-cyan-500/5 transition-colors group">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-cyan-500" />
                <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white">Module 03</span>
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 group-hover:text-white">Adaptive Wit</h3>
              <p className="text-xs text-cyan-500/50 leading-loose">Conversational synthesis with integrated humor and contextual awareness.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
