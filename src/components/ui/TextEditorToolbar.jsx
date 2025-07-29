import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bold, Italic, Underline, Undo2, Redo2 } from 'lucide-react';

const fontFamilies = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Calibri', value: 'Calibri, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Cambria', value: 'Cambria, Georgia, serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
];

const fontSizes = [
  { label: 'S', value: '2' },
  { label: 'M', value: '3' },
  { label: 'L', value: '4' },
  { label: 'XL', value: '5' },
  { label: 'XXL', value: '6' },
];

const TextEditorToolbar = ({ selection, actions, toolbarRef, handleMouseDown, isDragging, dragPosition }) => {
  if (!selection.el) return null;
  
  // Calculate transform for smooth GPU-accelerated movement
  const transform = `translate(calc(-50% + ${dragPosition.x}px), calc(-100% + ${dragPosition.y}px))`;
  
  return (
    <AnimatePresence>
      <motion.div
        ref={toolbarRef}
        className={`fixed z-50 bg-white/95 backdrop-blur-md border border-gray-300 rounded-lg shadow-xl p-3 flex items-center space-x-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          top: selection.y, 
          left: selection.x, 
          transform: transform,
          willChange: isDragging ? 'transform' : 'auto'
        }}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ 
          duration: isDragging ? 0 : 0.2, 
          ease: "easeOut" 
        }}
        onMouseDown={handleMouseDown}
      >
      {/* Font family */}
      <select
        className="text-sm px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
        defaultValue=""
        onChange={(e) => actions.fontFamily(e.target.value)}
      >
        <option value="" disabled className="text-gray-800">Font</option>
        {fontFamilies.map((f) => (
          <option key={f.value} value={f.value} className="text-gray-800">{f.label}</option>
        ))}
      </select>

      {/* Font size */}
      <select
        className="text-sm px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
        defaultValue=""
        onChange={(e) => actions.fontSize(e.target.value)}
      >
        <option value="" disabled className="text-gray-800">Size</option>
        {fontSizes.map((s) => (
          <option key={s.value} value={s.value} className="text-gray-800">{s.label}</option>
        ))}
      </select>

      {/* Color pickers */}
      <div className="flex space-x-2">
        <input 
          type="color" 
          onChange={(e) => actions.color(e.target.value)}
          className="w-8 h-8 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
          title="Text Color"
        />
        <input 
          type="color" 
          onChange={(e) => actions.bgColor(e.target.value)}
          className="w-8 h-8 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
          title="Background Color"
        />
      </div>

      {/* Bold / Italic / Underline */}
      <motion.button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
        onClick={actions.bold}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </motion.button>
      <motion.button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
        onClick={actions.italic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </motion.button>
      <motion.button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
        onClick={actions.underline}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </motion.button>

      {/* Undo / Redo */}
      <motion.button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
        onClick={actions.undo}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </motion.button>
      <motion.button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
        onClick={actions.redo}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default TextEditorToolbar; 