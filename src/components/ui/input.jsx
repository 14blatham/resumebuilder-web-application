import React from 'react';
import { motion } from 'framer-motion';

const Input = React.forwardRef(({ 
  className = '', 
  type = 'text', 
  error, 
  label, 
  helperText,
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
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type={type}
          className={`
            form-input
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

Input.displayName = 'Input';

export default Input; 