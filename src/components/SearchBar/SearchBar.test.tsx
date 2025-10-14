import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { useFilterParams } from '../../hooks/useFilterParams/useFilterParams';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../../hooks/useFilterParams/useFilterParams');
jest.mock('../../hooks/useDebounce/useDebounce');
jest.mock('./SearchBar.module.scss', () => ({
  searchBar: 'searchBar',
  searchInput: 'searchInput',
}));

const mockUseFilterParams = useFilterParams as jest.Mock;
const mockUseDebounce = useDebounce as jest.Mock;

describe('SearchBar', () => {
  const mockSetSearchKeyword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFilterParams.mockReturnValue({
      searchKeyword: '',
      setSearchKeyword: mockSetSearchKeyword,
    });
    mockUseDebounce.mockImplementation((value) => value);
  });

  it('calls useFilterParams and useDebounce hooks', () => {
    render(<SearchBar />);
    expect(mockUseFilterParams).toHaveBeenCalled();
    expect(mockUseDebounce).toHaveBeenCalled();
  });

  it('updates search term on input change', () => {
    render(<SearchBar />);
    
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(input.value).toBe('test');
  });

  it('calls setSearchKeyword with debounced value', () => {
    mockUseDebounce.mockReturnValue('debounced');
    render(<SearchBar />);
    
    expect(mockSetSearchKeyword).toHaveBeenCalledWith('debounced');
  });

  it('syncs searchTerm with searchKeyword from hook', () => {
    mockUseFilterParams.mockReturnValue({
      searchKeyword: 'initial',
      setSearchKeyword: mockSetSearchKeyword,
    });
    
    render(<SearchBar />);
    
    const input = document.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });
});