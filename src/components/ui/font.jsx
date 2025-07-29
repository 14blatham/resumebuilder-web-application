import React from 'react';
import { motion } from 'framer-motion';
import { Type, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

const fontOptions = [
  { name: 'Arial', value: 'Arial, sans-serif', category: 'Sans-serif' },
  { name: 'Calibri', value: 'Calibri, sans-serif', category: 'Sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif', category: 'Sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif', category: 'Serif' },
  { name: 'Cambria', value: 'Cambria, Georgia, serif', category: 'Serif' },
  { name: 'Georgia', value: 'Georgia, serif', category: 'Serif' }
];

const fontSizeOptions = [
  { name: 'Small', value: 'small', size: '0.875rem' },
  { name: 'Medium', value: 'medium', size: '1rem' },
  { name: 'Large', value: 'large', size: '1.125rem' },
  { name: 'Extra Large', value: 'xl', size: '1.25rem' }
];

const FontSelector = ({ resumeData, updateNestedData }) => {
  const currentFont = resumeData.settings?.fontFamily || 'Arial, sans-serif';
  const currentSize = resumeData.settings?.fontSize || 'medium';

  const handleFontChange = (fontValue) => {
    updateNestedData('settings', 'fontFamily', fontValue);
  };

  const handleSizeChange = (sizeValue) => {
    updateNestedData('settings', 'fontSize', sizeValue);
  };

  const getFontDisplayName = (fontValue) => {
    const font = fontOptions.find(f => f.value === fontValue);
    return font ? font.name : 'Arial';
  };

  const getSizeDisplayName = (sizeValue) => {
    const size = fontSizeOptions.find(s => s.value === sizeValue);
    return size ? size.name : 'Medium';
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Type className="w-5 h-5" />
          <span>Font Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Family Selection */}
        <div>
          <h4 className="text-white font-medium mb-3">Font Family</h4>
          <div className="grid grid-cols-2 gap-2">
            {fontOptions.map((font) => (
              <motion.button
                key={font.value}
                onClick={() => handleFontChange(font.value)}
                className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                  currentFont === font.value
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div 
                      className="font-medium mb-1"
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </div>
                    <div className="text-xs opacity-70">{font.category}</div>
                  </div>
                  {currentFont === font.value && (
                    <Check className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Font Size Selection */}
        <div>
          <h4 className="text-white font-medium mb-3">Font Size</h4>
          <div className="grid grid-cols-2 gap-2">
            {fontSizeOptions.map((size) => (
              <motion.button
                key={size.value}
                onClick={() => handleSizeChange(size.value)}
                className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                  currentSize === size.value
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span>{size.name}</span>
                  {currentSize === size.value && (
                    <Check className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>


      </CardContent>
    </Card>
  );
};

export default FontSelector; 