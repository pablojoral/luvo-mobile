/**
 * Manual mock for react-native-reanimated.
 * Replaces the official mock (react-native-reanimated/mock) which chains into
 * react-native-worklets (ESM) and breaks Jest's CommonJS transform.
 */
const ReactNative = require('react-native');

const Animated = {
  View: ReactNative.View,
  Text: ReactNative.Text,
  Image: ReactNative.Image,
  ScrollView: ReactNative.ScrollView,
  FlatList: ReactNative.FlatList,
};

module.exports = {
  __esModule: true,
  default: Animated,

  // Hooks
  useSharedValue: (init) => ({ value: init }),
  useAnimatedStyle: () => ({}),
  useDerivedValue: (fn) => {
    try { return { value: fn() }; } catch { return { value: 0 }; }
  },
  useAnimatedScrollHandler: () => ({}),
  useAnimatedGestureHandler: () => ({}),

  // Animation functions
  withTiming: (toValue) => toValue,
  withSpring: (toValue) => toValue,
  withDecay: () => 0,
  withRepeat: (animation) => animation,
  withDelay: (_delay, animation) => animation,
  withSequence: (...animations) => animations[animations.length - 1],

  // Utilities
  interpolate: (_value, _inputRange, outputRange) => outputRange[0],
  Extrapolate: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
  Easing: {
    linear: (t) => t,
    ease: (t) => t,
    quad: (t) => t,
    cubic: (t) => t,
    out: (fn) => fn,
    in: (fn) => fn,
    inOut: (fn) => fn,
  },
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  cancelAnimation: () => {},
  makeMutable: (init) => ({ value: init }),
  createAnimatedComponent: (Component) => Component,

  // Entering / exiting animation descriptors — just empty objects
  FadeIn: {},
  FadeOut: {},
  SlideInDown: {},
  SlideOutDown: {},
  ZoomIn: {},
  ZoomOut: {},
};
