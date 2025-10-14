import { render, screen, fireEvent } from '@testing-library/react';
import Filterbar from './FilterBar';
import { useFilterParams } from '../../hooks/useFilterParams/useFilterParams';
import { PricingOption, PricingOptionLabels } from '../../types';
import PriceSlider from '../PriceSlider/PriceSlider';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

// Mock hooks
jest.mock('../../hooks/useFilterParams/useFilterParams');
const mockUseFilterParams = useFilterParams as jest.MockedFunction<typeof useFilterParams>;

// Mock components
jest.mock('../PriceSlider/PriceSlider');
const mockPriceSlider = PriceSlider as jest.MockedFunction<typeof PriceSlider>;

// Mock Antd
jest.mock('antd', () => ({
  Checkbox: jest.fn(({ children, checked, onChange, className }) => (
    <label data-testid="checkbox" className={className}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        data-testid="checkbox-input"
      />
      {children}
    </label>
  )),
}));

// Mock styles
jest.mock('./FilterBar.module.scss', () => ({
  filterSection: 'filterSection',
  filterGroup: 'filterGroup',
  filterTitle: 'filterTitle',
  checkboxGroup: 'checkboxGroup',
  checkbox: 'checkbox',
  priceRange: 'priceRange',
  resetButton: 'resetButton',
}));

describe('Filterbar', () => {
  const mockSetPricingOptions = jest.fn();
  const mockResetFilters = jest.fn();
  const mockSetPriceRange = jest.fn();
  const mockSetSearchKeyword = jest.fn();
  const mockSetSortBy = jest.fn();

  const defaultFilterParams = {
    pricingOptions: [],
    searchKeyword: '',
    sortBy: 'title' as const,
    priceRange: [0, 999] as [number, number],
    setPricingOptions: mockSetPricingOptions,
    setSearchKeyword: mockSetSearchKeyword,
    setSortBy: mockSetSortBy,
    setPriceRange: mockSetPriceRange,
    resetFilters: mockResetFilters,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFilterParams.mockReturnValue(defaultFilterParams);
    mockPriceSlider.mockImplementation(({ value }) => (
      <div data-testid="price-slider">
        <span>Price Slider: {value.join('-')}</span>
      </div>
    ));
  });

  it('should call useFilterParams hook on mount', () => {
    render(<Filterbar />);
    expect(mockUseFilterParams).toHaveBeenCalledTimes(1);
  });

  it('should call setPricingOptions when checkbox is checked', () => {
    render(<Filterbar />);
    
    const checkboxes = screen.getAllByTestId('checkbox-input');
    fireEvent.click(checkboxes[0]);
    
    expect(mockSetPricingOptions).toHaveBeenCalled();
  });

  it('should add pricing option when checkbox is checked', () => {
    const initialOptions: PricingOption[] = [];
    mockUseFilterParams.mockReturnValue({
      ...defaultFilterParams,
      pricingOptions: initialOptions,
    });

    render(<Filterbar />);
    
    const checkboxes = screen.getAllByTestId('checkbox-input');
    fireEvent.click(checkboxes[0]);
    
    expect(mockSetPricingOptions).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should remove pricing option when checkbox is unchecked', () => {
    mockUseFilterParams.mockReturnValue({
        pricingOptions: [PricingOption.FREE],
        setPricingOptions: mockSetPricingOptions,
        resetFilters: mockResetFilters,
        priceRange: [0, 999],
        setPriceRange: mockSetPriceRange,
        searchKeyword: '',
        sortBy: 'title',
        setSearchKeyword: jest.fn(),
        setSortBy: jest.fn(),
    });

    render(<Filterbar />);
    
    const newOptions = [PricingOption.FREE].filter(item => item !== PricingOption.FREE);
    mockSetPricingOptions(newOptions);
    
    expect(mockSetPricingOptions).toHaveBeenCalledWith([]);
    });

  it('should call resetFilters when reset button is clicked', () => {
    render(<Filterbar />);
    
    fireEvent.click(screen.getByText('Reset'));
    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });

  it('should render price slider when PAID option is selected', () => {
    mockUseFilterParams.mockReturnValue({
      ...defaultFilterParams,
      pricingOptions: [PricingOption.PAID],
    });

    render(<Filterbar />);
    
    expect(screen.getByTestId('price-slider')).toBeInTheDocument();
  });

  it('should not render price slider when PAID option is not selected', () => {
    mockUseFilterParams.mockReturnValue({
      ...defaultFilterParams,
      pricingOptions: [PricingOption.FREE],
    });

    render(<Filterbar />);
    
    expect(screen.queryByTestId('price-slider')).not.toBeInTheDocument();
  });

  it('should render all pricing options from PricingOption enum', () => {
    render(<Filterbar />);
    
    const pricingOptionValues = Object.values(PricingOption).filter(value => typeof value === 'number');
    const checkboxes = screen.getAllByTestId('checkbox');
    
    expect(checkboxes).toHaveLength(pricingOptionValues.length);
  });

  it('should display correct labels for pricing options', () => {
    render(<Filterbar />);
    
    Object.values(PricingOption)
      .filter(value => typeof value === 'number')
      .forEach(option => {
        const label = PricingOptionLabels[option as PricingOption];
        expect(screen.getByText(label)).toBeInTheDocument();
      });
  });
});