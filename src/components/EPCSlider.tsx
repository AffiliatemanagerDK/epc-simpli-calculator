
import React from 'react';
import { Slider } from "@/components/ui/slider";

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
  displaySuffix = ''
}: EPCSliderProps) => {
  return (
    <Slider
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      className="py-2"
    />
  );
};

export default EPCSlider;
