import { CoinCost, Program } from 'models/models';
import { useProgramCardStrings } from './useProgramCardStrings';

interface UseProgramCardParams {
  program:   Program;
  coinCosts: CoinCost[];
}

export function useProgramCard({ program, coinCosts }: UseProgramCardParams) {
  const strings = useProgramCardStrings();

  const cost  = coinCosts.find(c => c.currency === 'UYU') ?? coinCosts[0];
  const price = cost ? `$${program.coins * cost.coinValue}` : null;

  const minutes  = Math.round(program.durationSeconds / 60);
  const subtitle = [strings.coins(program.coins), ...(price ? [price] : []), `${minutes} min`].join(' · ');

  return { label: program.name, subtitle };
}
