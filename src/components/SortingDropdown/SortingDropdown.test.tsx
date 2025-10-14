import { render, fireEvent } from '@testing-library/react';
import SortingDropdown from './SortingDropdown';
import { useFilterParams } from '../../hooks/useFilterParams/useFilterParams';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../../hooks/useFilterParams/useFilterParams');
jest.mock('antd', () => ({
  Select: jest.fn(({ onChange, value, options }) => (
    <select 
      data-testid="select" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )),
}));

jest.mock('./SortingDropdown.module.scss', () => ({
  selectContainer: 'selectContainer',
  dropdown: 'dropdown',
}));

const mockUseFilterParams = useFilterParams as jest.Mock;

describe('SortingDropdown', () => {
  const mockSetSortBy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFilterParams.mockReturnValue({
      sortBy: 'title',
      setSortBy: mockSetSortBy,
    });
  });

  it('calls useFilterParams hook', () => {
    render(<SortingDropdown />);
    expect(mockUseFilterParams).toHaveBeenCalled();
  });

  it('calls setSortBy when selection changes', () => {
    render(<SortingDropdown />);
    
    const select = document.querySelector('[data-testid="select"]') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'price-high' } });
    
    expect(mockSetSortBy).toHaveBeenCalledWith('price-high');
  });

  it('displays correct options', () => {
    render(<SortingDropdown />);
    
    const select = document.querySelector('[data-testid="select"]') as HTMLSelectElement;
    expect(select.children).toHaveLength(3);
  });

  it('sets initial value from hook', () => {
    mockUseFilterParams.mockReturnValue({
      sortBy: 'price-low',
      setSortBy: mockSetSortBy,
    });
    
    render(<SortingDropdown />);
    
    const select = document.querySelector('[data-testid="select"]') as HTMLSelectElement;
    expect(select.value).toBe('price-low');
  });
});