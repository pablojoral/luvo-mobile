import { useTranslation } from 'react-i18next';

export const useScanQRHandlerStrings = () => {
  const { t } = useTranslation('common');

  return {
    deeplinkUnrecognizedTitle: t('qr.deeplink.unrecognized.title'),
    deeplinkUnrecognizedBody: t('qr.deeplink.unrecognized.body'),
    unknownTitle: t('qr.unknown.title'),
    unknownBody: t('qr.unknown.body'),
  };
};
