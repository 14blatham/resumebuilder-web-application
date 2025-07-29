import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Slider = React.forwardRef(({ 
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  className = '',
  label,
  disabled = false,
  ...props 
}, ref) => {
  const [currentValue, setCurrentValue] = useState(value || defaultValue || min);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white/90">
            {label}
          </label>
          <span className="text-sm text-white/70">
            {currentValue}
          </span>
        </div>
      )}
      
      <div className="relative">
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className={`
            w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:shadow-lg
          `}
          {...props}
        />
        
        {/* Custom track fill */}
        <div 
          className="absolute top-0 left-0 h-2 bg-white/40 rounded-lg pointer-events-none transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider; 