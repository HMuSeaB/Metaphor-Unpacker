import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Lightbulb, Map, AlertTriangle, RefreshCw, BookOpen } from 'lucide-react';
import { EXAMPLE_DATA } from '../constants';

interface ExampleWalkthroughProps {
  onClose: () => void;
}

const ExampleWalkthrough: React.FC<ExampleWalkthroughProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-bold text-lg text-blue-900">Step 1: Unpack the Metaphor</h3>
              <p className="text-blue-700">Identify the two main parts of the comparison.</p>
            </div>
            
            <div className="text-center text-2xl font-serif font-medium mb-8 text-gray-800">
              "{EXAMPLE_DATA.originalSentence}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Tenor (The Concept)</span>
                <div className="text-xl font-bold text-indigo-600 mt-2">{EXAMPLE_DATA.tenor}</div>
                <p className="text-sm text-gray-500 mt-1">The actual subject being discussed.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Vehicle (The Image)</span>
                <div className="text-xl font-bold text-pink-600 mt-2">{EXAMPLE_DATA.vehicle}</div>
                <p className="text-sm text-gray-500 mt-1">The imagery used to describe it.</p>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800 mt-4 flex items-center gap-2">
              <Lightbulb size={16} />
              <span>This initial step is crucial for clarity before diving deeper.</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
              <h3 className="font-bold text-lg text-indigo-900">Step 2: Literal Characteristics</h3>
              <p className="text-indigo-700">What does a literal <strong>Passport</strong> actually do?</p>
            </div>
            
            <ul className="space-y-3">
              {EXAMPLE_DATA.characteristics.map((c) => (
                <li key={c.id} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <span className="bg-pink-100 text-pink-600 p-1 rounded-full mt-0.5">
                    <BookOpen size={16} />
                  </span>
                  <span className="text-gray-700 font-medium">{c.literal}</span>
                </li>
              ))}
            </ul>
             <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800 mt-4 flex items-center gap-2">
              <Lightbulb size={16} />
              <span>Ensure everyone has a shared, concrete understanding of the "Vehicle".</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <h3 className="font-bold text-lg text-purple-900">Step 3: Map to the Tenor</h3>
              <p className="text-purple-700">If a degree is a passport, what is the equivalent?</p>
            </div>

            <div className="space-y-4">
              {EXAMPLE_DATA.characteristics.map((c) => (
                <div key={c.id} className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                     <p className="text-xs text-gray-500 mb-1">Passport Characteristic</p>
                     <p className="font-medium text-gray-800">{c.literal}</p>
                  </div>
                  <div className="bg-white p-4">
                     <p className="text-xs text-indigo-500 mb-1 font-bold">Degree Equivalent</p>
                     <p className="text-indigo-900">{c.mapped}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
         return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-lg text-orange-900">Step 4: Challenge the Metaphor</h3>
              <p className="text-orange-700">Where does this comparison break down? Where is it misleading?</p>
            </div>

            <div className="space-y-4">
               {EXAMPLE_DATA.challenges.map((challenge, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-red-400">
                  <AlertTriangle className="text-red-400 shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">{challenge}</p>
                </div>
               ))}
            </div>
             <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800 mt-4 flex items-center gap-2">
              <Lightbulb size={16} />
              <span>This moves you from acceptance to evaluation. You are now critiquing validity.</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <h3 className="font-bold text-lg text-green-900">Step 5: Generate Alternatives</h3>
              <p className="text-green-700">Create new metaphors that might be more accurate or helpful.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {EXAMPLE_DATA.alternatives.map((alt, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-green-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <RefreshCw size={24} />
                  </div>
                  <span className="font-medium text-lg text-gray-800">{alt}</span>
                </div>
               ))}
            </div>
             <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800 mt-4 flex items-center gap-2">
              <Lightbulb size={16} />
              <span>Constructing new frameworks is the ultimate goal of critical thinking here.</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold text-gray-900">Example: Degree as a Passport</h2>
            <p className="text-sm text-gray-500">Step {step} of 5</p>
         </div>
         <button onClick={onClose} className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Exit Example
         </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {renderStepContent()}
      </div>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
            <button 
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
                <ArrowLeft size={18} />
                Previous
            </button>

             <div className="flex gap-2">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-2 w-2 rounded-full transition-all ${i === step ? 'bg-indigo-600 w-6' : 'bg-gray-200'}`} />
                ))}
             </div>

             {step < 5 ? (
                <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
                Next
                <ArrowRight size={18} />
            </button>
             ) : (
                <button 
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
            >
                Finish
                <ArrowRight size={18} />
            </button>
             )}
            
        </div>
      </div>
    </div>
  );
};

export default ExampleWalkthrough;