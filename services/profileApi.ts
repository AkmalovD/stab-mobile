import axios from 'axios';
import { JourneyProfile } from '../types';

const API_URL = 'http://localhost:8000/api';

export interface JourneyProfileData {
  id?: number;
  full_name: string;
  destination_country: string;
  intended_start_date: string;
  created_at?: string;
  updated_at?: string;
}

export const journeyProfileApi = {
  create: async (data: JourneyProfileData) => {
    const response = await axios.post(`${API_URL}/journey-profiles/`, data);
    return response.data;
  },

  getAll: async () => {
    const response = await axios.get(`${API_URL}/journey-profiles/`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get(`${API_URL}/journey-profiles/${id}/`);
    return response.data;
  },

  update: async (id: number, data: JourneyProfileData) => {
    const response = await axios.put(`${API_URL}/journey-profiles/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_URL}/journey-profiles/${id}`);
  }
};
