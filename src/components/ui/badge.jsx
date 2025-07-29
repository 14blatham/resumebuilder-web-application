import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Badge = React.forwardRef(({ 
  children, 
  variant = 'default',
  size = 'default',
  removable = false,
  onRemove,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200';
  
  const variants = {
    default: 'bg-white/20 text-white border border-white/30',
    primary: 'bg-blue-500/20 text-blue-100 border border-blue-400/30',
    secondary: 'bg-gray-500/20 text-gray-100 border border-gray-400/30',
    success: 'bg-green-500/20 text-green-100 border border-green-400/30',
    warning: 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30',
    danger: 'bg-red-500/20 text-red-100 border border-red-400/30',
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
      
      {removable && (
        <motion.button
          type="button"
          onClick={onRemove}
          className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-3 h-3" />
        </motion.button>
      )}
    </motion.span>
  );
});

const BadgeGroup = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

Badge.displayName = 'Badge';
BadgeGroup.displayName = 'BadgeGroup';

export { Badge, BadgeGroup }; 