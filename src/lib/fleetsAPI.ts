// client/lib/fleetsAPI.ts
import apiClient from './axiosConfig';

export interface Fleet {
  _id: string;
  type: string;
  slug: string;
  description: string;
  shortDescription: string;
  capacity: string;
  luggage: string;
  features: string[];
  ideal: string;
  image: string;
  images: string[];
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FleetsResponse {
  success: boolean;
  count: number;
  data: Fleet[];
}

export interface FleetResponse {
  success: boolean;
  data: Fleet;
}

export const fleetsAPI = {
  // Get all fleets (public - only active ones)
  getAll: async (params?: { includeInactive?: boolean }): Promise<FleetsResponse> => {
    try {
      console.log('Fetching fleets from API...');
      const response = await apiClient.get('/fleets', { params });
      console.log('API Response status:', response.status);
      console.log('API Response data:', response.data);
      return response.data as FleetsResponse;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },
  
  // Get fleet by ID
  getById: async (id: string): Promise<FleetResponse> => {
    try {
      const response = await apiClient.get(`/fleets/${id}`);
      return response.data as FleetResponse;
    } catch (error) {
      console.error(`Error fetching fleet by ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get fleet by slug
  getBySlug: async (slug: string): Promise<FleetResponse> => {
    try {
      console.log(`Fetching fleet by slug: ${slug}`);
      const response = await apiClient.get(`/fleets/slug/${slug}`);
      console.log('Slug response:', response.data);
      return response.data as FleetResponse;
    } catch (error) {
      console.error(`Error fetching fleet by slug ${slug}:`, error);
      throw error;
    }
  },
};

export default fleetsAPI;