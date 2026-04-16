import { BaseService } from '../BaseService';
import { Laundry } from '../../../models/models';

class LaundryService extends BaseService {
  async list(): Promise<Laundry[]> {
    try {
      console.log('Base URL:', this.apiClient.defaults.baseURL);
      const res = await this.apiClient.get<Laundry[]>('/laundries');
      console.log('LaundryService.list response:', res.data);
      return res.data;
    } catch (error) {
      console.error('LaundryService.list error:', error);
      throw error;
    }
  }
}

export const laundryService = new LaundryService();
