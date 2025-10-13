import React from 'react';
import styles from './PriceSlider.module.scss';

interface PriceSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ value, onChange, min, max }) => {
  const [minValue, maxValue] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 1);
    onChange([newMin, maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minValue + 1);
    onChange([minValue, newMax]);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderValues}>
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>
      <div className={styles.sliderTrack}>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className={styles.slider}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.slider}
        />
      </div>
    </div>
  );
};

export default PriceSlider;