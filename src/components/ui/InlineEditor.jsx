import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X } from 'lucide-react';

const InlineEditor = ({ 
  children, 
  value, 
  onSave, 
  field, 
  section, 
  placeholder = "Click to edit...",
  className = "",
  multiline = false,
  maxLength = 500
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      const element = multiline ? textareaRef.current : inputRef.current;
      if (element) {
        element.focus();
        element.select();
      }
    }
  }, [isEditing, multiline]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSave && editValue !== value) {
      onSave(field, editValue, section);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    // Small delay to allow for button clicks
    setTimeout(() => {
      if (isEditing) {
        handleSave();
      }
    }, 100);
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative inline-block w-full"
      >
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full p-2 border-2 border-blue-400 rounded-md bg-white text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            rows={Math.max(2, editValue.split('\n').length)}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full p-2 border-2 border-blue-400 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          />
        )}
        
        {/* Action buttons */}
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-green-600 transition-colors"
          >
            <Check className="w-3 h-3" />
          </motion.button>
          <motion.button
            onClick={handleCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative inline-block cursor-pointer group ${className}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {children || (value || placeholder)}
      
      {/* Edit indicator */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="w-2.5 h-2.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InlineEditor; 