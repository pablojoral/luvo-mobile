// Surface themes
export interface SpacingTheme {
  'spacing-none': number;
  'spacing-xxxs': number;
  'spacing-xxs': number;
  'spacing-xs': number;
  'spacing-sm': number;
  'spacing-md': number;
  'spacing-lg': number;
  'spacing-xl': number;
  'spacing-xxl': number;
  'spacing-xxxl': number;
  'spacing-xxxxl': number;
  'spacing-max': number;
}

export interface SurfaceColorTheme {
  'surface-primary': string;
  'surface-secondary': string;
  'surface-tertiary': string;
  'surface-background': string;
  'surface-surface': string;
  'surface-disabled': string;
  'surface-invert': string;
  'surface-transparent': string;
  'surface-success': string;
  'surface-error': string;
  'surface-warning': string;
}

export interface ShadowBoxTheme {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export type ShadowCardTheme = ShadowBoxTheme;
export type ShadowFloatingTheme = ShadowBoxTheme;
export type ShadowBottomNavTheme = ShadowBoxTheme;

export interface FontFamilyTheme {
  poppins: string;
}

// Border themes
export interface BorderWidthTheme {
  'border-width-none': number;
  'border-width-xs': number;
  'border-width-sm': number;
  'border-width-md': number;
  'border-width-lg': number;
  'border-width-xl': number;
  'border-width-xxl': number;
  'border-width-xxxl': number;
}

export interface CornerRadTheme {
  'corner-rad-none': number;
  'corner-rad-sm': number;
  'corner-rad-md': number;
  'corner-rad-lg': number;
  'corner-rad-xl': number;
  'corner-rad-xxl': number;
  'corner-rad-xxxl': number;
  'corner-rad-full': number;
}

export interface BorderColorTheme {
  'border-primary': string;
  'border-secondary': string;
  'border-disabled': string;
  'border-placeholder': string;
  'border-invert': string;
  'border-error': string;
  'border-transparent': string;
}

export interface IconSizeTheme {
  'icon-size-xs': number;
  'icon-size-sm': number;
  'icon-size-md': number;
  'icon-size-lg': number;
  'icon-size-xl': number;
  'icon-size-xxl': number;
  'icon-size-xxxl': number;
}

// Font themes
export interface FontSizeTheme {
  'font-size-xs': number;
  'font-size-sm': number;
  'font-size-md': number;
  'font-size-lg': number;
  'font-size-xl': number;
  'font-size-xxl': number;
  'font-size-xxxl': number;
  'font-size-xxxxl': number;
}

export interface FontWeightTheme {
  light: '300' | '400' | '500' | '600' | '700' | '800';
  regular: '300' | '400' | '500' | '600' | '700' | '800';
  medium: '300' | '400' | '500' | '600' | '700' | '800';
  semibold: '300' | '400' | '500' | '600' | '700' | '800';
  bold: '300' | '400' | '500' | '600' | '700' | '800';
  extrabold: '300' | '400' | '500' | '600' | '700' | '800';
}

export interface LineHeightTheme {
  'line-height-xs': number;
  'line-height-sm': number;
  'line-height-md': number;
  'line-height-lg': number;
  'line-height-xl': number;
  'line-height-xxl': number;
  'line-height-xxxl': number;
}

export interface FontColorTheme {
  'font-primary': string;
  'font-secondary': string;
  'font-highlight': string;
  'font-light': string;
  'font-disabled': string;
  'font-placeholder': string;
  'font-invert': string;
  'font-success': string;
  'font-error': string;
  'font-warning': string;
}

export interface LetterSpacingTheme {
  label: number;
}

export interface ComponentSizeTheme {
  fab: number;
  iconContainer: number;
  cardMaxWidth: number;
  descriptionInput: number;
  laundryImage: number;
}

export interface ZIndexTheme {
  overlay: number;
  background: number;
  camera: number;
}

export interface OverlayColorTheme {
  modal: string;
  dimmer: string;
  backdrop: string;
}

export interface ThemeConstants {
  navBarHeight: number;
  spacing: SpacingTheme;
  surfaceColor: SurfaceColorTheme;
  shadowBox: ShadowBoxTheme;
  shadowCard: ShadowCardTheme;
  shadowFloating: ShadowFloatingTheme;
  shadowBottomNav: ShadowBottomNavTheme;

  fontFamily: FontFamilyTheme;
  fontSize: FontSizeTheme;
  fontWeight: FontWeightTheme;
  lineHeight: LineHeightTheme;
  fontColor: FontColorTheme;
  letterSpacing: LetterSpacingTheme;

  borderWidth: BorderWidthTheme;
  cornerRad: CornerRadTheme;
  borderColor: BorderColorTheme;
  iconSize: IconSizeTheme;

  componentSize: ComponentSizeTheme;
  zIndex: ZIndexTheme;
  overlayColor: OverlayColorTheme;

  navigation: ReactNavigation.Theme;
}

export interface Theme extends ThemeConstants {
  topInset: number;
  bottomInset: number;
}

export type Spacing = keyof SpacingTheme;
export type SurfaceColor = keyof SurfaceColorTheme;
export type ShadowBox = keyof ShadowBoxTheme;
export type FontFamily = keyof FontFamilyTheme;

export type BorderWidth = keyof BorderWidthTheme;
export type CornerRad = keyof CornerRadTheme;
export type BorderColor = keyof BorderColorTheme;

export type FontSize = keyof FontSizeTheme;
export type FontWeight = keyof FontWeightTheme;
export type LineHeight = keyof LineHeightTheme;
export type FontColor = keyof FontColorTheme;

export type IconSize = keyof IconSizeTheme;

export type ButtonSize = 'xs' | 'sm' | 'md' | 'xl';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';

export type TagVariant = 'primary' | 'secondary' | 'disabled';
