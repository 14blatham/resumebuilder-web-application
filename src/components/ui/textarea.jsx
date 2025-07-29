import React from 'react';
import { motion } from 'framer-motion';

const Textarea = React.forwardRef(({ 
  className = '', 
  error, 
  label, 
  helperText,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <textarea
          rows={rows}
          className={`
            form-input
            resize-y
            min-h-[100px]
            ${error ? 'border-red-400 focus:ring-red-400' : ''}
            ${className}
          `}
          ref={ref}
          {...props}
        />
      </motion.div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
      
      {helperText && !error && (
        <p className="text-white/60 text-sm">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea; 