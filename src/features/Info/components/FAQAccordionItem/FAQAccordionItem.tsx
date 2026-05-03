import { Text } from 'components/Text/Text';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Animated, TouchableOpacity, View } from 'react-native';
import type { FAQItem } from 'services/api/services/ContentService';
import { useInfoTheme } from '../../theme/useInfoTheme';
import { useFAQAccordionItem } from './hooks/useFAQAccordionItem';

interface FAQAccordionItemProps {
  item: FAQItem;
}

export const FAQAccordionItem = ({ item }: FAQAccordionItemProps) => {
  const { styles } = useInfoTheme();
  const { heightAnim, rotate, toggle, bodyHeight, onMeasure } = useFAQAccordionItem();

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggle} activeOpacity={0.7}>
        <Text fontWeight="semibold" style={styles.faqQuestion}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <SvgIcon name="ChevronRight" size="icon-size-sm" color="font-primary" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.accordionBodyAnimated, { height: heightAnim }]}>
        <View style={styles.accordionBody}>
          <Text fontSize="font-size-sm" color="font-placeholder" lineHeight="line-height-lg">{item.answer}</Text>
        </View>
      </Animated.View>

      {bodyHeight === 0 && (
        <View onLayout={onMeasure} style={styles.accordionBodyGhost} pointerEvents="none">
          <Text fontSize="font-size-sm" color="font-placeholder" lineHeight="line-height-lg">{item.answer}</Text>
        </View>
      )}
    </View>
  );
};
