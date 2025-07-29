import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ 
  tabs = [], 
  activeTab, 
  onTabChange,
  className = '' 
}) => {
  return (
    <div className={`glass-effect rounded-xl p-2 ${className}`}>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id ? 'tab-active' : 'tab-inactive'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const TabContent = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`glass-effect rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { Tabs, TabContent }; 