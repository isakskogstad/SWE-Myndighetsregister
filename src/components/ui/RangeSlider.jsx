import React, { useState, useEffect, useRef, useCallback } from 'react';

const RangeSlider = ({ min, max, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const trackRef = useRef(null);
  const draggingRef = useRef(null); // 'start' or 'end'

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercent = useCallback((val) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPosition = useCallback((clientX) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + percent * (max - min));
  }, [min, max]);

  const handleMouseDown = (e, handle) => {
    e.preventDefault();
    draggingRef.current = handle;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const newValue = getValueFromPosition(e.clientX);
    
    setLocalValue(prev => {
      const [start, end] = prev;
      if (draggingRef.current === 'start') {
        const clamped = Math.min(newValue, end - 1);
        return [Math.max(min, clamped), end];
      } else {
        const clamped = Math.max(newValue, start + 1);
        return [start, Math.min(max, clamped)];
      }
    });
  }, [min, max, getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    if (draggingRef.current) {
      onChange(localValue);
      draggingRef.current = null;
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [localValue, onChange, handleMouseMove]);

  // Derived positions
  const leftPercent = getPercent(localValue[0]);
  const rightPercent = getPercent(localValue[1]);

  return (
    <div className="w-full select-none px-2">
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Tidsintervall</label>
        <span className="font-mono text-sm font-medium text-stone-800 bg-stone-100 px-2 py-1 rounded">
          {localValue[0]} – {localValue[1]}
        </span>
      </div>
      
      <div className="relative h-8 pt-3">
        {/* Track Background */}
        <div 
          ref={trackRef}
          className="absolute w-full h-1 bg-stone-200 rounded-full top-4 cursor-pointer"
        />
        
        {/* Active Range */}
        <div 
          className="absolute h-1 bg-stone-600 rounded-full top-4 pointer-events-none"
          style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
        />
        
        {/* Start Handle */}
        <div
          className="absolute top-4 w-4 h-4 bg-white border-2 border-stone-600 rounded-full shadow-sm cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1.5 hover:scale-110 transition-transform z-10"
          style={{ left: `${leftPercent}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'start')}
          role="slider"
          aria-label="Startår"
          aria-valuenow={localValue[0]}
        />
        
        {/* End Handle */}
        <div
          className="absolute top-4 w-4 h-4 bg-white border-2 border-stone-600 rounded-full shadow-sm cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1.5 hover:scale-110 transition-transform z-10"
          style={{ left: `${rightPercent}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'end')}
          role="slider"
          aria-label="Slutår"
          aria-valuenow={localValue[1]}
        />
      </div>

      {/* Ticks */}
      <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1 px-1">
        <span>| {min}</span>
        <span>| 1990</span>
        <span>| 2000</span>
        <span>| 2010</span>
        <span>| {max}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
