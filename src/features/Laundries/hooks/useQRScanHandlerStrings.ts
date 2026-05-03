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
    deeplinkUnrecognizedTitle: t('qr.deeplink.unrecognized.title'),
    deeplinkUnrecognizedBody: t('qr.deeplink.unrecognized.body'),
    unknownTitle: t('qr.unknown.title'),
    unknownBody: t('qr.unknown.body'),
  };
};
