import { useTranslation } from 'react-i18next';

export const useSettingsStrings = () => {
  const { t } = useTranslation('common');
  return {
    screenTitle:                   t('settings.title'),
    generalTitle:                  t('settings.general.title'),
    notificationsTitle:            t('settings.notifications.title'),
    darkModeLabel:                 t('settings.darkMode.label'),
    darkModeDescription:           t('settings.darkMode.description'),
    languageLabel:                 t('settings.language.label'),
    languageDescription:           t('settings.language.description'),
    endOfCycleLabel:               t('settings.endOfCycle.label'),
    endOfCycleDescription:         t('settings.endOfCycle.description'),
    promotionsLabel:               t('settings.promotions.label'),
    promotionsDescription:         t('settings.promotions.description'),
    maintenanceLabel:              t('settings.maintenance.label'),
    maintenanceDescription:        t('settings.maintenance.description'),
    notificationsDisabledTitle:    t('settings.notificationsDisabled.title'),
    notificationsDisabledBody:     t('settings.notificationsDisabled.body'),
  };
};
