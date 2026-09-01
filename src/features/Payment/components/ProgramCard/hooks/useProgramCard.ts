import { useTranslation } from 'react-i18next';
import { CoinCost, Program } from 'models/models';

interface UseProgramCardParams {
  program:   Program;
  coinCosts: CoinCost[];
}

export function useProgramCard({ program, coinCosts }: UseProgramCardParams) {
  const { t } = useTranslation('common');

  const cost  = coinCosts.find(c => c.currency === 'UYU') ?? coinCosts[0];
  const price = cost ? `$${program.coins * cost.coinValue}` : null;

  const minutes  = Math.round(program.durationSeconds / 60);
  const subtitle = [...(price ? [price] : []), `${minutes} min`].join(' · ');

  const label = program.nameKey
    ? t(`programs.${program.nameKey}`, { defaultValue: program.name })
    : program.name;

  return { label, subtitle };
}
