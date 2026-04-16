import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle, Activity, ShieldCheck, ChevronLeft, ChevronRight, FileX, ShieldOff, Fingerprint, Lock, ArrowRight, ScanLine, LogOut, Terminal, Zap, User, Clock, Layers, Maximize, FileText, Download } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function App() {
  const [user, setUser] = React.useState(null);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "GOOGLE_SSO_PENDING"}>
      <div className="relative min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden font-sans flex flex-col" style={{ perspective: "1500px" }}>
        
        <BackgroundAnimation />

      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div key="website" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full flex-1 flex flex-col z-10">
             <WebsitePortal onLogin={(userData) => setUser(userData)} />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95, y: 50, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }} 
            transition={{ duration: 0.7, type: "spring", bounce: 0.3, delay: 0.1 }}
            className="flex-1 w-full min-h-screen flex flex-col p-4 sm:p-6 z-10 justify-center items-center"
          >
            <SentinelDashboard user={user} onLogout={() => setUser(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </GoogleOAuthProvider>
  );
}

const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
    <motion.div 
      animate={{ rotateZ: 360, scale: [1, 1.1, 1] }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full border border-teal-900/20 bg-gradient-to-tr from-teal-900/10 to-transparent blur-[100px]"
    />
    <motion.div 
      animate={{ rotateZ: -360, scale: [1, 1.2, 1] }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      className="absolute w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] rounded-full border border-orange-900/10 bg-gradient-to-bl from-orange-900/20 to-transparent blur-[80px]"
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
  </div>
);

// --- WEBSITE PORTAL (Landing Page + Billing) ---
function WebsitePortal({ onLogin }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  return (
    <div className="relative w-full flex flex-col">
      <nav className="w-full h-20 border-b border-white/5 bg-slate-950/60 backdrop-blur-md flex items-center justify-between px-6 sm:px-12 fixed top-0 z-50">
        <div className="flex items-center space-x-3 text-teal-400 font-bold text-xl tracking-widest uppercase">
          <ScanLine className="w-6 h-6" />
          <span className="drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">SENTINEL OS</span>
        </div>
        <div className="hidden md:flex items-center space-x-10 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          <a href="#features" className="hover:text-teal-400 transition-colors">Architecture</a>
          <a href="#billing" className="hover:text-teal-400 transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-teal-400 transition-colors">Docs</a>
        </div>
        <button 
          onClick={() => setShowLoginModal(true)}
          className="bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-widest uppercase border border-teal-500/30 hover:border-teal-400 transition-all shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
        >
          Node Login
        </button>
      </nav>

      <section className="w-full min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 shadow-inner"
        >
          <Zap className="w-3 h-3 text-teal-400" />
          <span>v4.0 Enclave Now Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter mb-8 max-w-5xl leading-tight drop-shadow-2xl"
        >
          Autonomous Edge Control for Global Infrastructure.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-slate-400 max-w-3xl mb-12 tracking-wide leading-relaxed font-light"
        >
          Sentinel OS is a multi-agent orchestrated environment that automates customs classifications, detects regulatory violations, and auto-generates dynamic transit documentation instantaneously.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 z-10 p-2">
          <button 
            onClick={() => setShowLoginModal(true)}
            className="group bg-teal-500 text-slate-950 font-bold px-8 py-4 rounded-xl font-mono uppercase tracking-[0.15em] flex items-center space-x-3 shadow-[0_0_30px_rgba(45,212,191,0.5)] hover:bg-teal-400 transition-all hover:scale-105"
          >
            <ScanLine className="w-4 h-4" />
            <span>Launch Sentinel</span>
          </button>
        </motion.div>
      </section>

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowLoginModal(false)}/>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="z-10 w-full max-w-md relative">
            <div className="absolute -top-10 -right-4 md:-right-10 z-20"><button onClick={() => setShowLoginModal(false)} className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full shadow-lg"><FileX className="w-5 h-5" /></button></div>
            <LoginScreen onLogin={(userData) => { setShowLoginModal(false); onLogin(userData); }} />
          </motion.div>
        </div>
      )}
    </div>
  );
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const LoginScreen = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [agentId, setAgentId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [authKey, setAuthKey] = React.useState('');
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [bindingContext, setBindingContext] = React.useState(null);

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!agentId || !authKey) return;
    setIsAuthenticating(true);
    setErrorMsg('');
    
    // Simulate initial loading bar before fetching
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 20;
      if (current >= 80) clearInterval(interval);
      setProgress(Math.round(current));
    }, 150);

    try {
      const endpoint = bindingContext 
        ? 'http://localhost:8000/api/v1/auth/google/bind' 
        : (isSignUp ? 'http://localhost:8000/api/v1/auth/signup' : 'http://localhost:8000/api/v1/auth/login');
        
      const body = bindingContext
        ? { operator_id: agentId, password: authKey, token: bindingContext.google_token }
        : (isSignUp ? { operator_id: agentId, email, password: authKey } : { operator_id: agentId, password: authKey });
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        if (!res.ok) {
          setErrorMsg(data.detail || "Authentication Failed");
          setIsAuthenticating(false);
          setProgress(0);
        } else {
          onLogin(data);
        }
      }, 500);

    } catch (err) {
      clearInterval(interval);
      setErrorMsg("Network Error tracking Enclave. Is backend running?");
      setIsAuthenticating(false);
      setProgress(0);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;
    setIsAuthenticating(true);
    setErrorMsg('');
    setProgress(50);
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await res.json();
      setProgress(100);
      
      if (!res.ok) {
        if (data.detail && data.detail.message === "BINDING_REQUIRED") {
            // Initiate Step 2!
            setBindingContext(data.detail);
            setEmail(data.detail.email);
            setIsAuthenticating(false);
        } else {
            setErrorMsg(data.detail || "Google Federation Sequence Failed");
            setIsAuthenticating(false);
        }
      } else {
        setTimeout(() => onLogin(data), 500);
      }
    } catch (err) {
      setErrorMsg("Network Error routing Google Single Sign-on Pipeline.");
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="w-full">
      <motion.div className="bg-slate-900/80 backdrop-blur-2xl border border-teal-900/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-8 pb-5 text-center border-b border-slate-800 relative overflow-hidden">
          <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="w-16 h-16 mx-auto mb-4 bg-slate-950 border border-teal-500/40 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.2)]"><ScanLine className="w-8 h-8 text-teal-400" /></motion.div>
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">SENTINEL OS</h1>
        </div>

        <div className="p-8 relative min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isAuthenticating ? (
              <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, filter: "blur(5px)" }} className="w-full">
                
                {!bindingContext ? (
                  <div className="flex bg-slate-950 rounded-lg p-1 mb-6 border border-slate-800">
                    <button type="button" onClick={() => setIsSignUp(false)} className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest rounded transition-colors ${!isSignUp ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30' : 'text-slate-500 hover:text-slate-300'}`}>Sign In</button>
                    <button type="button" onClick={() => setIsSignUp(true)} className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest rounded transition-colors ${isSignUp ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30' : 'text-slate-500 hover:text-slate-300'}`}>Register Node</button>
                  </div>
                ) : (
                  <div className="bg-teal-950/40 border border-teal-500/50 p-4 rounded-xl mb-6 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                    <div className="flex items-center space-x-3 text-teal-400 mb-2 font-mono text-xs"><CheckCircle className="w-4 h-4"/><span>Google Identity Verified</span></div>
                    <div className="text-slate-300 text-sm">Welcome <span className="font-bold text-white">{bindingContext.name}</span>! Please choose your official Sentinel Operator ID and Master Password to secure this node.</div>
                  </div>
                )}
                
                {errorMsg && <div className="mb-4 text-red-400 text-xs font-mono text-center bg-red-900/20 p-2 rounded border border-red-500/30">{errorMsg}</div>}
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative group"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Fingerprint className="h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" /></div><input type="text" value={agentId} onChange={(e) => setAgentId(e.target.value)} placeholder="Operator ID / Service Account" className="w-full bg-slate-950/80 border border-slate-700 text-teal-300 font-mono text-sm rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-teal-500" required /></div>
                  
                  {(isSignUp || bindingContext) && (
                    <div className="relative group"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" /></div><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email / Gmail Binding" readOnly={!!bindingContext} className={`w-full bg-slate-950/80 border border-slate-700 text-teal-300 font-mono text-sm rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-teal-500 ${bindingContext ? 'opacity-60 cursor-not-allowed' : ''}`} required /></div>
                  )}
                  
                  <div className="relative group"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" /></div><input type="password" value={authKey} onChange={(e) => setAuthKey(e.target.value)} placeholder="••••••••••••" className="w-full bg-slate-950/80 border border-slate-700 text-teal-300 font-mono text-sm rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-teal-500" required /></div>
                  
                  <div className="pt-2">
                    <button type="submit" className="w-full bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 border border-teal-500/30 font-mono text-xs font-bold tracking-widest uppercase rounded-lg py-4 flex items-center justify-center space-x-3 transition-colors">
                        <span>{bindingContext ? 'Bind & Initialize Handshake' : (isSignUp ? 'Create Node' : 'Initialize Handshake')}</span>
                    </button>
                  </div>
                </form>

                {!bindingContext && (
                    <div className="mt-8 border-t border-slate-800/80 pt-6 relative px-2">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-md px-3 text-[10px] text-slate-500 font-mono tracking-widest uppercase">Federated Login</div>
                       <div className="flex justify-center w-full min-h-[44px]">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => setErrorMsg("Google Pop-up interrupted or failed.")}
                          theme="filled_black"
                          shape="rectangular"
                          size="large"
                          width="280"
                          text="continue_with"
                        />
                      </div>
                    </div>
                )}

              </motion.div>
            ) : (
              <motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-8 flex flex-col items-center justify-center w-full">
                <div className="relative w-20 h-20 mb-8"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t-2 border-r-2 border-teal-400" /><div className="absolute inset-0 flex items-center justify-center"><ShieldCheck className="w-8 h-8 text-teal-400" /></div></div>
                <h3 className="font-mono text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">Authorizing Node</h3>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800 p-[1px]"><motion.div className="bg-teal-400 h-full rounded-full" animate={{ width: `${progress}%` }} transition={{ type: "tween", ease: "linear", duration: 0.2 }} /></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};


// --- SENTINEL DASHBOARD (HUB ROUTER) ---
function SentinelDashboard({ user, onLogout }) {
  const [currentView, setCurrentView] = React.useState('hub');

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[75vh] min-h-[600px] bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-[0_0_50px_rgba(45,212,191,0.05)] overflow-hidden">
      
      {/* Universal Dashboard Header */}
      <div className="flex justify-between items-center p-6 border-b border-slate-800/50 relative z-20 bg-slate-950/50">
        <div className="flex items-center space-x-4">
          <ScanLine className="w-8 h-8 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              SENTINEL OS
            </h2>
            <span className="font-mono text-[9px] text-teal-500 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-1.5 animate-pulse"></span>
              Enclave Active - Op {user?.operator_id}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentView !== 'hub' && (
            <button onClick={() => setCurrentView('hub')} className="flex items-center space-x-2 text-slate-300 hover:text-teal-400 font-mono text-xs uppercase tracking-widest transition-colors bg-slate-900 border border-slate-700 hover:border-teal-500/50 px-4 py-2 rounded-xl">
              <ChevronLeft className="w-4 h-4" />
              <span>Hub Return</span>
            </button>
          )}
          <button onClick={onLogout} className="flex items-center space-x-2 text-slate-400 hover:text-red-400 font-mono text-xs uppercase tracking-widest transition-colors bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 hover:border-red-900/50">
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Log</span>
          </button>
        </div>
      </div>

      {/* Router Viewport */}
      <div className="flex-1 relative overflow-hidden bg-slate-900/40">
        <AnimatePresence mode="wait">
          {currentView === 'hub' && (
            <motion.div key="hub" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(5px)" }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center p-8">
              <HubView onNav={setCurrentView} />
            </motion.div>
          )}
          {currentView === 'wizard' && (
            <motion.div key="wizard" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.4 }} className="absolute inset-0">
              <ProcessingWizard user={user} onComplete={() => setCurrentView('hub')} />
            </motion.div>
          )}
          {currentView === 'history' && (
            <motion.div key="history" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.4 }} className="absolute inset-0">
              <HistoryView user={user} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45, 212, 191, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45, 212, 191, 0.4); }
      `}} />
    </div>
  );
}

// ---------------- VIEWS ----------------

const HubView = ({ onNav }) => (
  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
    
    <motion.button 
      onClick={() => onNav('wizard')}
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-slate-950/80 border border-teal-500/40 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(45,212,191,0.1)] hover:shadow-[0_0_50px_rgba(45,212,191,0.3)] hover:border-teal-400 group transition-all relative overflow-hidden h-80"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/20 rounded-full blur-[60px] group-hover:bg-teal-400/30 transition-all pointer-events-none"></div>
      <div className="p-6 bg-teal-500/10 border border-teal-500/30 rounded-2xl mb-6 shadow-inner pointer-events-none group-hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all">
        <UploadCloud className="w-14 h-14 text-teal-400 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 tracking-wide mb-3 pointer-events-none">Agentic Pipeline</h3>
      <p className="text-slate-400 font-mono text-xs uppercase tracking-widest pointer-events-none">Extract & Validate Declarations</p>
    </motion.button>
    
    <motion.button 
      onClick={() => onNav('history')}
      whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-slate-950/80 border border-slate-700/80 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(100,116,139,0.3)] hover:border-slate-500 group transition-all relative overflow-hidden h-80"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-slate-600/10 rounded-full blur-[60px] group-hover:bg-slate-500/20 transition-all pointer-events-none"></div>
      <div className="p-6 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-inner pointer-events-none">
        <Clock className="w-14 h-14 text-slate-400 group-hover:text-slate-200 group-hover:scale-110 transition-all" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 tracking-wide mb-3 pointer-events-none">Operator History</h3>
      <p className="text-slate-400 font-mono text-xs uppercase tracking-widest pointer-events-none">View Previous Tasks & Logs</p>
    </motion.button>

  </div>
);

const ProcessingWizard = ({ user, onComplete }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [taskData, setTaskData] = React.useState(null);

  const logEvent = (tag, type, message) => {
    if (!user) return;
    fetch(`http://localhost:8000/api/v1/history/${user.user_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log_tag: tag, log_type: type, log_message: message })
    }).catch(() => {});
  };

  React.useEffect(() => {
    let intervalId;
    if (activeStep === 1 && taskData && taskData.status !== "SUCCESS") {
      intervalId = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:8000/api/v1/extract/status/${taskData.task_id}`);
          const statusData = await res.json();
          if (statusData.status === "SUCCESS") {
            setTaskData({ ...taskData, ...statusData.result, status: "SUCCESS" });
            clearInterval(intervalId);
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 1500);
    }
    return () => clearInterval(intervalId);
  }, [activeStep, taskData]);

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch('http://localhost:8000/api/v1/extract', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setTaskData(data);
      logEvent("UPLOAD", "info", `Transmitted ${file.name} to buffer with Task ID [${data.task_id}].`);
      
      // Auto-advance
      setIsUploading(false);
      setDirection(1);
      setActiveStep(1);
    } catch (err) {
      logEvent("ERROR", "warning", `Failed to transmit ${file.name} to the Enclave.`);
      setIsUploading(false);
      alert("Network exception communicating with Celery Pipeline. Make sure backend is running.");
    }
  };

  const nextStep = () => {
    if (activeStep < 3) {
      if (activeStep === 0) return; // Forced file upload logic manages step 0 transitioning
      if (activeStep === 1) logEvent("VALIDATE", "warning", "Validation triggered checking duties and Hazmat status.");
      if (activeStep === 2) logEvent("GENERATED", "success", "Structured pipeline completed with Auto-Fix defaults.");
      
      setDirection(1);
      setActiveStep(prev => prev + 1);
    } else {
      logEvent("EGRESS", "info", "Declaration payload transmitted to Port Authority API successfully.");
      onComplete();
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setDirection(-1);
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, rotateY: { type: "spring", stiffness: 200, damping: 25 } }}
            className="absolute inset-0 flex items-center justify-center p-8 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {activeStep === 0 && <ViewDocumentUpload onFileSelect={handleFileUpload} isUploading={isUploading} />}
            {activeStep === 1 && <ViewClassification taskData={taskData} />}
            {activeStep === 2 && <ViewValidation taskData={taskData} onFix={() => nextStep()} />}
            {activeStep === 3 && <ViewDeclarationGeneration taskData={taskData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Wizard Footer Controls */}
      <div className="h-20 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between px-8 relative z-20">
        <button
          onClick={prevStep}
          disabled={activeStep === 0 || isUploading}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-mono text-sm tracking-wider uppercase transition-all duration-300 ${
            activeStep === 0 || isUploading ? "text-slate-700 cursor-not-allowed" : "text-teal-400 bg-slate-900 border border-slate-700 hover:border-teal-500"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Progress Tracker (4 Steps now) */}
        <div className="flex space-x-6 sm:space-x-8">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="relative flex items-center justify-center">
              <div className={`w-3.5 h-3.5 rounded-full z-10 transition-all duration-500 ${activeStep === step ? 'bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)] scale-125' : activeStep > step ? 'bg-teal-800' : 'bg-slate-800 border-2 border-slate-700'}`} />
              {step < 3 && (
                <div className={`absolute left-3.5 w-6 sm:w-8 h-0.5 origin-left transition-colors duration-500 ${activeStep > step ? 'bg-teal-800' : 'bg-slate-800'}`} />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={activeStep === 3 || activeStep === 0}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-mono text-sm tracking-wider uppercase transition-all duration-300 ${
            activeStep === 3 || activeStep === 0 ? "bg-teal-900/30 text-teal-900 cursor-not-allowed" : "bg-teal-500/10 text-teal-400 border border-teal-500/40 hover:bg-teal-500 hover:text-slate-950 shadow-[0_0_15px_rgba(45,212,191,0.2)]"
          }`}
        >
          <span>{activeStep === 3 ? "Complete" : activeStep === 0 ? "Awaiting Upload" : "Next Phase"}</span>
          {activeStep !== 3 && activeStep !== 0 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 500 : -500, rotateY: direction > 0 ? -25 : 25, opacity: 0, scale: 0.8 }),
  center: { zIndex: 1, x: 0, rotateY: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, rotateY: direction < 0 ? -25 : 25, opacity: 0, scale: 0.8 }),
};

