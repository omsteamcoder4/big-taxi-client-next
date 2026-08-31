// lib/servicesAPI.ts - FIXED
import apiClient from './axiosConfig';

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  features: string[];
  bulletPoints: string[];
  displayOrder: number;
  active: boolean;
  isFeatured: boolean;
  location: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  success: boolean;
  count: number;
  data: Service[];
}

export const servicesAPI = {
  // Get all services
  getAll: async (params?: { includeInactive?: boolean; location?: string }): Promise<ServicesResponse> => {
    try {
      const response = await apiClient.get('/services', { params });
      return response.data as ServicesResponse;
    } catch (error) {
      console.error('Error in getAll services:', error);
      throw error;
    }
  },

  // Get service by ID
  getById: async (id: string): Promise<{ success: boolean; data: Service }> => {
    try {
      const response = await apiClient.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getById services:', error);
      throw error;
    }
  },

  // Get service by slug - FIXED
  getBySlug: async (slug: string): Promise<{ success: boolean; data: Service }> => {
    try {
      console.log('🔍 Fetching service by slug:', slug);
      const response = await apiClient.get(`/services/slug/${slug}`);
      console.log('✅ Service response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error in getBySlug services:', error);
      throw error;
    }
  },

  // Create service (admin only)
  create: async (formData: FormData): Promise<{ success: boolean; data: Service }> => {
    try {
      const response = await apiClient.post('/services', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error in create service:', error);
      throw error;
    }
  },

  // Update service (admin only)
  update: async (id: string, formData: FormData): Promise<{ success: boolean; data: Service }> => {
    try {
      const response = await apiClient.put(`/services/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error in update service:', error);
      throw error;
    }
  },

  // Delete service (admin only)
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in delete service:', error);
      throw error;
    }
  }
};

export default servicesAPI;