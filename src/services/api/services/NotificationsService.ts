import { BaseService } from '../BaseService';

class NotificationsService extends BaseService {
  async registerToken(token: string): Promise<void> {
    await this.apiClient.put('/users/me/fcm-token', { token });
  }
}

export const notificationsService = new NotificationsService();
