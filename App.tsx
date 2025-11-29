import React, { useState } from 'react';
import { BookOpen, BrainCircuit, Search, ArrowRight } from 'lucide-react';
import ExampleWalkthrough from './components/ExampleWalkthrough';
import InteractiveAnalyzer from './components/InteractiveAnalyzer';
import { AppMode } from './types';

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);

  if (mode === AppMode.EXAMPLE) {
    return <ExampleWalkthrough onClose={() => setMode(AppMode.HOME)} />;
  }

  if (mode === AppMode.WIZARD) {
    return <InteractiveAnalyzer onBack={() => setMode(AppMode.HOME)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <main className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-6 text-indigo-600">
             <BrainCircuit size={48} />
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Metaphor <span className="text-indigo-600">Unpacker</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Metaphors shape how we think. Don't just accept them—unpack them.
            Learn the critical thinking framework to analyze, challenge, and reimagine the comparisons that define our world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* Example Card */}
          <button 
            onClick={() => setMode(AppMode.EXAMPLE)}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                 <BookOpen size={120} className="text-indigo-600 -mr-8 -mt-8 rotate-12" />
            </div>
            <div className="relative z-10">
                <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                    <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">See an Example</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">
                    Walk through the classic analysis: <br/>
                    <span className="italic font-medium text-slate-700">"A university degree is a passport."</span>
                </p>
                <div className="flex items-center text-indigo-600 font-semibold gap-2 group-hover:gap-3 transition-all">
                    Start Walkthrough <ArrowRight size={20} />
                </div>
            </div>
          </button>

          {/* Interactive Card */}
          <button 
            onClick={() => setMode(AppMode.WIZARD)}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-pink-300 transition-all duration-300 text-left overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                 <Search size={120} className="text-pink-600 -mr-8 -mt-8 -rotate-12" />
            </div>
            <div className="relative z-10">
                <div className="bg-pink-50 w-12 h-12 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                    <Search size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors">Analyze Your Own</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">
                    Have a metaphor in mind? Use our interactive wizard with AI assistance to break it down step-by-step.
                </p>
                <div className="flex items-center text-pink-600 font-semibold gap-2 group-hover:gap-3 transition-all">
                    Start Analysis <ArrowRight size={20} />
                </div>
            </div>
          </button>

        </div>

        <footer className="mt-20 text-slate-400 text-sm">
            Based on "Critical Thinking: Unpack the Metaphor" educational framework.
        </footer>

      </main>
    </div>
  );
}

export default App;