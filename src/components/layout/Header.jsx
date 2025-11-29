import React from 'react';
import { Search, Share, ChevronRight, Command } from 'lucide-react';

const Header = ({ 
  activeTabLabel, 
  searchQuery, 
  onSearchChange, 
  onShare 
}) => {
  return (
    <header className="h-16 bg-white/60 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0 w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-stone-500">
        <span className="hover:text-stone-800 cursor-pointer hidden sm:inline">Start</span>
        <ChevronRight className="w-4 h-4 mx-2 text-stone-300 hidden sm:block" />
        <span className="font-medium text-stone-800">{activeTabLabel}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Sök myndighet..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-40 sm:w-64 pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-800/10 focus:border-stone-300 transition-all shadow-sm placeholder-stone-400"
          />
          <div className="absolute right-2 top-2 hidden lg:block pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-stone-100 border border-stone-200 rounded text-stone-500 flex items-center gap-0.5">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>
        </div>

        {/* Share Button */}
        <button 
          onClick={onShare}
          className="p-2 text-stone-400 hover:text-stone-800 bg-white border border-stone-200 rounded-lg shadow-sm transition-colors"
          title="Dela vy"
        >
          <Share className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
