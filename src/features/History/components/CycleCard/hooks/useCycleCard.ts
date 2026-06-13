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
  const { i18n, t } = useTranslation('common');

  const { icon, formattedAmount, subtitle, machineLabel } = useMemo(() => {
    const date = formatDate(item.createdAt, i18n.language, { day: 'numeric', month: 'short' });
    const time = formatTime(item.createdAt, i18n.language);
    const typeLabel = t(`machines.type.${item.machineType}` as `machines.type.${typeof item.machineType}`);
    return {
      icon: (item.machineType === 'washing_machine' ? 'Droplet' : 'Wind') as IconName,
      formattedAmount: formatAmount(item.amount, item.currency, i18n.language),
      subtitle: `${item.laundryName} · ${date} · ${time}`,
      machineLabel: `${typeLabel} #${item.machineNumber}`,
    };
  }, [item, i18n.language, t]);

  return {
    icon,
    formattedAmount,
    subtitle,
    machineLabel,
    machineType: item.machineType,
  };
};
