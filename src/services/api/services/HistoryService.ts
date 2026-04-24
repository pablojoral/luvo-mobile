import { BaseService } from '../BaseService';

export interface HistoryItem {
  id: string;
  machineName: string;
  machineType: 'washing_machine' | 'dryer';
  laundryName: string;
  amount: number | null;
  currency: string | null;
  isShared: boolean;
  createdAt: string;
  executedAt: string | null;
}

export interface HistoryPage {
  data: HistoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface HistoryStats {
  cyclesThisMonth: number;
  totalSpentThisMonth: number | null;
  currency: string | null;
}

class HistoryService extends BaseService {
  async getHistory(page = 1, limit = 20): Promise<HistoryPage> {
    const res = await this.apiClient.get<HistoryPage>('/history', { params: { page, limit } });
    return res.data;
  }

  async getStats(): Promise<HistoryStats> {
    const res = await this.apiClient.get<HistoryStats>('/history/stats');
    return res.data;
  }
}

export const historyService = new HistoryService();
