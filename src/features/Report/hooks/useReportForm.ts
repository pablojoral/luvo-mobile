import { SelectorOption } from 'components/PillSelector/PillSelector';
import { CreateReport, Laundry, Machine } from 'models/models';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useReportSubjects } from 'query/ReportSubject/useReportSubjects';
import { useSubmitReport } from 'query/Report/useSubmitReport';
import { useQRScanner } from 'stores/useQRScanner';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';

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
  const { t } = useTranslation('common');
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

  // Initialize entity from route params once the laundries store is populated
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
          addMessage({ title: t('report.messages.laundryNotFound.title'), body: t('report.messages.laundryNotFound.body') });
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
        addMessage({ title: t('report.messages.machineNotFound.title'), body: t('report.messages.machineNotFound.body') });
      } else {
        addMessage({ title: t('report.messages.qrUnrecognized.title'), body: t('report.messages.qrUnrecognized.body') });
      }
    });
  }, [openScanner, addMessage, setValue, t]);

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
      onSuccess();
    } catch {
      setError('root', { message: t('report.submitError') });
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
    strings: {
      title: t('report.title'),
      entitySectionLabel: t('report.entitySection.label'),
      entitySectionScan: t('report.entitySection.scan'),
      entityTypeLabel: (type: SelectedEntity['type']) =>
        type === 'laundry' ? t('report.entityType.laundry') : t('report.entityType.machine'),
      subjectLabel: t('report.subject.label'),
      subjectPlaceholder: t('report.subject.placeholder'),
      subjectRequired: t('report.errors.subjectRequired'),
      descriptionLabel: t('report.description.label'),
      descriptionPlaceholder: t('report.description.placeholder'),
      descriptionRequired: t('report.errors.descriptionRequired'),
      submit: t('report.submit'),
    },
  };
};
