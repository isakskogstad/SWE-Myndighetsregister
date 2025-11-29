import React from 'react';
import { X, Users, Building, Calendar, ExternalLink } from 'lucide-react';

const CompareView = ({ compareList, removeFromCompare, onAddMore }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      <div className="text-center py-10" style={{ display: compareList.length === 0 ? 'block' : 'none' }}>
        <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="text-2xl font-serif font-bold mb-3 text-stone-900">Jämför myndigheter</h2>
        <p className="text-stone-500 max-w-md mx-auto mb-8">
          Välj upp till 3 myndigheter från registret för att jämföra dem sida-vid-sida gällande personal, budget och struktur.
        </p>
        <button 
          onClick={onAddMore} 
          className="px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors font-medium shadow-lg shadow-stone-200"
        >
          Gå till registret
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ display: compareList.length > 0 ? 'grid' : 'none' }}>
        {compareList.map(agency => (
          <div key={agency.n} className="bg-white rounded-3xl shadow-float border border-stone-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <button 
              onClick={() => removeFromCompare(agency)}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-8 border-b border-stone-50 bg-stone-50/30">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center font-serif font-bold text-2xl text-stone-800 mb-6">
                {agency.n.charAt(0)}
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-2 leading-tight min-h-[3.5rem]">{agency.n}</h3>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium border border-stone-200">
                {agency.d}
              </span>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Personalstyrka
                </p>
                <p className="text-3xl font-mono text-stone-800 old-style-nums font-medium">
                  {agency.emp?.toLocaleString('sv-SE') || '–'}
                </p>
                {agency.fte && (
                  <p className="text-sm text-stone-500 mt-1">
                    {agency.fte.toLocaleString('sv-SE')} årsarbetskrafter
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Building className="w-3 h-3" /> Organisation
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="text-stone-500">Ledningsform</span>
                    <span className="font-medium text-stone-800">{agency.str || '–'}</span>
                  </li>
                  <li className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="text-stone-500">Säte</span>
                    <span className="font-medium text-stone-800">{agency.city || '–'}</span>
                  </li>
                  <li className="flex justify-between border-b border-stone-50 pb-2">
                    <span className="text-stone-500">Grundad</span>
                    <span className="font-medium text-stone-800">{agency.s?.split('-')[0] || '–'}</span>
                  </li>
                </ul>
              </div>

              {agency.web && (
                <a 
                  href={agency.web} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors text-sm font-medium group-hover:border-sage-200 group-hover:text-sage-700"
                >
                  Besök webbplats <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              )}
            </div>
          </div>
        ))}
        
        {compareList.length < 3 && (
          <div 
            onClick={onAddMore}
            className="border-2 border-dashed border-stone-200 rounded-3xl flex flex-col items-center justify-center p-12 text-stone-400 hover:border-sage-300 hover:text-sage-600 hover:bg-stone-50/50 cursor-pointer transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-4xl font-light text-stone-300 group-hover:text-sage-400">+</span>
            </div>
            <span className="text-sm font-medium uppercase tracking-wider">Lägg till för jämförelse</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareView;
