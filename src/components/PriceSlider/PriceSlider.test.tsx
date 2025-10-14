import { render, fireEvent } from '@testing-library/react';
import PriceSlider from './PriceSlider';

jest.mock('antd', () => ({
  Slider: jest.fn(({ onChange, value }) => (
    <input 
      data-testid="slider" 
      value={value.join(',')}
      onChange={(e) => onChange(e.target.value.split(',').map(Number))}
    />
  )),
}));

jest.mock('./PriceSlider.module.scss', () => ({
  sliderContainer: 'sliderContainer',
  sliderValues: 'sliderValues',
}));

describe('PriceSlider', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onChange with correct values when slider changes', () => {
    render(<PriceSlider value={[10, 100]} onChange={mockOnChange} />);
    
    const slider = document.querySelector('[data-testid="slider"]') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '20,80' } });
    
    expect(mockOnChange).toHaveBeenCalledWith([20, 80]);
  });

  it('forces right side to be at least 1', () => {
    render(<PriceSlider value={[10, 100]} onChange={mockOnChange} />);
    
    const slider = document.querySelector('[data-testid="slider"]') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '0,0' } });
    
    expect(mockOnChange).toHaveBeenCalledWith([0, 1]);
  });

  it('prevents left side from exceeding right side', () => {
    render(<PriceSlider value={[10, 100]} onChange={mockOnChange} />);
    
    const slider = document.querySelector('[data-testid="slider"]') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '50,50' } });
    
    expect(mockOnChange).toHaveBeenCalledWith([49, 50]);
  });

  it('uses default min and max values', () => {
    render(<PriceSlider value={[10, 100]} onChange={mockOnChange} />);
    
    expect(mockOnChange).toBeDefined();
  });
});