// --- WIZARD TRACK 3 STEPS ---

// Step 1: Upload
const ViewDocumentUpload = ({ onFileSelect, isUploading }) => {
  const fileInputRef = React.useRef(null);

  const handleBoxClick = () => {
    if (!isUploading && fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) onFileSelect(file);
  };

  return (
    <div className="flex flex-col items-center relative overflow-hidden bg-slate-900/60 border border-slate-800/80 rounded-3xl p-10 w-full max-w-2xl h-full justify-center shadow-2xl">
      <div className="absolute inset-x-12 -top-10 bottom-10 bg-[#f8fafc] rounded shadow-2xl flex flex-col pt-16 pb-4 border-l-8 border-l-slate-400 rotate-2 scale-105 pointer-events-none opacity-[0.8] transition-transform duration-700 ease-out z-0">
        <div className="w-full flex justify-between px-8 border-b-2 border-slate-300 pb-4 mb-6">
          <div className="font-mono text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Commercial Invoice / Bill of Lading</div>
          <div className="flex space-x-1">
             {[...Array(20)].map((_, i) => <div key={i} className="h-8 bg-slate-800" style={{ width: `${Math.random() * 4 + 1}px` }}></div>)}
          </div>
        </div>
        <div className="space-y-4 px-8 opacity-20">
          <div className="h-3 bg-slate-900 rounded w-3/4"></div>
          <div className="h-3 bg-slate-900 rounded w-1/2"></div>
          <div className="border-t-2 border-dashed border-slate-400 my-6"></div>
        </div>
      </div>

      <motion.div onClick={handleBoxClick} whileHover={!isUploading ? { scale: 1.04 } : {}} className={`z-10 w-full flex-1 border-2 border-dashed ${isUploading ? 'border-teal-500/50 cursor-wait' : 'border-teal-500 cursor-pointer'} bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center transition-colors shadow-[0_0_40px_rgba(0,0,0,0.8)] my-8`}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg,.json" />
        {isUploading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-t-2 border-r-2 border-teal-400 mb-6" />
            <h2 className="text-2xl text-slate-100 font-bold tracking-wide">Transmitting to Enclave...</h2>
            <p className="text-teal-500 animate-pulse font-mono text-xs mt-3 uppercase tracking-widest text-center px-4">Engaging Celery Workers via HTTPS</p>
          </>
        ) : (
          <>
            <UploadCloud className="w-16 h-16 text-teal-400 mb-6 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            <h2 className="text-2xl text-slate-100 font-bold tracking-wide">Upload Documents</h2>
            <p className="text-slate-400 font-mono text-xs mt-3 uppercase tracking-widest text-center px-4">Provide Invoice and Bill of Lading to begin AI Extraction Protocol</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

// Step 2: Extraction & HS Code
const ViewClassification = ({ taskData }) => {
  if (!taskData || taskData.status !== "SUCCESS") {
    return (
      <div className="bg-slate-900/80 border border-teal-500/40 rounded-3xl p-10 flex flex-col w-full max-w-3xl h-full shadow-[0_0_50px_rgba(45,212,191,0.1)] relative overflow-hidden justify-center items-center backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-bl-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-tr-full blur-[80px]"></div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-t-2 border-r-2 border-teal-400 mb-6 z-10" />
        <h2 className="text-2xl text-slate-100 font-bold tracking-wide z-10">AI Extraction in Progress...</h2>
        <p className="text-teal-500 animate-pulse font-mono text-xs mt-3 uppercase tracking-widest text-center px-4 z-10">Parsing Document Context via Google Gemini 1.5 LLM</p>
      </div>
    );
  }

  const { hs_code, predicted_item, origin, destination } = taskData.extracted_data || {};

  return (
    <div className="bg-slate-900/80 border border-teal-500/40 rounded-3xl p-10 flex flex-col w-full max-w-3xl h-full shadow-[0_0_50px_rgba(45,212,191,0.1)] relative overflow-hidden justify-center items-center backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-bl-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-tr-full blur-[80px]"></div>
      
      <div className="w-full flex justify-between items-end mb-8 z-10 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-teal-400 font-bold z-10 text-xs tracking-widest uppercase mb-2">Step 1: Data Extraction</h3>
          <h2 className="text-2xl font-bold tracking-widest uppercase text-slate-200">Extracted Payload from Invoice</h2>
        </div>
        <div className="bg-teal-500/20 text-teal-400 px-4 py-2 rounded font-mono text-xs font-bold shadow-[0_0_15px_rgba(45,212,191,0.3)] border border-teal-500/30">
          LLM DYNAMIC PAYLOAD
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full mb-6 z-10">
        <div className="w-full space-y-4 font-mono text-sm bg-black/60 p-6 rounded-2xl border border-slate-700/80 shadow-inner">
          <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-4">Generative AI Found:</div>
          <div className="flex justify-between border-b border-slate-800/80 pb-2"><span className="text-slate-500 uppercase tracking-widest font-bold">Item:</span><span className="text-slate-100">{predicted_item || "Unknown"}</span></div>
          <div className="flex justify-between border-b border-slate-800/80 pb-2"><span className="text-slate-500 uppercase tracking-widest font-bold">Origin:</span><span className="text-teal-400 font-bold bg-teal-900/30 px-2 rounded">{origin || "???"}</span></div>
          <div className="flex justify-between pb-1"><span className="text-slate-500 uppercase tracking-widest font-bold">Destination:</span><span className="text-teal-400 font-bold bg-teal-900/30 px-2 rounded">{destination || "???"}</span></div>
        </div>

        <div className="bg-slate-950 border border-teal-500/50 rounded-2xl p-6 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,1)]"></div>
          <h3 className="text-teal-400 font-bold z-10 text-[10px] tracking-widest uppercase mb-2">Predicted HS Code</h3>
          <div className="font-mono text-4xl text-white font-bold tracking-tight my-4 z-10 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">{hs_code || "Unknown"}</div>
          <div className="font-mono text-[9px] text-slate-400 mt-2 text-center">Standardized global tariff classification identified.</div>
        </div>
      </div>
    </div>
  );
};

// Wizard Step 3: Rules Validation
const ViewValidation = ({ taskData, onFix }) => {
  const isValid = taskData?.compliance_valid;
  const faults = taskData?.compliance_faults || [];
  const destination = taskData?.extracted_data?.destination || "Unknown";
  const hsCode = taskData?.extracted_data?.hs_code || "Unknown";

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center justify-center">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl h-[400px] flex flex-col">
        <h3 className="text-slate-400 mb-6 font-bold tracking-widest uppercase text-xs border-b border-slate-800 pb-4">Step 3: Country-Specific Compliance Checks</h3>
        
        <div className="flex-1 space-y-5">
          <div className="bg-slate-950 border border-teal-900/50 rounded-xl p-4 flex items-center space-x-4"><CheckCircle className="w-5 h-5 text-teal-400" /><span className="text-slate-300 font-mono text-xs leading-loose">Checking Import Duties for [{destination}]...<br/><span className="text-teal-500/50">PASSED: Computed Standard Tariff</span></span></div>
          <div className="bg-slate-950 border border-teal-900/50 rounded-xl p-4 flex items-center space-x-4"><CheckCircle className="w-5 h-5 text-teal-400" /><span className="text-slate-300 font-mono text-xs leading-loose">Checking Dual-Use Goods list...<br/><span className="text-teal-500/50">PASSED: HS {hsCode} is Clear</span></span></div>
          
          {isValid ? (
            <div className="bg-slate-950 border border-teal-900/50 rounded-xl p-4 flex items-center space-x-4"><CheckCircle className="w-5 h-5 text-teal-400" /><span className="text-slate-300 font-mono text-xs leading-loose">Validating Restricted/Hazmat limits...<br/><span className="text-teal-500/50">PASSED: Clear for Origin/Destination</span></span></div>
          ) : (
            <div className="bg-slate-950 border border-orange-500/40 rounded-xl p-4 flex items-center space-x-4 shadow-[0_0_15px_rgba(249,115,22,0.1)] relative overflow-hidden"><div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 animate-pulse"></div><Activity className="w-5 h-5 text-orange-400 animate-pulse" /><span className="text-slate-100 font-mono text-xs font-bold w-full">Validating Hazmat/Battery limits...</span></div>
          )}
        </div>
      </div>

      {!isValid ? (
        <div className="bg-slate-950 border border-red-500/50 rounded-3xl p-8 relative overflow-hidden h-[400px] flex flex-col shadow-[0_0_50px_rgba(239,68,68,0.15)] group">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30"><ShieldOff className="w-8 h-8 text-red-500 animate-pulse" /></div>
            <h2 className="text-xl font-bold text-red-500 tracking-widest uppercase shadow-sm">Validation Fault</h2>
          </div>
          
          <div className="flex-1 bg-black/60 border border-red-900/40 p-5 rounded-xl font-mono text-xs leading-loose mb-6">
            <p className="text-red-300 mb-2 font-bold">[!] Regulatory Agent check failed.</p>
            <p className="text-slate-300">Country Destination <span className="text-teal-400 px-1 border border-teal-900">{destination}</span> explicit flags triggered due to classification {hsCode}.</p>
            <p className="text-slate-400 mt-2 font-bold text-[10px] uppercase">{faults[0]}</p>
          </div>
          
          <button onClick={onFix} className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 hover:border-red-500 font-mono font-bold py-4 rounded-xl flex items-center justify-center space-x-3 transition-colors text-xs tracking-widest uppercase mt-auto shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <FileX className="w-4 h-4" /><span>Auto-Generate Missing Form</span>
          </button>
        </div>
      ) : (
        <div className="bg-slate-950 border border-teal-500/50 rounded-3xl p-8 relative overflow-hidden h-[400px] flex flex-col shadow-[0_0_50px_rgba(45,212,191,0.15)] group">
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-teal-500/20 rounded-xl border border-teal-500/30"><CheckCircle className="w-8 h-8 text-teal-500" /></div>
            <h2 className="text-xl font-bold text-teal-400 tracking-widest uppercase shadow-sm">Compliance Clear</h2>
          </div>
          
          <div className="flex-1 bg-black/60 border border-teal-900/40 p-5 rounded-xl font-mono text-xs leading-loose mb-6 flex flex-col justify-center items-center text-center">
            <p className="text-teal-300 mb-2 font-bold text-lg leading-loose mt-4">Shipment Fully Validated!</p>
            <p className="text-slate-300">No regulatory hazard flags detected for export destination <span className="text-teal-400 px-1 border border-teal-900 font-bold">{destination}</span>.</p>
          </div>
          
          <button onClick={onFix} className="w-full bg-teal-500/10 hover:bg-teal-500 text-teal-500 hover:text-slate-950 border border-teal-500/50 hover:border-teal-500 font-mono font-bold py-4 rounded-xl flex items-center justify-center space-x-3 transition-colors text-xs tracking-widest uppercase mt-auto shadow-[0_0_20px_rgba(45,212,191,0.2)]">
            <CheckCircle className="w-4 h-4" /><span>Proceed to Declaration</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Wizard Step 4 (NEW): Structured Defaults Generation
const ViewDeclarationGeneration = ({ taskData }) => {
  const [showFullDoc, setShowFullDoc] = React.useState(false);

  const handleDownload = () => {
    if (!taskData || !taskData.generated_form) return;
    const blob = new Blob([taskData.generated_form], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Customs_Declaration_${taskData.extracted_data?.hs_code || '999'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl justify-center relative">
      <div className="text-center mb-10">
        <span className="font-mono text-[10px] text-teal-400 bg-teal-950/50 px-3 py-1 rounded-full uppercase tracking-widest border border-teal-900/80 mb-4 inline-block">Step 4: Output Synthesis</span>
        <h2 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)] uppercase">Structured Customs Documents Generated</h2>
        <p className="text-slate-400 font-mono text-sm mt-3 uppercase">AI Compliance Validated & Ready for e-Filing</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 h-[380px]">
        {/* Mock JSON Response Panel */}
        <div className="flex-1 bg-[#0d1117] rounded-2xl border border-slate-700/80 p-6 flex flex-col shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">synthetic_document_output.txt</span>
            <button onClick={() => setShowFullDoc(true)} className="flex items-center space-x-2 text-teal-500 bg-teal-500/10 hover:bg-teal-500/20 px-2 py-1 rounded text-xs transition-colors"><Maximize className="w-3 h-3" /><span>View Toggle</span></button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[10px] sm:text-xs text-teal-300 whitespace-pre-wrap leading-relaxed relative z-10">
            {taskData?.generated_form || "Awaiting Terminal Protocol...\n\n(Hint: You must upload a FRESH document for the new AI agent to generate the form. Old jobs do not have this logic retroactively applied!)"}
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 bg-slate-900/80 rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full blur-2xl pointer-events-none"></div>
            <FileText className="w-16 h-16 text-teal-400 mb-4 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            <h3 className="text-xl font-bold text-slate-200">Customs Form Document</h3>
            <p className="text-slate-400 text-xs font-mono mt-2 lowercase">Ready for Signature Authorization</p>
            <div className="mt-6 flex gap-2">
                <button onClick={() => setShowFullDoc(true)} className="flex items-center space-x-2 bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 rounded-lg font-mono text-xs tracking-widest hover:bg-slate-700 transition-colors shadow-lg hover:scale-105">
                  <Maximize className="w-4 h-4" />
                  <span>Toggle View</span>
                </button>
                <button onClick={handleDownload} className="flex items-center space-x-2 bg-teal-500/20 text-teal-400 border border-teal-500/50 px-4 py-2 rounded-lg font-mono text-xs tracking-widest hover:bg-teal-500 hover:text-slate-950 transition-colors shadow-lg hover:scale-105">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
            </div>
          </div>
          
          <button className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-teal-500 text-slate-300 p-4 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-colors shadow-lg">
            <ScanLine className="w-4 h-4 text-teal-500" />
            <span>Transmit payload to Port Authority API</span>
          </button>
        </div>
      </div>
      
      {/* Full Document Modal overlay */}
      <AnimatePresence>
        {showFullDoc && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowFullDoc(false)}/>
               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="z-10 w-full max-w-4xl h-[85vh] bg-[#0d1117] border border-teal-900/60 shadow-[0_0_50px_rgba(45,212,191,0.15)] rounded-2xl flex flex-col overflow-hidden">
                    <div className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
                        <div className="flex items-center space-x-3 text-teal-400 font-mono text-sm tracking-widest"><FileText className="w-4 h-4" /><span>GENERATED_ADDENDUM.TXT</span></div>
                        <button onClick={() => setShowFullDoc(false)} className="text-slate-500 hover:text-white transition-colors bg-slate-800 rounded p-1"><FileX className="w-5 h-5"/></button>
                    </div>
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
                        <div className="absolute inset-0 bg-[#0d1117]/95"></div>
                        <div className="relative z-10 max-w-3xl mx-auto bg-slate-900/40 p-8 rounded border border-slate-800 text-slate-300 font-mono text-sm leading-[1.8] whitespace-pre-wrap shadow-2xl">
                            {taskData?.generated_form || "No document loaded. Run pipeline."}
                        </div>
                    </div>
                    <div className="h-16 border-t border-slate-800 bg-slate-900 flex items-center justify-end px-6 space-x-4">
                        <button onClick={() => setShowFullDoc(false)} className="text-slate-400 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors px-4 py-2">Close Fullscreen</button>
                        <button onClick={handleDownload} className="bg-teal-500/20 border border-teal-500/50 text-teal-400 hover:bg-teal-500 hover:text-slate-950 px-6 py-2 rounded-lg font-mono text-xs tracking-widest uppercase transition-all shadow-lg flex items-center space-x-2"><Download className="w-4 h-4"/><span>Save to Disk</span></button>
                    </div>
               </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};
// Full Page History View
const HistoryView = ({ user }) => {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:8000/api/v1/history/${user.user_id}`)
      .then(res => res.json())
      .then(data => { setLogs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  return (
  <div className="h-full w-full p-8 flex flex-col">
    <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-800">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20"><Layers className="w-6 h-6 text-teal-400" /></div>
          <h2 className="text-2xl font-bold tracking-widest uppercase text-slate-200">Terminal Log Registry</h2>
        </div>
        <div className="text-teal-400 font-mono text-xs border border-teal-500/30 px-3 py-1 rounded bg-teal-900/20">AGENT: {user.operator_id}</div>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
      {loading ? (
        <div className="text-slate-500 font-mono text-sm animate-pulse flex items-center justify-center p-10 uppercase tracking-widest">Synchronizing records...</div>
      ) : logs.length === 0 ? (
        <div className="text-slate-500 font-mono text-sm uppercase tracking-widest text-center mt-10">No historical log data found for this operator.</div>
      ) : logs.map((log, i) => (
        <div key={i} className={`flex flex-col p-5 rounded-2xl border transition-colors ${
          log.type === 'warning' ? 'bg-orange-950/10 border-orange-900/30 hover:border-orange-500/50' : 
          log.type === 'success' ? 'bg-teal-950/10 border-teal-900/30 hover:border-teal-500/50' : 
          'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80'
        }`}>
          <span className={`font-mono text-[10px] sm:text-xs mb-2 uppercase tracking-widest flex items-center ${
            log.type === 'warning' ? 'text-orange-500' : log.type === 'success' ? 'text-teal-400' : 'text-slate-500'
          }`}>
            <span className={`w-2 h-2 rounded-full mr-3 ${log.type === 'warning' ? 'bg-orange-500' : log.type === 'success' ? 'bg-teal-400' : 'bg-slate-600'}`}></span>
            {log.time} - {log.tag}
          </span>
          <span className="text-slate-300 text-sm font-mono tracking-wide">{log.msg}</span>
        </div>
      ))}
    </div>
  </div>
  );
};
