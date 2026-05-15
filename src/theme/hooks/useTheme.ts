// useTheme and ThemeConstants now live in @luvo/ui.
// This shim preserves the existing import path `theme/hooks/useTheme` for all
// consumers using the module-resolver alias — no import rewrites needed.
export { useTheme } from '@luvo/ui';
export type { ThemeConstants } from '@luvo/ui';
