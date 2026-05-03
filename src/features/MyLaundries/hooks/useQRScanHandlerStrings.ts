import { useTranslation } from 'react-i18next';

export const useQRScanHandlerStrings = () => {
  const { t } = useTranslation('common');

  return {
    alreadyHasAccessTitle: t('qr.alreadyHasAccess.title'),
    alreadyHasAccessBody: t('qr.alreadyHasAccess.body'),
    registeredTitle: t('qr.registered.title'),
    registeredBody: t('qr.registered.body'),
    invalidCodeTitle: t('qr.invalidCode.title'),
    invalidCodeBody: t('qr.invalidCode.body'),
    privateLaundryTitle: t('qr.privateLaundry.title'),
    privateLaundryBody: t('qr.privateLaundry.body'),
    alreadyAddedBody: t('qr.alreadyAdded.body'),
    addedTitle: t('qr.added.title'),
    addedBody: t('qr.added.body'),
    addFailedTitle: t('qr.addFailed.title'),
    addFailedBody: t('qr.addFailed.body'),
    deeplinkUnrecognizedTitle: t('qr.deeplink.unrecognized.title'),
    deeplinkUnrecognizedBody: t('qr.deeplink.unrecognized.body'),
    unknownTitle: t('qr.unknown.title'),
    unknownBody: t('qr.unknown.body'),
  };
};
