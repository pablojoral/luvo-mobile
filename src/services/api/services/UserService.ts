import { BaseService } from '../BaseService';
import { AuthUser } from '../../../models/models';

class UserService extends BaseService {
  async updateProfile(data: { name?: string; avatarId?: number | null }): Promise<AuthUser> {
    const res = await this.apiClient.patch<AuthUser>('/users/me', data);
    return res.data;
  }

  async deleteAccount(): Promise<void> {
    await this.apiClient.delete('/users/me');
  }
}

export const userService = new UserService();
