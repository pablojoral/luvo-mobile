import { useCallback, useState } from 'react';
import { SelectorOption } from 'components/PillSelector/PillSelector';

interface Options {
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
}

export const useSelectInput = ({ value, options, onChange }: Options) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(o => o.value === value)?.label;

  const toggle = useCallback(() => setIsOpen(v => !v), []);

  const select = useCallback((val: string) => {
    onChange(val);
    setIsOpen(false);
  }, [onChange]);

  return { isOpen, toggle, select, selectedLabel };
};
