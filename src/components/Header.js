import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 1. IMPORT COLORES GLOBALES
import { colors, semanticColors } from '../theme/colors';
import { typography } from '../theme/typography';
// 2. IMPORT CONTEXTO
import { useSubscriptions } from '../context/SubscriptionContext';

// Helper para convertir el número de mes en texto en español de forma segura
const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export default function Header() {
  const { subscriptions, calculateNextBillingDate } = useSubscriptions();

  // 1. Calculamos la cantidad total de suscripciones
  const totalSubs = subscriptions.length;
  const subsText = totalSubs === 1 ? '1 Suscripción' : `${totalSubs} Suscripciones`;

  // 2. Calculamos la fecha más cercana del próximo cobro
  let nextDateText = 'Sin próximos cobros'; // Por defecto si no hay nada cargado

  if (totalSubs > 0) {
    // Generamos un arreglo con las fechas exactas de todos los próximos cobros
    const upcomingDates = subscriptions.map((sub) => {
      return calculateNextBillingDate(sub.day);
    });

    // Encontramos la fecha menor (la más cercana a hoy)
    const closestDate = new Date(Math.min(...upcomingDates));

    // Formateamos la fecha a "10 de abril"
    const day = closestDate.getDate();
    const month = monthNames[closestDate.getMonth()];
    
    nextDateText = `${day} de ${month}`;
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.textBase, styles.title]}>{subsText}</Text>
      <Text style={[styles.textBase, styles.subtitle]}>Próximo cobro →</Text>
      <Text style={[styles.textBase, styles.dateBlue]}>{nextDateText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 20,
  },
  textBase: {
    ...typography.displayLarge,
  },
  title: {
    color: semanticColors.text.primary,
    marginBottom: 6,
  },
  subtitle: {
    color: semanticColors.text.primary,
  },
  dateBlue: {
    color: colors.primary[500],
  },
});