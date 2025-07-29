import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, BookOpen, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimalist design with bold typography',
    icon: Sparkles,
    preview: 'modern-preview',
    features: ['Bold typography', 'Clean layout', 'Professional look']
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format with timeless appeal',
    icon: BookOpen,
    preview: 'classic-preview',
    features: ['Traditional format', 'Easy to read', 'Widely accepted']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique design with visual elements and modern flair',
    icon: Palette,
    preview: 'creative-preview',
    features: ['Visual elements', 'Modern flair', 'Stand out']
  }
];

const TemplateSelector = ({ data, onUpdate }) => {
  const selectedTemplate = data?.name || 'modern';

  const handleTemplateSelect = (templateId) => {
    onUpdate({
      ...data,
      name: templateId,
      layout: templateId === 'creative' ? 'two-column' : 'single-column'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Template</h2>
        <p className="text-white/70">Select a template that matches your style and industry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          
          return (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 bg-white/20' 
                    : 'hover:bg-white/10'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-blue-500' : 'bg-white/20'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isSelected ? 'text-white' : 'text-white/70'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className={`text-lg ${
                          isSelected ? 'text-white' : 'text-white/90'
                        }`}>
                          {template.name}
                        </CardTitle>
                      </div>
                    </div>
                    
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
                    {template.description}
                  </p>
                  
                  {/* Template Preview */}
                  <div className={`w-full h-24 rounded-lg mb-4 ${
                    template.id === 'modern' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                      : template.id === 'classic'
                      ? 'bg-gradient-to-br from-gray-600 to-gray-800'
                      : 'bg-gradient-to-br from-pink-500 to-orange-500'
                  }`}>
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-xs font-medium">
                        {template.name.toUpperCase()} PREVIEW
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                        <span className="text-white/60 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Template Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-4"
      >
        <h3 className="text-white font-semibold mb-2">
          About {templates.find(t => t.id === selectedTemplate)?.name} Template
        </h3>
        <p className="text-white/70 text-sm">
          {selectedTemplate === 'modern' && 
            "Perfect for tech professionals and creative industries. Features clean lines, bold typography, and a modern aesthetic that stands out."
          }
          {selectedTemplate === 'classic' && 
            "Ideal for traditional industries like finance, law, and healthcare. Uses a proven format that hiring managers are familiar with."
          }
          {selectedTemplate === 'creative' && 
            "Great for designers, marketers, and creative professionals. Includes visual elements and unique layouts to showcase creativity."
          }
        </p>
      </motion.div>
    </div>
  );
};

export default TemplateSelector; 