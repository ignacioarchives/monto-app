import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

// Modal genérico "card-in-card": un wrapper externo tipo marco (colors.warm[25])
// que contiene una card blanca interna con el contenido real. Pensado para
// reusarse en distintos flujos del proyecto (ej. agregar suscripción, detalle
// de categoría) pasando el contenido como children (o prop `content`).
export default function NestedCardModal({
  visible,
  onClose,
  title,
  showCloseButton = true,
  children,
  content,
}) {
  const hasHeader = Boolean(title) || showCloseButton;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.outerCard}>
          {hasHeader && (
            <View style={styles.header}>
              {title ? <Text style={styles.title}>{title}</Text> : <View style={styles.headerSpacer} />}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
                  <X weight="bold" size={18} color={semanticColors.text.secondary} />
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles.innerCard}>
            {children ?? content}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // rgba equivalente a colors.warm[900] al 60% de opacidad (no hay helper hex->rgba en el theme)
    backgroundColor: 'rgba(28, 25, 23, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  outerCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.warm[25],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.warm[200],
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerSpacer: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: semanticColors.text.primary,
    flex: 1,
  },
  closeButton: {
    width: spacing['3xl'], // 32, mismo patrón que el closeButton de AddSubscriptionModal/CalendarSection
    height: spacing['3xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.warm[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCard: {
    backgroundColor: colors.warm[0],
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
  },
});
