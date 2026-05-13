import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { HistoryItem } from 'services/api/services/HistoryService';
import type { SvgIconProps } from '@luvo/ui';
import { formatAmount, formatDate, formatTime } from 'utils/History/formatHistoryItem';

type IconName = SvgIconProps['name'];

interface UseCycleCardProps {
  item: HistoryItem;
}

export const useCycleCard = ({ item }: UseCycleCardProps) => {
  const { i18n } = useTranslation('common');

  const { icon, formattedAmount, subtitle } = useMemo(() => {
    const date = formatDate(item.createdAt, i18n.language, { day: 'numeric', month: 'short' });
    const time = formatTime(item.createdAt, i18n.language);
    return {
      icon: (item.machineType === 'washing_machine' ? 'Droplet' : 'Wind') as IconName,
      formattedAmount: formatAmount(item.amount, item.currency, i18n.language),
      subtitle: `${item.laundryName} · ${date} · ${time}`,
    };
  }, [item, i18n.language]);

  return {
    icon,
    formattedAmount,
    subtitle,
    machineName: item.machineName,
    machineType: item.machineType,
  };
};
