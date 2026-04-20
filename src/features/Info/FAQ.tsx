import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { useRef, useState } from 'react';
import { Animated, FlatList, LayoutChangeEvent, TouchableOpacity, View } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFAQ } from 'query/Content/useFAQ';
import type { FAQItem } from 'services/api/services/ContentService';

import { useInfoTheme } from './theme/useInfoTheme';

const FAQAccordionItem = ({ item }: { item: FAQItem }) => {
  const { styles } = useInfoTheme();
  const [open, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const onMeasure = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && bodyHeight === 0) setBodyHeight(h);
  };

  const toggle = () => {
    Animated.parallel([
      Animated.timing(rotation, {
        toValue: open ? 0 : 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: open ? 0 : bodyHeight,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
    setOpen(prev => !prev);
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggle} activeOpacity={0.7}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <SvgIcon name="ChevronRight" size="font-size-lg" color="font-secondary" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.accordionBodyAnimated, { height: heightAnim }]}>
        <View style={styles.accordionBody}>
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        </View>
      </Animated.View>

      {/* Ghost: measures natural height outside the height-constrained container */}
      {bodyHeight === 0 && (
        <View onLayout={onMeasure} style={styles.accordionBodyGhost} pointerEvents="none">
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

export const FAQ = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useInfoTheme();
  const { data: items, isLoading, error } = useFAQ();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Preguntas frecuentes"
        onBack={() => navigation.goBack()}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text color="font-error">
            No se pudo cargar el contenido. Intentá de nuevo.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <FAQAccordionItem item={item} />}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        />
      )}
    </View>
  );
};
