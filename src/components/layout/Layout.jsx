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
    <div className="flex h-screen overflow-hidden bg-stone-50/50 text-stone-800 font-sans">
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
        </main>
      </div>
    </div>
  );
};

export default Layout;
