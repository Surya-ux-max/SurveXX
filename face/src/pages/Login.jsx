import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, Cpu, ShieldCheck } from 'lucide-react';
import ShapeGrid from '../components/ShapeGrid';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 font-mono relative overflow-hidden">
      <div className="absolute inset-0 opacity-80 blur-[0.2px] scale-[1.02]">
        <ShapeGrid
          speed={0.32}
          squareSize={42}
          direction="diagonal"
          borderColor="rgba(34, 211, 238, 0.34)"
          hoverFillColor="rgba(34, 211, 238, 0.12)"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22)_0%,rgba(8,20,32,0.35)_40%,#020202_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,30,46,0.16)_0%,rgba(2,2,2,0.04)_35%,rgba(2,2,2,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,0.14)_0%,transparent_32%)]" />

      {/* HUD Scanline Effect */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.03)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,255,0.02),rgba(0,120,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-30" />
      
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/16 blur-[150px] animate-pulse" />
      <div className="absolute left-1/2 top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-200/10 blur-3xl" />
      <div className="absolute inset-x-0 top-[18%] mx-auto h-32 w-[28rem] bg-cyan-300/10 blur-[110px]" />

      <div className="max-w-md w-full bg-black/60 backdrop-blur-xl rounded-3xl shadow-[0_0_70px_rgba(6,182,212,0.18)] p-10 border border-cyan-400/25 relative z-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-cyan-300/10" />
        <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-24 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent blur-md animate-hud-sweep" />
        <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-cyan-300/80 animate-hud-pulse" />
        <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r border-t border-cyan-300/80 animate-hud-pulse" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b border-l border-cyan-300/80 animate-hud-pulse" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-cyan-300/80 animate-hud-pulse" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

        <div className="text-center mb-12">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20" />
            <div className="relative w-20 h-20 bg-black border border-cyan-500/40 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Cpu className="w-10 h-10 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-[0.2em] italic">Access Portal</h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-cyan-500/50">
            <ShieldCheck className="w-4 h-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Encrypted Uplink Required</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-cyan-500/50 uppercase tracking-[0.3em] pl-1">Identity_ID</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white placeholder-cyan-900 uppercase text-xs tracking-widest font-bold"
                placeholder="INPUT_USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-cyan-500/50 uppercase tracking-[0.3em] pl-1">Security_Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white placeholder-cyan-900 uppercase text-xs tracking-widest font-bold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-4 bg-cyan-600 text-black py-5 rounded-xl font-black tracking-[0.3em] uppercase hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] group"
          >
            Authorize <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-cyan-900/30 text-center">
          <p className="text-[8px] text-cyan-500/30 uppercase tracking-[0.4em] font-black">
            Warning: Unauthorized access is strictly prohibited. <br />
            System logs are being recorded.
          </p>
          <Link to="/" className="inline-block mt-4 text-[10px] text-cyan-500 hover:text-white transition-colors uppercase font-black tracking-widest">
            Return to Core
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
