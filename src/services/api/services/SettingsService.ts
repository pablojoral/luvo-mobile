import { PatchUserSettings, UserSettings } from '../../../models/models';
import { BaseService } from '../BaseService';

class SettingsService extends BaseService {
  async get(): Promise<UserSettings> {
    const res = await this.apiClient.get<UserSettings>('/users/me/settings');
    return res.data;
  }

  async patch(body: PatchUserSettings): Promise<UserSettings> {
    const res = await this.apiClient.patch<UserSettings>('/users/me/settings', body);
    return res.data;
  }
}

export const settingsService = new SettingsService();
