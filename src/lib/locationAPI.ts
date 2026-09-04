// lib/locationAPI.ts
import apiClient from './axiosConfig';

export interface Location {
  _id: string;
  name: string;
  slug: string;
  address?: string;
  phone?: string;
  phoneSecondary?: string;
  email?: string;
  mapEmbedUrl?: string;
  isActive?: boolean;
  isDefault?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export const locationAPI = {
  // Get all locations
  getAll: async (): Promise<{ success: boolean; data: Location[] }> => {
    try {
      const response = await apiClient.get('/settings/locations');
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },

  // Get location by slug
  getBySlug: async (slug: string): Promise<{ success: boolean; data: Location }> => {
    try {
      console.log('🔍 Fetching location by slug:', slug);
      const response = await apiClient.get(`/settings/locations/slug/${slug}`);
      console.log('✅ Location response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching location by slug:', error);
      throw error;
    }
  }
};

export default locationAPI;