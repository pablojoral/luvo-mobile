import { useEffect, useState } from 'react';
import { useTimeTagStrings } from './useTimeTagStrings';

function formatSeconds(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

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

  const time = formatSeconds(remaining);
  const displayTime = extended ? `${endsIn} ${time}` : time;

  return { displayTime };
};
