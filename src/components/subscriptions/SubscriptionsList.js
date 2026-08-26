import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import TagBadge from '../ui/TagBadge';
import SubscriptionCard from './SubscriptionCard';

export default function SubscriptionsList({ tags, selectedTag, onSelectTag, filteredSubscriptions }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsRow}
      >
        {tags.map((tag) => (
          <TagBadge
            key={tag}
            label={tag}
            selected={tag === selectedTag}
            onPress={() => onSelectTag(tag)}
          />
        ))}
      </ScrollView>

      <View style={styles.cardsList}>
        {filteredSubscriptions.length === 0 ? (
          <Text style={styles.emptyText}>No tenés suscripciones en esta categoría</Text>
        ) : (
          filteredSubscriptions.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing['2xl'], // 24, mismo criterio que el resto de las secciones de la pantalla
  },
  tagsRow: {
    paddingHorizontal: spacing['2xl'],
  },
  cardsList: {
    paddingHorizontal: spacing['2xl'],
    marginTop: spacing.lg, // 16
    gap: spacing.lg, // 16, mismo gap que NextPaymentSection
  },
  emptyText: {
    ...typography.bodyMedium,
    color: semanticColors.text.secondary,
  },
});
