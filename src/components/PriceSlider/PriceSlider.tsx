import React from 'react';
import { Slider } from 'antd';
import styles from './PriceSlider.module.scss';

interface PriceSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 999 
}) => {
  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
    let [newMin, newMax] = newValue;
    
    // Force the right side to be at least 1
    if (newMax < 1) newMax = 1;
    
    // Make sure the left side does not exceed the right side -1
    if (newMin >= newMax) newMin = newMax - 1;
      onChange([newMin, newMax]);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider
        range
        min={min}
        max={max}
        value={[value[0], value[1]]}
        onChange={handleChange}
        tooltip={{ formatter: (val) => `$${val}` }}
        styles={{
          rail: {
            background: '#e0e0e0'
          },
          root: {
            margin: '0',
            width: 'calc(100% - 1rem)'
          },
          track: {
            background: '#4facfe'
          },
          handle: {
            borderColor: '#4facfe'
          }
        }}
      />
      <div className={styles.sliderValues}>
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};

export default PriceSlider;