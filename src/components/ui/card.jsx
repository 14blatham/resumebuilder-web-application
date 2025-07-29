import React from 'react';
import { motion } from 'framer-motion';

const Card = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`glass-effect rounded-xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

const CardHeader = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`px-6 py-4 border-b border-white/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardTitle = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <h3
      ref={ref}
      className={`text-lg font-semibold text-white ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
});

const CardDescription = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-white/70 mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

const CardContent = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardFooter = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`px-6 py-4 border-t border-white/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 