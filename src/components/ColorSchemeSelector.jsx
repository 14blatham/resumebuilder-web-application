import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Pipette, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const presetSchemes = [
  {
    id: 'professional',
    name: 'Professional',
    colors: {
      primary: '#3B82F6',
      secondary: '#1F2937',
      accent: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    description: 'Classic blue and gray for corporate environments'
  },
  {
    id: 'modern',
    name: 'Modern',
    colors: {
      primary: '#8B5CF6',
      secondary: '#374151',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#111827'
    },
    description: 'Purple and amber for creative industries'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#6B7280',
      accent: '#000000',
      background: '#FFFFFF',
      text: '#000000'
    },
    description: 'Black and white for clean, minimal look'
  },
  {
    id: 'warm',
    name: 'Warm',
    colors: {
      primary: '#DC2626',
      secondary: '#7C2D12',
      accent: '#EA580C',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    description: 'Warm reds and oranges for energetic feel'
  },
  {
    id: 'cool',
    name: 'Cool',
    colors: {
      primary: '#0891B2',
      secondary: '#0F766E',
      accent: '#06B6D4',
      background: '#FFFFFF',
      text: '#0F172A'
    },
    description: 'Cool blues and teals for tech and science'
  },
  {
    id: 'nature',
    name: 'Nature',
    colors: {
      primary: '#059669',
      secondary: '#166534',
      accent: '#65A30D',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    description: 'Green tones for environmental and health sectors'
  }
];

const ColorSchemeSelector = ({ data, onUpdate }) => {
  const [selectedScheme, setSelectedScheme] = useState('professional');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const currentColors = data || presetSchemes[0].colors;

  const handleSchemeSelect = (scheme) => {
    setSelectedScheme(scheme.id);
    onUpdate(scheme.colors);
  };

  const handleCustomColorChange = (colorType, value) => {
    const newColors = {
      ...currentColors,
      [colorType]: value
    };
    onUpdate(newColors);
  };

  const ColorSwatch = ({ color, label, onClick, isSelected = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative cursor-pointer ${onClick ? '' : 'cursor-default'}`}
      onClick={onClick}
    >
      <div
        className="w-12 h-12 rounded-lg border-2 border-white/20 shadow-lg"
        style={{ backgroundColor: color }}
      />
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
      {label && (
        <p className="text-xs text-white/70 mt-1 text-center">{label}</p>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Color Scheme</h2>
        <p className="text-white/70">Choose colors that match your personality and industry</p>
      </div>

      {/* Preset Color Schemes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Preset Schemes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presetSchemes.map((scheme) => {
            const isSelected = selectedScheme === scheme.id;
            
            return (
              <motion.div
                key={scheme.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 bg-white/20' 
                      : 'hover:bg-white/10'
                  }`}
                  onClick={() => handleSchemeSelect(scheme)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className={`text-lg ${
                        isSelected ? 'text-white' : 'text-white/90'
                      }`}>
                        {scheme.name}
                      </CardTitle>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-white/70 text-sm mb-4">
                      {scheme.description}
                    </p>
                    
                    {/* Color Preview */}
                    <div className="flex space-x-2 mb-3">
                      <ColorSwatch color={scheme.colors.primary} label="Primary" />
                      <ColorSwatch color={scheme.colors.secondary} label="Secondary" />
                      <ColorSwatch color={scheme.colors.accent} label="Accent" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Custom Color Picker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Custom Colors</h3>
          <button
            onClick={() => setShowCustomPicker(!showCustomPicker)}
            className="btn-secondary flex items-center space-x-2"
          >
                            <Pipette className="w-4 h-4" />
            <span>{showCustomPicker ? 'Hide' : 'Show'} Custom Picker</span>
          </button>
        </div>

        {showCustomPicker && (
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Color */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/90">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <ColorSwatch color={currentColors.primary} />
                    <input
                      type="color"
                      value={currentColors.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="form-input w-24 text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/90">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <ColorSwatch color={currentColors.secondary} />
                    <input
                      type="color"
                      value={currentColors.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="form-input w-24 text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/90">Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <ColorSwatch color={currentColors.accent} />
                    <input
                      type="color"
                      value={currentColors.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="form-input w-24 text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/90">Background Color</label>
                  <div className="flex items-center space-x-3">
                    <ColorSwatch color={currentColors.background} />
                    <input
                      type="color"
                      value={currentColors.background}
                      onChange={(e) => handleCustomColorChange('background', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentColors.background}
                      onChange={(e) => handleCustomColorChange('background', e.target.value)}
                      className="form-input w-24 text-sm"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Current Color Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-4"
      >
        <h3 className="text-white font-semibold mb-3">Current Color Scheme</h3>
        <div className="flex flex-wrap gap-3">
          <ColorSwatch color={currentColors.primary} label="Primary" />
          <ColorSwatch color={currentColors.secondary} label="Secondary" />
          <ColorSwatch color={currentColors.accent} label="Accent" />
          <ColorSwatch color={currentColors.background} label="Background" />
          <ColorSwatch color={currentColors.text} label="Text" />
        </div>
      </motion.div>
    </div>
  );
};

export default ColorSchemeSelector; 