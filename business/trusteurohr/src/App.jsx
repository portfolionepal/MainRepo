import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-blue-200">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center space-y-8 p-10 md:p-16 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-2xl">
        <div className="space-y-4">
          <p className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs md:text-sm animate-fade-in-up">
            Welcome To
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight drop-shadow-sm animate-fade-in-up animation-delay-150">
            TRUSTEURO<span className="text-blue-600">HR</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-700 animate-fade-in-up animation-delay-300">
            CONSULTANCY NEPAL KTM
          </h2>
        </div>

        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-fade-in-up animation-delay-450"></div>

        <p className="text-lg md:text-2xl text-slate-600 max-w-2xl font-medium leading-relaxed animate-fade-in-up animation-delay-600">
          Your Trusted Partner for <span className="text-blue-700 font-bold">Foreign Education & Visa Consultancy</span>
        </p>
        
        <div className="pt-8 animate-fade-in-up animation-delay-750">
          <div className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 cursor-default">
            Website Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;