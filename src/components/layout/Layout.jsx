import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ 
  children, 
  activeTab, 
  onTabChange, 
  showIntro, 
  onToggleIntro,
  isDark,
  onToggleDark,
  searchQuery,
  onSearchChange
}) => {
  // Map ID to label
  const tabs = {
    overview: 'Översikt',
    departments: 'Departement',
    regions: 'Regioner',
    list: 'Register',
    compare: 'Jämförelse'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={onTabChange}
        showIntro={showIntro}
        onToggleIntro={onToggleIntro}
        isDark={isDark}
        onToggleDark={onToggleDark}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          activeTabLabel={tabs[activeTab]} 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange}
          onShare={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Länk kopierad till urklipp!');
          }}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth relative">
          <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {children}
          </div>

          {/* Footer */}
          <footer className="max-w-7xl mx-auto pt-10 pb-6 border-t border-slate-200 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Svenska Myndigheter. Ett analysverktyg av Isak Skogstad.</p>
            <div className="flex gap-4">
              <a href="https://github.com/civictechsweden/myndighetsdata" target="_blank" rel="noreferrer" className="hover:text-slate-600">Källa: Civic Tech Sweden</a>
              <a href="https://www.esv.se/" target="_blank" rel="noreferrer" className="hover:text-slate-600">Källa: ESV</a>
              <a href="https://www.scb.se/" target="_blank" rel="noreferrer" className="hover:text-slate-600">Källa: SCB</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;