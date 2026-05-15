import { Button, StepIndicator, Text } from '@luvo/ui';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useMessagesModal } from './hooks/useMessagesModal';
import { useMessagesModalTheme } from './theme/useMessagesModalTheme';
import { useMessagesOverlayAnimation } from './theme/useMessagesOverlayAnimation';
import { useMessageTransition } from './theme/useMessageTransition';

export const MessagesModal = () => {
  const { styles } = useMessagesModalTheme();
  const { message, messages, currentIndex, visible, isFirst, isLast, next, prev, dismiss, backLabel, nextLabel, understoodLabel } = useMessagesModal();
  const { overlayAnimStyle, handleDismiss } = useMessagesOverlayAnimation(visible, dismiss);
  const { handleNext, handlePrev, contentAnimStyle } = useMessageTransition(next, prev);

  return (
    <Animated.View style={[styles.overlay, overlayAnimStyle]} pointerEvents={visible ? 'auto' : 'none'}>
      <View style={styles.card}>
        <View style={styles.transitionContent}>
          <StepIndicator total={messages.length} current={currentIndex} />
          <Animated.View style={[styles.textContainer, contentAnimStyle]}>
            {message?.title ? (
              <Text fontSize="font-size-lg" fontWeight="semibold" color="font-primary">
                {message.title}
              </Text>
            ) : null}
            <Text fontSize="font-size-md" color="font-placeholder">
              {message?.body}
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.actionsRow, contentAnimStyle]}>
          {!isFirst && <Button label={backLabel} variant="primary" size="sm" onPress={handlePrev} />}
          {isLast ? (
            <Button
              label={understoodLabel}
              variant="primary"
              size="sm"
              onPress={handleDismiss}
              style={isFirst ? styles.actionEnd : undefined}
            />
          ) : (
            <Button
              label={nextLabel}
              variant="primary"
              size="sm"
              onPress={handleNext}
              style={isFirst ? styles.actionEnd : undefined}
            />
          )}
        </Animated.View>
      </View>
    </Animated.View>
  );
};
