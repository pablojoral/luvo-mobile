import { CreateReport } from 'models/models';
import { useForm } from 'react-hook-form';
import { useSubmitReport } from 'query/Report/useSubmitReport';

export interface ReportFormValues {
  subject: string;
  description: string;
}

interface Options {
  laundryId?: number;
  machineId?: number;
  onSuccess: () => void;
}

export const useReportForm = ({ laundryId, machineId, onSuccess }: Options) => {
  const { mutateAsync } = useSubmitReport();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ReportFormValues>({
    defaultValues: { subject: '', description: '' },
  });

  const onSubmit = handleSubmit(async ({ subject, description }) => {
    try {
      const body: CreateReport = { subject, description };
      if (laundryId !== undefined) body.laundryId = laundryId;
      if (machineId !== undefined) body.machineId = machineId;
      await mutateAsync(body);
      onSuccess();
    } catch {
      setError('root', { message: 'No se pudo enviar el reporte. Intenta nuevamente.' });
    }
  });

  return { control, errors, isSubmitting, onSubmit };
};
