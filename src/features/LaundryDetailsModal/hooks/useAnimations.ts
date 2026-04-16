import { useCallback, useEffect, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

const CONTENT_PREVIEW_HEIGHT = 148;
const DISMISS_THRESHOLD      = CONTENT_PREVIEW_HEIGHT * 0.5;
const SPRING                 = { damping: 18, stiffness: 180, mass: 0.9 };
const FADE_MS                = 60;
const DISMISS_MS             = 180;

export const useAnimations = (visible: boolean, onDismiss: () => void) => {
  const { height: screenH } = useWindowDimensions();

  const SNAP_COLLAPSED = CONTENT_PREVIEW_HEIGHT;
  const SNAP_EXPANDED  = Math.min(screenH * 0.78, 640);

  const sheetH = useSharedValue(SNAP_COLLAPSED);
  const startH = useSharedValue(SNAP_COLLAPSED);
  const vis    = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    vis.value = withTiming(visible ? 1 : 0, { duration: FADE_MS });
    if (visible) {
      sheetH.value = withTiming(SNAP_COLLAPSED, { duration: FADE_MS });
    } else {
      sheetH.value = withTiming(0, { duration: FADE_MS });
    }
  }, [visible, vis, sheetH, SNAP_COLLAPSED]);

  // 0 → collapsed, 1 → expanded
  const progress = useDerivedValue(() => {
    const clamped = Math.max(SNAP_COLLAPSED, Math.min(SNAP_EXPANDED, Math.max(0, sheetH.value)));
    return (clamped - SNAP_COLLAPSED) / (SNAP_EXPANDED - SNAP_COLLAPSED);
  });

  const toggle = useCallback(() => {
    const isExpanded = Math.abs(sheetH.value - SNAP_EXPANDED) < 2;
    sheetH.value = withSpring(isExpanded ? SNAP_COLLAPSED : SNAP_EXPANDED, SPRING);
  }, [sheetH, SNAP_COLLAPSED, SNAP_EXPANDED]);

  const pan = useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        startH.value = sheetH.value;
      })
      .onUpdate(e => {
        if (vis.value < 0.5) return;
        const next = startH.value - e.translationY;
        sheetH.value = Math.max(0, Math.min(SNAP_EXPANDED, next));
      })
      .onEnd(e => {
        if (vis.value < 0.5) return;

        const atOrNearCollapsed = sheetH.value <= SNAP_COLLAPSED + 20;
        const fastDown          = e.velocityY > 600;
        const belowThreshold    = sheetH.value < DISMISS_THRESHOLD;

        if (belowThreshold || (fastDown && atOrNearCollapsed)) {
          sheetH.value = withTiming(0, { duration: DISMISS_MS }, () => {
            runOnJS(onDismiss)();
          });
          return;
        }

        const midpoint    = (SNAP_COLLAPSED + SNAP_EXPANDED) / 2;
        const goingUpFast = e.velocityY < -600;

        let target = sheetH.value >= midpoint ? SNAP_EXPANDED : SNAP_COLLAPSED;
        if (goingUpFast) target = SNAP_EXPANDED;
        if (fastDown)    target = SNAP_COLLAPSED;

        sheetH.value = withSpring(target, SPRING);
      });
  }, [SNAP_COLLAPSED, SNAP_EXPANDED, startH, sheetH, vis, onDismiss]);

  const tapHeader = useMemo(() => {
    const tap = Gesture.Tap()
      .maxDistance(6)
      .maxDuration(220)
      .onEnd(() => runOnJS(toggle)());
    tap.requireExternalGestureToFail(pan);
    return tap;
  }, [pan, toggle]);

  const containerAStyle = useAnimatedStyle(() => ({
    height:  vis.value * sheetH.value,
    opacity: vis.value,
  }));

  const listAStyle = useAnimatedStyle(() => {
    const listOpacity   = interpolate(progress.value, [0, 0.15], [0, 1], Extrapolate.CLAMP);
    const maxListHeight = SNAP_EXPANDED - CONTENT_PREVIEW_HEIGHT;
    const h             = interpolate(progress.value, [0, 1], [0, maxListHeight], Extrapolate.CLAMP);
    return { height: h, opacity: withTiming(listOpacity, { duration: FADE_MS }) };
  });

  return { pan, tapHeader, containerAStyle, listAStyle, SNAP_COLLAPSED, SNAP_EXPANDED };
};
