import React from 'react';

const Label = React.forwardRef(({ 
  className = '', 
  children, 
  htmlFor,
  required = false,
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={`
        block text-sm font-medium text-white/90
        ${required ? 'after:content-["*"] after:ml-1 after:text-red-400' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label; 