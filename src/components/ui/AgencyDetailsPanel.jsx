import React from 'react';
import { X, Globe, MapPin, Phone, Building2, Calendar, Users, BookOpen, ExternalLink } from 'lucide-react';
import { cofogNames, agencyHistory } from '../../data/constants';

const AgencyDetailsPanel = ({ agency, onClose }) => {
  if (!agency) return null;

  const history = agencyHistory[agency.n];

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto border-l border-slate-100">
      
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 font-serif font-bold text-xl">
              {agency.n.charAt(0)}
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 leading-tight">{agency.n}</h2>
              {agency.sh && <span className="text-sm text-slate-500 font-mono">{agency.sh}</span>}
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agency.e ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {agency.e ? 'Nedlagd' : 'Aktiv'}
          </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">
              <Users className="w-3 h-3" /> Personal
            </div>
            <div className="text-2xl font-serif font-medium text-slate-900 old-style-nums">
              {agency.emp ? agency.emp.toLocaleString('sv-SE') : '–'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {agency.fte ? `${agency.fte.toLocaleString('sv-SE')} årsarbetskrafter` : 'Ingen uppgift'}
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">
              <Calendar className="w-3 h-3" /> Bildad
            </div>
            <div className="text-2xl font-serif font-medium text-slate-900 old-style-nums">
              {agency.s ? agency.s.split('-')[0] : '–'}
            </div>
            {agency.e && (
              <div className="text-xs text-red-500 mt-1">
                Nedlagd {agency.e.split('-')[0]}
              </div>
            )}
          </div>
        </div>

        {/* Organization Info */}
        <div>
          <h3 className="font-serif text-lg text-slate-900 mb-4 border-b border-slate-100 pb-2">Organisation</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Departement</dt>
              <dd className="font-medium text-slate-900">{agency.d}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Org.nummer</dt>
              <dd className="font-mono text-slate-900">{agency.org || '–'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Ledningsform</dt>
              <dd className="text-slate-900">{agency.str || '–'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">COFOG</dt>
              <dd className="text-slate-900 text-right max-w-[200px]">{cofogNames[agency.cof] || agency.cof || '–'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Instruktion (SFS)</dt>
              <dd className="font-mono text-slate-900">{agency.sfs || '–'}</dd>
            </div>
          </dl>
        </div>

        {/* Contact */}
        {(agency.city || agency.web || agency.tel) && (
          <div>
            <h3 className="font-serif text-lg text-slate-900 mb-4 border-b border-slate-100 pb-2">Kontakt</h3>
            <div className="space-y-3 text-sm">
              {agency.city && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span className="text-slate-700">{agency.addr ? `${agency.addr}, ${agency.city}` : agency.city}</span>
                </div>
              )}
              {agency.web && (
                <a 
                  href={agency.web.startsWith('http') ? agency.web : `https://${agency.web}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-600 hover:underline"
                >
                  <Globe className="w-4 h-4" /> {agency.web}
                </a>
              )}
              {agency.tel && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" /> {agency.tel}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {agency.wiki && (
            <a 
              href={agency.wiki} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Wikipedia
            </a>
          )}
          <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(agency.n + ' regleringsbrev')}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Regleringsbrev
          </a>
        </div>

        {/* History Events */}
        {history && history.length > 0 && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <h4 className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Historik
            </h4>
            <ul className="space-y-3">
              {history.map((h, i) => (
                <li key={i} className="text-sm text-amber-900">
                  <span className="font-mono font-bold text-amber-700 mr-2">{h.year}</span>
                  {h.event}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgencyDetailsPanel;
