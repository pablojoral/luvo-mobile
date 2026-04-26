import { useTranslation } from 'react-i18next';
import type { HistoryItem } from 'services/api/services/HistoryService';
import type { IconName } from 'components/SvgIcon/types';
import { formatAmount } from 'utils/History/formatHistoryItem';

interface UseCycleCardProps {
  item: HistoryItem;
}

export const useCycleCard = ({ item }: UseCycleCardProps) => {
  const { t, i18n } = useTranslation('common');

  const icon: IconName = item.machineType === 'washing_machine' ? 'Droplet' : 'Wind';
  const formattedAmount = formatAmount(item.amount, item.currency);
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(item.createdAt));
  const sharedBillingLabel = t('history.cycleCard.sharedBilling');

  return {
    icon,
    formattedAmount,
    formattedDate,
    sharedBillingLabel,
    machineName: item.machineName,
    laundryName: item.laundryName,
    isShared: item.isShared,
  };
};
