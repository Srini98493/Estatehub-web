import { create } from 'zustand';
import { API_ENDPOINTS } from '../config/api';
import { api } from '../utils/api';

interface Attachment {
  attachmentid: number;
  attachmentname: string;
  attachmenttype: number;
  attachmenturl: string;
  isprimary: boolean;
}

interface Property {
  propertyid: number;
  propertytitle: string;
  propertydescription: string;
  propertytype: string;
  propertycategory: number;
  propertycategoryname: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  city: string;
  address: string;
  attachments: Attachment[] | null;
  // Add other properties as needed
}

interface SearchParams {
  propertyCategory: string;
  propertyType: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  minBedrooms: string;
  maxBedrooms: string;
  userId: number | null;
}

interface PropertyState {
  searchResults: Property[];
  isLoading: boolean;
  error: string | null;
  searchParams: Partial<SearchParams> | null;
  searchProperties: () => Promise<void>;
  resetSearch: () => void;
  refreshProperties: () => Promise<void>;
  setSearchParams: (params: Partial<SearchParams>) => void;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  searchResults: [],
  isLoading: false,
  error: null,
  searchParams: null,

  setSearchParams: (params) => set({ searchParams: params }),


  searchProperties: async () => {
    set({ isLoading: true, error: null });
    const { searchParams } = get();
    if (!searchParams) return;
    try {
      const userId = searchParams.userId || 0;
      const updatedSearchParams = new URLSearchParams({
        propertyCategory: searchParams.propertyCategory || 'null',
        propertyType: searchParams.propertyType || 'null',
        city: searchParams.city || 'null',
        minPrice: searchParams.minPrice || 'null',
        maxPrice: searchParams.maxPrice || 'null',
        minArea: searchParams.minArea || 'null',
        minBedrooms: searchParams.minBedrooms || 'null',
        maxBedrooms: searchParams.maxBedrooms || 'null',
        userid: userId?.toString() || 'null'
      });

      const data = await api.fetch(`${API_ENDPOINTS.PROPERTIES}/search?${updatedSearchParams}`);
      const propertyArray = data?.[0]?.t_searchcriteria || [];

      set({ 
        searchResults: propertyArray,
        searchParams: searchParams as SearchParams,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },

  refreshProperties: async () => {
    const { searchParams, searchProperties } = get();
    if (searchParams){
      await searchProperties();
    }
  },

  resetSearch: () => {
    set({
      searchResults: [],
      searchParams: null,
      error: null
    });
  }
})); 