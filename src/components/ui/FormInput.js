import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export default function FormInput({ label, value, onChangeText, placeholder, keyboardType, maxLength }) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.warm[400]}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: fontWeights.medium,
    color: colors.warm[700],
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.warm[50],
    borderWidth: 1,
    borderColor: colors.warm[150],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    height: spacing['5xl'], // alto fijo: evita que Android "salte" al recalcular la métrica de fuente al tipear
    textAlignVertical: 'center', // no-op en iOS, centra el texto en Android dentro del alto fijo
    includeFontPadding: false, // Android: saca el padding extra de fuente que causa el salto de tamaño
    ...typography.bodyMedium,
    color: colors.warm[900],
  },
});
