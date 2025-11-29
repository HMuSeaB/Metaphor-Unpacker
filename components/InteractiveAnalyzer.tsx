import React, { useState, useCallback } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle, RotateCcw } from 'lucide-react';
import { 
  analyzeStructure, 
  suggestCharacteristics, 
  suggestMapping, 
  suggestChallenges,
  suggestAlternatives
} from '../services/geminiService';
import { Characteristic, MetaphorData, Step } from '../types';
import { STEPS_INFO } from '../constants';

interface InteractiveAnalyzerProps {
  onBack: () => void;
}

const InteractiveAnalyzer: React.FC<InteractiveAnalyzerProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.IDENTIFY);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MetaphorData>({
    originalSentence: "",
    tenor: "",
    vehicle: "",
    characteristics: [],
    challenges: [],
    alternatives: []
  });

  const updateData = (updates: Partial<MetaphorData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleIdentify = async () => {
    if (!data.originalSentence.trim()) return;
    setLoading(true);
    const result = await analyzeStructure(data.originalSentence);
    updateData({ tenor: result.tenor, vehicle: result.vehicle });
    setLoading(false);
  };

  const handleSuggestCharacteristics = async () => {
    if (!data.vehicle) return;
    setLoading(true);
    const suggestions = await suggestCharacteristics(data.vehicle);
    const newChars: Characteristic[] = suggestions.map((s: string) => ({
      id: Math.random().toString(36).substr(2, 9),
      literal: s,
      mapped: ""
    }));
    updateData({ characteristics: [...data.characteristics, ...newChars] });
    setLoading(false);
  };

  const handleSuggestMapping = async (charId: string, literal: string) => {
    setLoading(true);
    const mapped = await suggestMapping(literal, data.tenor, data.vehicle);
    updateData({
      characteristics: data.characteristics.map(c => 
        c.id === charId ? { ...c, mapped } : c
      )
    });
    setLoading(false);
  };

  const handleSuggestChallenges = async () => {
    setLoading(true);
    const suggestions = await suggestChallenges(data.tenor, data.vehicle);
    updateData({ challenges: [...data.challenges, ...suggestions] });
    setLoading(false);
  };

   const handleSuggestAlternatives = async () => {
    setLoading(true);
    const suggestions = await suggestAlternatives(data.tenor);
    updateData({ alternatives: [...data.alternatives, ...suggestions] });
    setLoading(false);
  };

  const addCharacteristic = () => {
    const newChar: Characteristic = {
      id: Math.random().toString(36).substr(2, 9),
      literal: "",
      mapped: ""
    };
    updateData({ characteristics: [...data.characteristics, newChar] });
  };

  const removeCharacteristic = (id: string) => {
    updateData({ characteristics: data.characteristics.filter(c => c.id !== id) });
  };

  const updateCharacteristic = (id: string, field: 'literal' | 'mapped', value: string) => {
    updateData({
      characteristics: data.characteristics.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      )
    });
  };

  const goNext = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // --- Step Renders ---

  const renderIdentify = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Metaphor Sentence</label>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg"
          placeholder="e.g., Argument is war, Time is money..."
          rows={3}
          value={data.originalSentence}
          onChange={(e) => updateData({ originalSentence: e.target.value })}
        />
      </div>
      
      <div className="flex justify-end">
        <button
            onClick={handleIdentify}
            disabled={loading || !data.originalSentence}
            className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition disabled:opacity-50"
        >
            <Sparkles size={16} />
            Auto-Detect Tenor & Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">Tenor (Concept)</label>
           <input
             type="text"
             className="w-full p-3 border border-gray-300 rounded-lg"
             placeholder="e.g. Argument"
             value={data.tenor}
             onChange={(e) => updateData({ tenor: e.target.value })}
           />
        </div>
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle (Image)</label>
           <input
             type="text"
             className="w-full p-3 border border-gray-300 rounded-lg"
             placeholder="e.g. War"
             value={data.vehicle}
             onChange={(e) => updateData({ vehicle: e.target.value })}
           />
        </div>
      </div>
    </div>
  );

  const renderCharacteristics = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-4">
        What are the literal functions or qualities of a <strong>{data.vehicle || "Vehicle"}</strong>?
      </div>

      {data.characteristics.map((char, index) => (
        <div key={char.id} className="flex gap-2 items-center">
            <span className="text-gray-400 font-mono text-sm w-6">{index + 1}.</span>
            <input 
                type="text"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder={`Characteristic of ${data.vehicle}...`}
                value={char.literal}
                onChange={(e) => updateCharacteristic(char.id, 'literal', e.target.value)}
            />
            <button onClick={() => removeCharacteristic(char.id)} className="text-gray-400 hover:text-red-500 p-2">
                <Trash2 size={18} />
            </button>
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button onClick={addCharacteristic} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
            <Plus size={16} /> Add Row
        </button>
        <button 
            onClick={handleSuggestCharacteristics}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
        >
            <Sparkles size={16} /> {loading ? 'Thinking...' : 'AI Suggest'}
        </button>
      </div>
    </div>
  );

  const renderMapping = () => (
    <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg text-purple-800 text-sm mb-4">
            How do these qualities map onto <strong>{data.tenor || "the Concept"}</strong>?
        </div>
        {data.characteristics.map((char) => (
            <div key={char.id} className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
                <div className="mb-3 pb-3 border-b border-gray-100">
                    <span className="text-xs uppercase text-gray-400 font-bold">Vehicle Characteristic</span>
                    <p className="font-medium text-gray-800">{char.literal || "(Empty)"}</p>
                </div>
                <div className="flex gap-2">
                     <div className="flex-1">
                        <label className="text-xs uppercase text-indigo-500 font-bold mb-1 block">Mapped Meaning</label>
                        <input 
                            type="text"
                            className="w-full p-2 border border-indigo-100 bg-indigo-50/30 rounded focus:bg-white focus:border-indigo-400 transition"
                            placeholder="What does this mean for the concept?"
                            value={char.mapped}
                            onChange={(e) => updateCharacteristic(char.id, 'mapped', e.target.value)}
                        />
                     </div>
                     <button 
                        onClick={() => handleSuggestMapping(char.id, char.literal)}
                        disabled={loading || !char.literal}
                        className="mt-6 p-2 text-indigo-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 h-10 w-10 flex items-center justify-center"
                        title="Auto-map this item"
                     >
                        <Sparkles size={18} />
                     </button>
                </div>
            </div>
        ))}
    </div>
  );

  const renderChallenge = () => (
    <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg text-orange-800 text-sm mb-4">
            Where does the metaphor <strong>"{data.tenor} is {data.vehicle}"</strong> break down?
        </div>
        
        {data.challenges.map((challenge, idx) => (
            <div key={idx} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                <div className="mt-1 text-red-400"><RotateCcw size={16} className="rotate-180"/></div>
                <input 
                    className="flex-1 bg-transparent outline-none text-gray-700"
                    value={challenge}
                    onChange={(e) => {
                        const newChallenges = [...data.challenges];
                        newChallenges[idx] = e.target.value;
                        updateData({ challenges: newChallenges });
                    }}
                />
                 <button onClick={() => {
                     const newChallenges = data.challenges.filter((_, i) => i !== idx);
                     updateData({ challenges: newChallenges });
                 }} className="text-gray-300 hover:text-red-500">
                    <Trash2 size={16} />
                 </button>
            </div>
        ))}

        <div className="flex gap-3 mt-4">
             <button 
                onClick={() => updateData({ challenges: [...data.challenges, ""] })} 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
                <Plus size={16} /> Add Point
            </button>
            <button 
                onClick={handleSuggestChallenges}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100"
            >
                <Sparkles size={16} /> {loading ? 'Critiquing...' : 'Find Weaknesses'}
            </button>
        </div>
    </div>
  );

  const renderAlternatives = () => (
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg text-green-800 text-sm mb-4">
            What are better metaphors for <strong>{data.tenor}</strong>?
        </div>

        {data.alternatives.map((alt, idx) => (
             <div key={idx} className="flex gap-2 items-center bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                 <div className="text-green-500"><CheckCircle size={16} /></div>
                 <input 
                    className="flex-1 bg-transparent outline-none text-gray-700 font-medium"
                    value={alt}
                    onChange={(e) => {
                        const newAlts = [...data.alternatives];
                        newAlts[idx] = e.target.value;
                        updateData({ alternatives: newAlts });
                    }}
                />
                <button onClick={() => {
                     const newAlts = data.alternatives.filter((_, i) => i !== idx);
                     updateData({ alternatives: newAlts });
                 }} className="text-gray-300 hover:text-red-500">
                    <Trash2 size={16} />
                 </button>
             </div>
        ))}

        <div className="flex gap-3 mt-4">
             <button 
                onClick={() => updateData({ alternatives: [...data.alternatives, ""] })} 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
                <Plus size={16} /> Add Idea
            </button>
            <button 
                onClick={handleSuggestAlternatives}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
            >
                <Sparkles size={16} /> {loading ? 'Brainstorming...' : 'Suggest Alternatives'}
            </button>
        </div>
      </div>
  );

  const renderSummary = () => (
    <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{data.tenor}</h2>
            <p className="text-gray-500">analyzed through the lens of</p>
            <h2 className="text-2xl font-bold text-indigo-600">{data.vehicle}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 font-medium text-gray-700">Mapping</div>
            <div className="divide-y divide-gray-100">
                {data.characteristics.map(c => (
                    <div key={c.id} className="px-6 py-4 grid grid-cols-2 gap-4">
                        <div className="text-sm text-gray-600">{c.literal}</div>
                        <div className="text-sm text-indigo-700 font-medium">{c.mapped}</div>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <RotateCcw className="rotate-180" size={18} /> Limitations
                </h4>
                <ul className="list-disc list-outside ml-4 space-y-2 text-red-900 text-sm">
                    {data.challenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>
             <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Sparkles size={18} /> Better Alternatives
                </h4>
                <ul className="space-y-2 text-green-900 text-sm">
                    {data.alternatives.map((c, i) => <li key={i} className="flex gap-2"><CheckCircle size={16} className="shrink-0 mt-0.5 text-green-600"/>{c}</li>)}
                </ul>
            </div>
        </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-4 flex items-center justify-between">
         <button onClick={onBack} className="text-gray-500 hover:text-gray-900 flex items-center gap-1">
             <ArrowLeft size={16} /> Exit
         </button>
         <div className="text-center">
             <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Step {currentStep}</div>
             <div className="font-bold text-gray-900">{STEPS_INFO[currentStep].title}</div>
         </div>
         <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <p className="text-gray-500 mb-8 text-center max-w-lg mx-auto">{STEPS_INFO[currentStep].description}</p>
        
        {currentStep === Step.IDENTIFY && renderIdentify()}
        {currentStep === Step.CHARACTERISTICS && renderCharacteristics()}
        {currentStep === Step.MAPPING && renderMapping()}
        {currentStep === Step.CHALLENGE && renderChallenge()}
        {currentStep === Step.ALTERNATIVES && renderAlternatives()}
        {currentStep === Step.SUMMARY && renderSummary()}

      </div>

      {/* Nav Footer */}
      <div className="bg-white border-t border-gray-200 p-6 sticky bottom-0">
          <div className="max-w-3xl mx-auto flex justify-between">
            <button 
                onClick={goBack} 
                disabled={currentStep === 1}
                className="px-6 py-2 rounded-lg text-gray-600 font-medium disabled:opacity-30 hover:bg-gray-100 transition"
            >
                Back
            </button>
            
            {currentStep < 6 ? (
                <button 
                    onClick={goNext}
                    disabled={!data.tenor && currentStep === 1} // Basic validation
                    className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
                >
                    Next Step
                </button>
            ) : (
                 <button 
                    onClick={onBack}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition shadow-lg shadow-green-200"
                >
                    Finish Analysis
                </button>
            )}
          </div>
      </div>
    </div>
  );
};

export default InteractiveAnalyzer;