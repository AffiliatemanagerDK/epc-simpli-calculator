
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface EPCSliderProps {
  label?: string;
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  displaySuffix?: string;
}

const EPCSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
  displaySuffix = ''
}: EPCSliderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  // Handle toggling to edit mode
  const handleValueClick = () => {
    setInputValue(value[0].toString());
    setIsEditing(true);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle when user submits a value via Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  // Parse and apply the value when input loses focus
  const handleInputBlur = () => {
    let newValue = parseFloat(inputValue);
    
    // Validate input is a number and within range
    if (isNaN(newValue)) {
      newValue = value[0]; // Keep current value if invalid
    } else {
      // Ensure value is within min/max range
      newValue = Math.max(min, Math.min(max, newValue));
      
      // Round to nearest step if needed
      if (step !== 0) {
        newValue = Math.round(newValue / step) * step;
      }
    }

    // Update the slider
    onChange([newValue]);
    setIsEditing(false);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center">
        <Slider
          value={value}
          onValueChange={onChange}
          min={min}
          max={max}
          step={step}
          className="flex-1"
        />
        <div className="ml-4 w-24 text-right">
          {isEditing ? (
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="h-8 w-full text-right font-medium text-jade"
              autoFocus
            />
          ) : (
            <span 
              className="text-jade font-medium cursor-pointer hover:underline" 
              onClick={handleValueClick}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleValueClick()}
              role="button"
              aria-label="Edit value"
            >
              {displayValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EPCSlider;
