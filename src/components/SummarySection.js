import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function SummarySection() {
  return (
    <View style={styles.container}>
      
      {/* ===== TARJETA 1: AZUL (IZQUIERDA) ===== */}
      <View style={styles.cardBlue}>
        <Text style={styles.topLabelBlue}>Más costosa</Text>
        <View style={styles.bottomGroupBlue}>
          <Text style={styles.amountBlue}>Claude: $24.500</Text>
        </View>
      </View>

      {/* ===== TARJETA 2: BLANCA (DERECHA) ===== */}
      <View style={styles.cardWhite}>
        <Text style={styles.topLabelWhite}>Total al mes</Text>
        
        <View style={styles.bottomGroupWhite}>
          <Text style={styles.amountWhite}>$120.000</Text>
          <Text style={styles.subtextWhite}>12 Suscripciones</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
  },

  /* ===== ESTILOS TARJETA AZUL ===== */
  cardBlue: {
    flex: 1,
    backgroundColor: colors.primary, // #2563EB
    borderRadius: 20,
    padding: 16,
    height: 130,
    justifyContent: 'flex-start',
  },
  topLabelBlue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  bottomGroupBlue: {
    marginTop: 12, // 👈 Ajustá este número (ej: 16, 20) si querés separar más "Más costosa" de "Claude"
    gap: 2,        // Espacio bien cerquita entre "Claude" y "$24.500"
  },
  titleBlue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  amountBlue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* ===== ESTILOS TARJETA BLANCA ===== */
  cardWhite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.cardBorder, // #E2E8F0
    padding: 16,
    height: 130,
    justifyContent: 'flex-start',
  },
  topLabelWhite: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  bottomGroupWhite: {
    marginTop: 12, // Misma separación vertical que la tarjeta azul
    gap: 2,        // Espacio cerquita entre "$120.000" y "12 Suscripciones"
  },
  amountWhite: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary, // Número resaltado en Azul
  },
  subtextWhite: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});