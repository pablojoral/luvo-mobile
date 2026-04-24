import { MyLaundry, MyLaundriesResponse } from '../../../models/models';
import { BaseService } from '../BaseService';

class MyLaundriesService extends BaseService {
  async list(): Promise<MyLaundriesResponse> {
    const res = await this.apiClient.get<MyLaundriesResponse>('/me/laundries');
    return res.data;
  }

  async add(laundryId: number): Promise<void> {
    await this.apiClient.post(`/me/laundries/${laundryId}`);
  }

  async remove(laundryId: number): Promise<void> {
    await this.apiClient.delete(`/me/laundries/${laundryId}`);
  }

  async register(code: string): Promise<MyLaundry> {
    const res = await this.apiClient.post<MyLaundry>('/me/laundries/register', { code });
    return res.data;
  }
}

export const myLaundriesService = new MyLaundriesService();
