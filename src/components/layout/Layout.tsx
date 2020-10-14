import React from 'react';
import LayoutMain from './Layout.Main';

interface LayoutComposition {
  Main: React.FC;
}

const Layout: React.FC & LayoutComposition = ({ children }) => (
  <div className="bg-gray-800 text-gray-200 flex flex-col min-h-screen relative">
    {children}
  </div>
);

Layout.Main = LayoutMain;

export default Layout;
