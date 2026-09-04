import apiClient from './axiosConfig';

export interface Settings {
  _id?: string;
  address: string;
  phone: string;
  phoneSecondary: string;
  whatsapp: string;
  email: string;
  mapEmbedUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SettingsResponse {
  success: boolean;
  data: Settings;
}

export const settingsAPI = {
  // Get public settings (no auth required)
  getPublic: async (): Promise<SettingsResponse> => {
    try {
      const response = await apiClient.get('/settings/public');
      return response.data as SettingsResponse;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },
};

export default settingsAPI;