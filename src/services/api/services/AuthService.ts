import auth from '@react-native-firebase/auth';

import { BaseService } from '../BaseService';
import { AuthUser } from '../../../models/models';

class AuthService extends BaseService {
  // Optional: call your API to ensure user exists / sync profile
  async ensureSession(): Promise<void> {
    // Example: POST /auth/session just validates the Firebase token from header
    await this.apiClient.post('/auth/session', {});
  }

  async me(): Promise<AuthUser> {
    const res = await this.apiClient.get<AuthUser>('/auth/me');
    return res.data;
  }

  async logout(): Promise<void> {
    await auth().signOut();
  }
}

export const authService = new AuthService();
