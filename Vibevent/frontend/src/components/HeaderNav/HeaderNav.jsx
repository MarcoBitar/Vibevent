import React from 'react';
import './HeaderNav.css';

// HeaderNav renders a tabbed navigation bar for switching between views
export default function HeaderNav({ activeTab, onTabChange }) {
  const tabs = ['Events', 'Dashboard', 'Leaderboards']; // available tab labels

  return (
    <nav className="header-nav" role="tablist">
      {tabs.map(tab => (
        <button
          key={tab}
          role="tab" // accessibility: identifies as a tab
          aria-selected={activeTab === tab} // accessibility: marks active tab
          className={`nav-tab ${activeTab === tab ? 'active' : ''}`} // apply active styling
          onClick={() => onTabChange(tab)} // trigger tab change
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}