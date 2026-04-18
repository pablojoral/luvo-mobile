import { CreateReport, Report } from '../../../models/models';
import { BaseService } from '../BaseService';

class ReportService extends BaseService {
  async create(body: CreateReport): Promise<Report> {
    const res = await this.apiClient.post<Report>('/reports', body);
    return res.data;
  }
}

export const reportService = new ReportService();
