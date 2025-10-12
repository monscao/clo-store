import { ContentItem, PricingOption } from '../types';

const API_BASE_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';
const PLACEHOLDER_IMAGE = '/src/assets/svgs/placeholder-image.svg';

export const fetchContents = async (page: number, limit: number = 20): Promise<ContentItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.status || response.status !== 200) {
      throw new Error('Failed to fetch content');
    }
    const data = await response.json();
    // Transform API response to match our ContentItem type
    return data.map((item: any) => {
      return {
        id: page + item.id, // Ensure unique ID for pagination
        path: item.imagePath || PLACEHOLDER_IMAGE,
        creator: item.creator || 'Unknown Creator',
        title: page + item.title || 'Untitled',
        pricingOption: item.pricingOption || PricingOption.FREE,
        price: item.price || 0
      };
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};