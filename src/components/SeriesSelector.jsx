import React from 'react';
import { Check } from 'lucide-react';

const SeriesSelector = ({
  activeSeries,
  setActiveSeries,
  normalizeData,
  setNormalizeData,
  baseYear = 1978
}) => {
  // Updated colors to match "Stone/Sage" theme
  const seriesOptions = [
    { id: 'agencies', label: 'Antal Myndigheter', color: '#57534e', dataKey: 'count' }, // Stone-600
    { id: 'employees', label: 'Antal Anställda', color: '#84a59d', dataKey: 'emp' },     // Sage-400
    { id: 'population', label: 'Befolkning', color: '#a8a29e', dataKey: 'population' },  // Stone-400
    { id: 'gdp', label: 'BNP', color: '#d97706', dataKey: 'gdp' },                       // Amber-600
    { id: 'women', label: 'Kvinnor', color: '#be185d', dataKey: 'w' },                   // Pink-700
    { id: 'men', label: 'Män', color: '#4f46e5', dataKey: 'm' },                         // Indigo-600
  ];

  const toggleSeries = (id) => {
    setActiveSeries(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeCount = Object.values(activeSeries).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {seriesOptions.map(series => {
          const isActive = activeSeries[series.id];
          return (
            <button
              key={series.id}
              onClick={() => toggleSeries(series.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 border
                ${isActive 
                  ? 'bg-stone-800 text-white border-stone-800 shadow-md' 
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-white' : ''}`}
                style={{ backgroundColor: isActive ? undefined : series.color }}
              />
              {series.label}
              {isActive && <Check className="w-3 h-3 ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Normalize Toggle */}
      {activeCount >= 2 && (
        <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Läge:</span>
          <button
            onClick={() => setNormalizeData(false)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors
              ${!normalizeData ? 'bg-stone-100 text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Absoluta tal
          </button>
          <button
            onClick={() => setNormalizeData(true)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors
              ${normalizeData ? 'bg-sage-100 text-sage-800' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Index ({baseYear}=100)
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to normalize data (unchanged logic, just exports)
export const normalizeSeriesData = (data, activeSeries, baseYear = 1978) => {
  const baseValues = {};
  const baseYearData = data.find(d => d.year === baseYear) || data[0];

  if (!baseYearData) return data;

  const seriesKeys = ['count', 'emp', 'population', 'gdp', 'w', 'm'];
  seriesKeys.forEach(key => {
    if (baseYearData[key]) {
      baseValues[key] = baseYearData[key];
    }
  });

  return data.map(d => {
    const normalized = { year: d.year };
    seriesKeys.forEach(key => {
      if (d[key] && baseValues[key]) {
        normalized[key] = (d[key] / baseValues[key]) * 100;
      }
    });
    return normalized;
  });
};

export default SeriesSelector;