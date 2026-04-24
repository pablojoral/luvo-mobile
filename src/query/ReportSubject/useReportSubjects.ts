import { useQuery } from '@tanstack/react-query';
import { reportSubjectService, ReportSubject } from 'services/api/services/ReportSubjectService';
import { qk } from '../keys';

export function useReportSubjects() {
  return useQuery<ReportSubject[]>({
    queryKey: qk.reportSubjects.list(),
    queryFn:  () => reportSubjectService.list(),
    staleTime: 24 * 60 * 60 * 1000, // subjects change rarely — cache for 24 h
  });
}
