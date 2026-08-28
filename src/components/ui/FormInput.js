import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export default function FormInput({ label, value, onChangeText, placeholder, keyboardType, maxLength, error }) {
  const hasValue = Boolean(value);

  let borderColor = colors.warm[150]; // inactivo (sin escribir)
  if (error) {
    borderColor = colors.red[500]; // incompleto / con error
  } else if (hasValue) {
    borderColor = colors.primary[500]; // activo (ya se escribió algo)
  }

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { borderColor }]}
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
    backgroundColor: colors.warm[100],
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    height: spacing['5xl'], // alto fijo: evita que Android "salte" al recalcular la métrica de fuente al tipear
    textAlignVertical: 'center', // no-op en iOS, centra el texto en Android dentro del alto fijo
    includeFontPadding: false, // Android: saca el padding extra de fuente que causa el salto de tamaño
    ...typography.bodyMedium,
    color: colors.warm[900],
  },
});
