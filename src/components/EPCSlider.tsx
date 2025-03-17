
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface EPCSliderProps {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  displaySuffix?: string;
}

const EPCSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
  displaySuffix = ''
}: EPCSliderProps) => {
  return (
    <div className="slider-container">
      <div className="flex justify-between items-center mb-2">
        <label className="input-label">{label}</label>
        <span className="text-jade font-medium">{displayValue}{displaySuffix}</span>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        className="py-2"
      />
    </div>
  );
};

export default EPCSlider;
