import { CreateReport } from 'models/models';
import { useMutation } from '@tanstack/react-query';
import { reportService } from 'services/api/services/ReportService';

export function useSubmitReport() {
  return useMutation({
    mutationFn: (body: CreateReport) => reportService.create(body),
  });
}
