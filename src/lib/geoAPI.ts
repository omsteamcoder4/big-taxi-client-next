// client/lib/geoAPI.ts
import apiClient from './axiosConfig';

export interface VoicePhrase {
  phrase: string;
  intent: string;
}

export interface Faq {
  question: string;
  answer: string;
  category?: string;
}

export interface TrustSignal {
  type: string;
  value: string;
  source?: string;
  isVisible: boolean;
}

export interface StructuredData {
  type: string;
  data: Record<string, unknown>;
}

export interface GeoSettings {
  _id?: string;
  pageType: 'homepage' | 'about' | 'services' | 'fleet' | 'contact' | 'booking';
  speakableText: string;
  speakableTextTitle: string;
  quickAnswer: string;
  quickAnswerQuestions: string[];
  voicePhrases: VoicePhrase[];
  voicePhrasesText: string;
  faqs: Faq[];
  faqsText: string;
  aiSummary: string;
  aiSummaryBullets: string[];
  structuredData: StructuredData[];
  structuredDataRaw: string;
  trustSignals: TrustSignal[];
  trustSignalsText: string;
  recommendedFor: string[];
  intents: string[];
  conversationalKeywords: string[];
  relatedEntities: string[];
  authorityScore: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeoSettingsResponse {
  success: boolean;
  data: GeoSettings;
}

export interface GeoJsonLdResponse {
  success: boolean;
  data: Record<string, unknown>;
}

export interface GeoPromptResponse {
  success: boolean;
  data: Record<string, unknown>;
}

export const geoAPI = {
  // ✅ PUBLIC: Get GEO settings for a specific page
  getByPage: async (pageType: string): Promise<GeoSettingsResponse> => {
    try {
      console.log(`Fetching GEO settings for page: ${pageType}`);
      const response = await apiClient.get(`/geo/page/${pageType}`);
      console.log('GEO API Response:', response.data);
      return response.data as GeoSettingsResponse;
    } catch (error) {
      console.error('Error fetching GEO settings:', error);
      throw error;
    }
  },
  
  getJsonLd: async (pageType: string): Promise<GeoJsonLdResponse | null> => {
    try {
      const response = await apiClient.get(`/geo/json-ld/${pageType}`);
      return response.data as GeoJsonLdResponse;
    } catch (error) {
      console.error('Error fetching GEO JSON-LD:', error);
      return null;
    }
  },
  
  getAiPrompt: async (pageType: string): Promise<GeoPromptResponse | null> => {
    try {
      const response = await apiClient.get(`/geo/prompt/${pageType}`);
      return response.data as GeoPromptResponse;
    } catch (error) {
      console.error('Error fetching AI prompt:', error);
      return null;
    }
  }
};

export default geoAPI;