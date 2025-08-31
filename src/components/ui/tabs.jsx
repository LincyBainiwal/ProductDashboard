import React, { createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ value, onValueChange, children, className }) {
  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`px-4 py-2 font-medium transition-colors
        ${isActive ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 hover:text-gray-800"}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div className={className}>{children}</div> : null;
}
