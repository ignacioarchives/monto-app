import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { SORT_OPTIONS } from '../../hooks/useSubscriptionsScreen';

export default function SortMenu({ visible, anchor, selectedOption, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.menuWrapper, anchor && { top: anchor.top, right: anchor.right }]}>
          <BlurView
            intensity={80}
            tint="light"
            experimentalBlurMethod="dimezisBlurView"
            style={styles.menu}
          >
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.key === selectedOption;
              return (
                <Pressable
                  key={option.key}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: isSelected }}
                  style={({ pressed }) => [
                    styles.option,
                    isSelected && styles.optionSelected,
                    pressed && styles.optionPressed,
                  ]}
                  onPress={() => {
                    onSelect(option.key);
                    onClose();
                  }}
                >
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </BlurView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menuWrapper: {
    position: 'absolute',
  },
  menu: {
    width: 220,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.xs,
    overflow: 'hidden', // recorta el blur y el highlight al borderRadius
    shadowColor: colors.warm[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  optionSelected: {
    backgroundColor: colors.warm[150], // pill que marca el activo, no un color deshabilitado
  },
  optionPressed: {
    backgroundColor: colors.warm[35],
  },
  optionLabel: {
    ...typography.bodyMedium,
    color: semanticColors.text.primary,
  },
  optionLabelSelected: {
    fontWeight: fontWeights.semibold,
  },
});
