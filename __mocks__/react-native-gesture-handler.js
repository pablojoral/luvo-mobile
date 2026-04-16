/**
 * Manual mock for react-native-gesture-handler.
 * The native module setup chain breaks in Jest — this stub covers all exports used in the app.
 */
const { View, ScrollView, FlatList, TextInput, TouchableOpacity } = require('react-native');

const mockGestureBuilder = () => {
  const builder = {
    onBegin: function () { return this; },
    onUpdate: function () { return this; },
    onEnd: function () { return this; },
    onFinalize: function () { return this; },
    maxDistance: function () { return this; },
    maxDuration: function () { return this; },
    requireExternalGestureToFail: function () { return this; },
    simultaneousWithExternalGesture: function () { return this; },
    enabled: function () { return this; },
  };
  return builder;
};

module.exports = {
  // Root wrapper — just passes children through
  GestureHandlerRootView: View,

  // Gesture detector — just passes children through
  GestureDetector: ({ children }) => children,

  // Gesture factory
  Gesture: {
    Pan: mockGestureBuilder,
    Tap: mockGestureBuilder,
    LongPress: mockGestureBuilder,
    Pinch: mockGestureBuilder,
    Rotation: mockGestureBuilder,
    Fling: mockGestureBuilder,
    Simultaneous: () => ({}),
    Race: () => ({}),
    Exclusive: () => ({}),
  },

  // Legacy handlers
  PanGestureHandler: View,
  TapGestureHandler: View,
  LongPressGestureHandler: View,
  PinchGestureHandler: View,
  RotationGestureHandler: View,

  // Touchables
  TouchableOpacity,
  TouchableHighlight: TouchableOpacity,
  TouchableNativeFeedback: TouchableOpacity,
  TouchableWithoutFeedback: View,

  // Scrollables
  ScrollView,
  FlatList,
  TextInput,

  // Constants
  State: { UNDETERMINED: 0, BEGAN: 2, ACTIVE: 4, END: 5, FAILED: 1, CANCELLED: 3 },
  Directions: { RIGHT: 1, LEFT: 2, UP: 4, DOWN: 8 },
};
