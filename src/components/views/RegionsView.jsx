import React, { useState } from 'react';
import { Info } from 'lucide-react';
import RegionHistoryChart from '../charts/RegionHistoryChart';
import SwedenMap from '../charts/SwedenMap';

const RegionsView = ({ regionStats, agencies }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Current Distribution */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-serif text-2xl text-slate-900 mb-4 font-semibold">Geografisk fördelning</h3>
            <p className="text-slate-500 mb-8">
              Var i landet har myndigheterna sitt säte? Kartan visar koncentrationen av huvudkontor.
            </p>
            
            <div className="space-y-2">
              {regionStats.map(r => (
                <div
                  key={r.name}
                  onMouseEnter={() => setHoveredRegion(r.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-default group ${hoveredRegion === r.name ? 'bg-slate-100 scale-[1.01] shadow-sm' : 'bg-slate-50 hover:bg-slate-100'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: r.color }} />
                    <span className="font-medium text-sm text-slate-700 group-hover:text-slate-900">{r.name}</span>
                  </div>
                  <div className="text-right flex items-baseline gap-2">
                    <span className="font-bold text-base text-slate-900 old-style-nums tabular-nums">{r.value}</span>
                    <span className="text-slate-400 text-[11px] font-mono font-semibold">
                      ({Math.round((r.value / agencies.filter(a => !a.e).length) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-sky-50 rounded-xl flex gap-3 text-sm text-sky-800 border border-sky-100">
              <Info className="w-5 h-5 flex-shrink-0 text-sky-600" />
              <p>Trots utlokaliseringar är Stockholm fortfarande dominant med ca 45% av myndigheterna.</p>
            </div>
          </div>

          <div className="h-[500px] w-full bg-slate-50/50 rounded-3xl p-8 border border-slate-100 flex items-center justify-center">
            <SwedenMap stats={regionStats} hoveredRegion={hoveredRegion} />
          </div>
        </div>
      </div>

      {/* Historical Trend */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-serif text-xl text-slate-900 mb-6 font-semibold">Historisk utveckling (1978-2025)</h3>
        <RegionHistoryChart
          agencies={agencies}
          yearRange={[1978, 2025]}
        />
      </div>
    </div>
  );
};

export default RegionsView;
