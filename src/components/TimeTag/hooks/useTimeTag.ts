import { useEffect, useState } from 'react';
import { formatHHMMSS } from 'utils/formatTime';
import { useTimeTagStrings } from './useTimeTagStrings';

export const useTimeTag = (seconds: number, extended = false) => {
  const { endsIn } = useTimeTagStrings();
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  const time = formatHHMMSS(remaining);
  const displayTime = extended ? `${endsIn} ${time}` : time;

  return { displayTime };
};
