// ContentCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ContentCard from './ContentCard';
import { ContentItem, PricingOption } from '../../types';

// Mock the SCSS module
jest.mock('./ContentCard.module.scss', () => ({
  card: 'card',
  imageContainer: 'imageContainer',
  image: 'image',
  cardContent: 'cardContent',
  cardLeft: 'cardLeft',
  cardRight: 'cardRight',
  title: 'title',
  creator: 'creator',
  priceBadge: 'priceBadge',
  priceBadgePaid: 'priceBadgePaid',
  priceBadgeFree: 'priceBadgeFree',
  priceBadgeViewOnly: 'priceBadgeViewOnly',
}));

// Mock SVG files to return a string - this handles the actual import
const MOCK_PLACEHOLDER = 'mocked-placeholder-image.svg';

describe('ContentCard', () => {
  const mockItem: ContentItem = {
    id: '1',
    title: 'Test Content',
    creator: 'Test Creator',
    path: 'test-image.jpg',
    pricingOption: PricingOption.PAID,
    price: 29.99,
  };

  const renderComponent = (item: ContentItem = mockItem, placeholderImage?: string) => {
    return render(<ContentCard item={item} placeholderImage={placeholderImage} />);
  };

  it('renders content card with correct information', () => {
    renderComponent();

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('By Test Creator')).toBeInTheDocument();
    expect(screen.getByAltText('Test Content')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('displays correct price for PAID content', () => {
    renderComponent();

    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('displays FREE for free content', () => {
    const freeItem: ContentItem = {
      ...mockItem,
      pricingOption: PricingOption.FREE,
    };
    renderComponent(freeItem);

    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('displays View Only for view-only content', () => {
    const viewOnlyItem: ContentItem = {
      ...mockItem,
      pricingOption: PricingOption.VIEW_ONLY,
    };
    renderComponent(viewOnlyItem);

    expect(screen.getByText('View Only')).toBeInTheDocument();
  });

  it('handles zero price for paid content', () => {
    const zeroPriceItem: ContentItem = {
      ...mockItem,
      price: 0,
    };
    renderComponent(zeroPriceItem);

    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles missing price for paid content', () => {
    const noPriceItem: ContentItem = {
      ...mockItem,
      price: undefined,
    };
    renderComponent(noPriceItem);

    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('applies correct CSS class for each pricing option', () => {
    const { container } = renderComponent();

    const priceBadge = container.querySelector('.priceBadge');
    expect(priceBadge).toHaveClass('priceBadgePaid');
  });

  describe('image error handling', () => {
    it('loads placeholder image when original image fails to load', () => {
        renderComponent(mockItem, MOCK_PLACEHOLDER);

        const image = screen.getByAltText('Test Content');
        fireEvent.error(image);
        expect(image).toHaveAttribute('src', MOCK_PLACEHOLDER);
    });

    it('uses placeholder image when path is empty', () => {
        const noImageItem: ContentItem = {
        ...mockItem,
        path: '',
        };
        renderComponent(noImageItem, MOCK_PLACEHOLDER);

        const image = screen.getByAltText('Test Content');
        expect(image).toHaveAttribute('src', MOCK_PLACEHOLDER);
    });
  });

  it('renders with invalid pricing option', () => {
    const invalidPricingItem: ContentItem = {
      ...mockItem,
      pricingOption: 'INVALID' as unknown as PricingOption,
    };
    
    renderComponent(invalidPricingItem);

    // Should still render basic content without crashing
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('By Test Creator')).toBeInTheDocument();
  });

  it('maintains original image when path is valid', () => {
    const validImageItem: ContentItem = {
      ...mockItem,
      path: 'valid-image-path.jpg',
    };
    renderComponent(validImageItem);

    const image = screen.getByAltText('Test Content');
    expect(image).toHaveAttribute('src', 'valid-image-path.jpg');
  });
});