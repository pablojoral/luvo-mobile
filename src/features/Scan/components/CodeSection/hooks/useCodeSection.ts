import { useForm } from 'react-hook-form';
import { useScanStrings } from 'features/Scan/hooks/useScanStrings';

interface CodeFormValues {
  code: string;
}

export const useCodeSection = (onSubmit: (code: string) => void) => {
  const strings = useScanStrings();
  const { control, handleSubmit, formState: { isValid } } = useForm<CodeFormValues>({
    defaultValues: { code: '' },
    mode: 'onChange',
  });

  return {
    control,
    onSubmit: handleSubmit(({ code }) => onSubmit(code)),
    isSubmittable: isValid,
    label: strings.codeLabel,
    subtitle: strings.codeSubtitle,
    submitLabel: strings.codeSubmit,
  };
};
