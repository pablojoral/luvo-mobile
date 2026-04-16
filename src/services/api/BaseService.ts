import type { AxiosInstance } from 'axios';
import { apiClient } from './apiClient';

export class BaseService {
  protected apiClient: AxiosInstance;
  constructor(client: AxiosInstance = apiClient) {
    this.apiClient = client;
  }
}
