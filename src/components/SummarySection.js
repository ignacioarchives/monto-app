import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { useSubscriptions } from '../context/SubscriptionContext';

// Helper para obtener el nombre del mes actual en español
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function SummarySection() {
  const { subscriptions } = useSubscriptions();

  // 1. Lógica para la tarjeta azul (Suscripción más costosa)
  let mostExpensiveName = 'Sin datos';
  let mostExpensivePrice = '';

  if (subscriptions.length > 0) {
    const mostExpensive = subscriptions.reduce((max, sub) => {
      return (Number(sub.price) || 0) > (Number(max.price) || 0) ? sub : max;
    }, subscriptions[0]);

    if (mostExpensive && mostExpensive.name) {
      mostExpensiveName = mostExpensive.name;
      mostExpensivePrice = `$${Number(mostExpensive.price).toLocaleString('es-AR')}`;
    }
  }

  // 2. Lógica para la tarjeta blanca (Total del mes)
  const totalAmount = subscriptions.reduce((sum, sub) => {
    return sum + (Number(sub.price) || 0);
  }, 0);

  const formattedTotal = `$${totalAmount.toLocaleString('es-AR')}`;
  const currentMonthName = monthNames[new Date().getMonth()];

  return (
    <View style={styles.container}>
      
      {/* ===== TARJETA 1: AZUL (IZQUIERDA) ===== */}
      <View style={styles.cardBlue}>
        <Text style={styles.topLabelBlue}>Más costosa</Text>
        <View style={styles.bottomGroupBlue}>
          <Text style={styles.appNameBlue} numberOfLines={1}>
            {mostExpensiveName}
          </Text>
          <Text style={styles.amountBlue} numberOfLines={1}>
            {mostExpensivePrice}
          </Text>
        </View>
      </View>

      {/* ===== TARJETA 2: BLANCA (DERECHA) ===== */}
      <View style={styles.cardWhite}>
        <Text style={styles.topLabelWhite}>Total del mes</Text>
        <View style={styles.bottomGroupWhite}>
          <Text style={styles.monthWhite} numberOfLines={1}>
            {currentMonthName}
          </Text>
          <Text style={styles.amountWhite} numberOfLines={1}>
            {formattedTotal}
          </Text>
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
    marginTop: 12,
    gap: 2,
  },
  appNameBlue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
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
    marginTop: 12,
    gap: 2,
  },
  monthWhite: {
    fontSize: 15, // Mismo tamaño que el nombre de la app (appNameBlue)
    fontWeight: '600',
    color: colors.textSecondary,
  },
  amountWhite: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary, // Número resaltado en Azul
  },
});