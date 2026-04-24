import { BaseService } from '../BaseService';
import { Laundry } from '../../../models/models';

class LaundryService extends BaseService {
  async list(): Promise<Laundry[]> {
    const res = await this.apiClient.get<Laundry[]>('/laundries');
    return res.data;
  }
}

export const laundryService = new LaundryService();
