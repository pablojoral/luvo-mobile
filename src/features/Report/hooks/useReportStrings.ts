import { useTranslation } from 'react-i18next';
import type { SelectedEntity } from './useReportForm';

export const useReportStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:                     t('report.title'),
    entitySectionLabel:        t('report.entitySection.label'),
    entitySectionScanHint:     t('report.entitySection.scanHint'),
    entitySectionScan:         t('report.entitySection.scan'),
    entityTypeLabel:           (type: SelectedEntity['type']) =>
      type === 'laundry' ? t('report.entityType.laundry') : t('report.entityType.machine'),
    subjectLabel:              t('report.subject.label'),
    subjectPlaceholder:        t('report.subject.placeholder'),
    subjectRequired:           t('report.errors.subjectRequired'),
    descriptionLabel:          t('report.description.label'),
    descriptionPlaceholder:    t('report.description.placeholder'),
    descriptionRequired:       t('report.errors.descriptionRequired'),
    submit:                    t('report.submit'),
    submitError:               t('report.submitError'),
    submitSuccess:             t('report.submitSuccess'),
    laundryNotFoundTitle:      t('report.messages.laundryNotFound.title'),
    laundryNotFoundBody:       t('report.messages.laundryNotFound.body'),
    machineNotFoundTitle:      t('report.messages.machineNotFound.title'),
    machineNotFoundBody:       t('report.messages.machineNotFound.body'),
    qrUnrecognizedTitle:       t('report.messages.qrUnrecognized.title'),
    qrUnrecognizedBody:        t('report.messages.qrUnrecognized.body'),
  };
};
