import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  Table2, 
  ArrowLeftRight,
  Info,
  Moon,
  Github
} from 'lucide-react';

const NavItem = ({ id, label, icon: Icon, active, onClick }) => (
  <a 
    href="#" 
    onClick={(e) => { e.preventDefault(); onClick(id); }}
    className={`flex items-center px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group mb-1
      ${active 
        ? 'bg-white text-stone-900 shadow-card ring-1 ring-stone-900/5' 
        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
      }`}
  >
    <Icon className={`w-5 h-5 mr-3 transition-opacity ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
    <span className="hidden lg:block">{label}</span>
  </a>
);

const Sidebar = ({ activeTab, onTabChange, showIntro, onToggleIntro, isDark, onToggleDark }) => {
  const navItems = [
    { id: 'overview', label: 'Översikt', icon: LayoutDashboard },
    { id: 'departments', label: 'Departement', icon: Building2 },
    { id: 'regions', label: 'Regioner', icon: MapPin },
    { id: 'list', label: 'Register', icon: Table2 },
    { id: 'compare', label: 'Jämförelse', icon: ArrowLeftRight },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-stone-50/80 border-r border-stone-200 flex flex-col justify-between z-20 backdrop-blur-xl transition-all duration-300 fixed h-full lg:relative">
      <div>
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-stone-100">
          <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center text-stone-50 font-serif font-bold text-xl shadow-lg shrink-0">
            <span className="relative -top-0.5">S</span>
          </div>
          <div className="ml-3 hidden lg:block overflow-hidden">
            <h1 className="font-serif font-semibold text-lg text-stone-900 tracking-tight whitespace-nowrap">Myndigheter</h1>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium whitespace-nowrap">Statistik 1978-2025</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navItems.map(item => (
            <NavItem 
              key={item.id}
              {...item}
              active={activeTab === item.id}
              onClick={onTabChange}
            />
          ))}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-stone-200 hidden lg:block">
        <button 
          onClick={onToggleIntro}
          className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors text-xs font-medium mb-4
            ${showIntro ? 'bg-stone-100 text-stone-800' : 'text-stone-500 hover:bg-stone-100'}
          `}
        >
          <span>Om tjänsten</span>
          <Info className="w-4 h-4" />
        </button>
        
        <div className="flex justify-between items-center px-2">
          <span className="text-[10px] text-stone-400">v2.5.0</span>
          <div className="flex gap-2">
            <button 
              onClick={onToggleDark}
              className="text-stone-400 hover:text-stone-800 transition-colors"
              title="Växla tema"
            >
              <Moon className="w-4 h-4" />
            </button>
            <a 
              href="https://github.com/isakskogstad/myndigheter" 
              target="_blank" 
              rel="noreferrer"
              className="text-stone-400 hover:text-stone-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
