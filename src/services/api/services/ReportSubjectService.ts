import { BaseService } from '../BaseService';

export type ReportSubjectCategory = 'general' | 'laundry' | 'washing_machine' | 'dryer';

export interface ReportSubject {
  id: number;
  label: string;
  category: ReportSubjectCategory;
}

class ReportSubjectService extends BaseService {
  async list(): Promise<ReportSubject[]> {
    const res = await this.apiClient.get<ReportSubject[]>('/report-subjects');
    return res.data;
  }
}

export const reportSubjectService = new ReportSubjectService();
