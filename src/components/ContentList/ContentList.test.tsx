// ContentList.test.tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentList from './ContentList';
import contentReducer from '../../store/contentSlice';
import { PricingOption } from '../../types';

// Mock hooks
jest.mock('../../hooks/useFilterParams/useFilterParams', () => ({
  useFilterParams: jest.fn(() => ({
    pricingOptions: [],
    searchKeyword: '',
    sortBy: 'title',
    priceRange: [0, 999],
    setPricingOptions: jest.fn(),
    setSearchKeyword: jest.fn(),
    setSortBy: jest.fn(),
    setPriceRange: jest.fn(),
    resetFilters: jest.fn(),
  })),
}));

// Mock InfiniteScroll
jest.mock('../../hooks/useInfiniteScroll/useInfiniteScroll', () => ({
  useInfiniteScroll: jest.fn(() => ({
    observerRef: { current: null },
  })),
}));

// Mock ContentCard
jest.mock('../ContentCard/ContentCard', () => ({
  __esModule: true,
  default: jest.fn(({ item }) => (
    <div data-testid="content-card">
      <div>{item.title}</div>
    </div>
  )),
}));

// Mock Antd components 
jest.mock('antd', () => {
  const MockSkeletonNode = () => <div data-testid="skeleton-node" />;
  const MockEmpty = () => <div data-testid="empty-state">No data</div>;
  const MockSkeleton = () => <div data-testid="skeleton-paragraph" />;

  return {
    Empty: MockEmpty,
    Skeleton: Object.assign(MockSkeleton, {
      Node: MockSkeletonNode,
    }),
  };
});

// Mock SCSS
jest.mock('./ContentList.module.scss', () => ({
  contentList: 'contentList',
  grid: 'grid',
  skeletonCard: 'skeletonCard',
  emptyContainer: 'emptyContainer',
  customEmpty: 'customEmpty',
  trigger: 'trigger',
}));

// Mock store hooks
const mockDispatch = jest.fn();
jest.mock('../../store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

import { useAppSelector as actualUseAppSelector } from '../../store';

// Mock store
const createMockStore = (initialState: any) =>
  configureStore({
    reducer: { content: contentReducer },
    preloadedState: { content: initialState },
  });

describe('ContentList', () => {
  const mockItems = [
    {
      id: '1',
      title: 'Test Content',
      creator: 'Test Creator',
      pricingOption: PricingOption.PAID,
      price: 29.99,
      path: 'test.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (actualUseAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        content: {
          items: [],
          loading: false,
          hasMore: true,
          page: 0,
        },
      })
    );
  });

  const renderComponent = (initialState: any) => {
    const store = createMockStore(initialState);
    
    (actualUseAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        content: initialState,
      })
    );
    
    return render(
      <Provider store={store}>
        <ContentList />
      </Provider>
    );
  };

  it('renders skeleton when loading', () => {
    renderComponent({
      items: [],
      loading: true,
      hasMore: true,
      page: 0,
    });

    expect(screen.getAllByTestId('skeleton-node')).toHaveLength(8);
  });

  it('renders content when loaded', () => {
    renderComponent({
      items: mockItems,
      loading: false,
      hasMore: true,
      page: 1,
    });

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have correct initial state from store', () => {
    const initialState = {
      items: mockItems,
      loading: false,
      hasMore: true,
      page: 1,
    };
    
    renderComponent(initialState);
    
    expect(actualUseAppSelector).toHaveBeenCalled();
  });
});