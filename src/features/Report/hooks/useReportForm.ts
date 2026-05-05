import { SelectorOption } from 'components/PillSelector/PillSelector';
import { CreateReport, Laundry, Machine } from 'models/models';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { useReportSubjects } from 'query/ReportSubject/useReportSubjects';
import { useSubmitReport } from 'query/Report/useSubmitReport';
import { useQRScanner } from 'stores/useQRScanner';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';
import { useReportStrings } from './useReportStrings';

export type SelectedEntity =
  | { type: 'laundry'; laundry: Laundry }
  | { type: 'machine'; machine: Machine; laundry: Laundry };

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
  const strings = useReportStrings();
  const { mutateAsync } = useSubmitReport();
  const { open: openScanner } = useQRScanner();
  const { addMessage } = useMessagesStore();
  const laundries = useLaundriesStore(s => s.laundries);
  const laundriesRef = useRef(laundries);
  useEffect(() => { laundriesRef.current = laundries; }, [laundries]);

  const { data: subjects } = useReportSubjects();

  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(null);
  const initializedRef = useRef(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleDescriptionFocus = useCallback(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<ReportFormValues>({
    defaultValues: { subject: '', description: '' },
  });

  useEffect(() => {
    if (initializedRef.current) return;
    if (machineId === undefined && laundryId === undefined) {
      initializedRef.current = true;
      return;
    }
    if (laundries.length === 0) return;

    initializedRef.current = true;

    if (machineId !== undefined) {
      for (const l of laundries) {
        const m = l.machines?.find(machine => machine.id === machineId);
        if (m) {
          setSelectedEntity({ type: 'machine', machine: m, laundry: l });
          return;
        }
      }
    } else if (laundryId !== undefined) {
      const l = laundries.find(laundry => laundry.id === laundryId);
      if (l) setSelectedEntity({ type: 'laundry', laundry: l });
    }
  }, [laundries, machineId, laundryId]);

  const entityCategory =
    selectedEntity === null ? 'general' :
    selectedEntity.type === 'laundry' ? 'laundry' :
    selectedEntity.machine.type;

  const subjectOptions: SelectorOption[] = (subjects ?? [])
    .filter(s => s.category === entityCategory)
    .map(s => ({ label: s.label, value: s.label }));

  const onScanForEntity = useCallback(() => {
    openScanner(raw => {
      const currentLaundries = laundriesRef.current;
      const result = parseQRCode(raw);

      if (result.type === 'laundry') {
        const laundry = currentLaundries.find(l => l.id === result.laundryId);
        if (laundry) {
          setSelectedEntity({ type: 'laundry', laundry });
          setValue('subject', '');
        } else {
          addMessage({ title: strings.laundryNotFoundTitle, body: strings.laundryNotFoundBody });
        }
      } else if (result.type === 'machine') {
        for (const l of currentLaundries) {
          const m = l.machines?.find(machine => machine.id === result.machineId);
          if (m) {
            setSelectedEntity({ type: 'machine', machine: m, laundry: l });
            setValue('subject', '');
            return;
          }
        }
        addMessage({ title: strings.machineNotFoundTitle, body: strings.machineNotFoundBody });
      } else {
        addMessage({ title: strings.qrUnrecognizedTitle, body: strings.qrUnrecognizedBody });
      }
    }, 'report');
  }, [openScanner, addMessage, setValue, strings]);

  const onClearEntity = useCallback(() => {
    setSelectedEntity(null);
    setValue('subject', '');
  }, [setValue]);

  const onSubmit = handleSubmit(async ({ subject, description }) => {
    try {
      const body: CreateReport = { subject, description };
      if (selectedEntity?.type === 'laundry') {
        body.laundryId = selectedEntity.laundry.id;
      } else if (selectedEntity?.type === 'machine') {
        body.machineId = selectedEntity.machine.id;
        body.laundryId = selectedEntity.laundry.id;
      }
      await mutateAsync(body);
      addMessage({ body: strings.submitSuccess as string });
      onSuccess();
    } catch {
      setError('root', { message: strings.submitError });
    }
  });

  const entityName =
    selectedEntity?.type === 'machine'
      ? `${selectedEntity.machine.name} — ${selectedEntity.laundry.name}`
      : selectedEntity?.laundry.name;

  const entityIconName: 'Wind' | 'Droplet' | 'MapPin' =
    selectedEntity?.type === 'machine' && selectedEntity.machine.type === 'dryer'
      ? 'Wind'
      : selectedEntity?.type === 'machine'
      ? 'Droplet'
      : 'MapPin';

  return {
    control,
    errors,
    isSubmitting,
    onSubmit,
    setValue,
    selectedEntity,
    entityName,
    entityIconName,
    subjectOptions,
    onScanForEntity,
    onClearEntity,
    scrollViewRef,
    handleDescriptionFocus,
    strings,
  };
};
