import { BaseService } from '../BaseService';
import { Laundry } from '../../../models/models';

class LaundryService extends BaseService {
  async list(): Promise<Laundry[]> {
    try {
      const res = await this.apiClient.get<Laundry[]>('/laundries');
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const laundryService = new LaundryService();
