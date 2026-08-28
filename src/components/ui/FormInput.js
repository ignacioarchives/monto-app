import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

// `icon` (opcional): elemento a mostrar a la derecha, adentro del mismo recuadro
// (ej. el ícono de calendario en el campo "Empieza").
// `suffix` (opcional): texto fijo que se completa después de lo escrito, en el mismo
// renglón (ej. "29" + " de agosto"). No es editable, es solo visual.
export default function FormInput({ label, value, onChangeText, placeholder, keyboardType, maxLength, error, icon, suffix }) {
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
      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={[styles.input, suffix ? styles.inputNarrow : styles.inputFlex]}
          placeholder={placeholder}
          placeholderTextColor={colors.warm[400]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
        />
        {suffix ? (
          <>
            <Text style={styles.suffixText}>{suffix}</Text>
            <View style={styles.spacer} />
          </>
        ) : null}
        {icon}
      </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warm[100],
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    height: spacing['5xl'], // alto fijo: evita que Android "salte" al recalcular la métrica de fuente al tipear
  },
  input: {
    textAlignVertical: 'center', // no-op en iOS, centra el texto en Android dentro del alto fijo
    includeFontPadding: false, // Android: saca el padding extra de fuente que causa el salto de tamaño
    ...typography.bodyMedium,
    color: colors.warm[900],
  },
  inputFlex: {
    flex: 1,
  },
  inputNarrow: {
    width: 28, // ancho justo para 1-2 dígitos, el resto de la fila lo ocupa el suffix
  },
  suffixText: {
    includeFontPadding: false, // mismo ajuste que el input, para que ambos alineen a la misma altura
    ...typography.bodyMedium,
    color: colors.warm[900],
  },
  spacer: {
    flex: 1,
  },
});
