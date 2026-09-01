import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';
import ServiceIcon from '../ServiceIcon';
import SubscriptionCardModal from '../subscriptions/SubscriptionCardModal';
import NestedCardModal from '../ui/NestedCardModal';
import { getCalendarDayInfo } from '../../utils/calendarHelpers';

// Días de la semana para la cabecera de las columnas (sin tildes, igual que el Figma)
const weekDays = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

// Generamos automáticamente los 31 días del mes
const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);

// Agrupamos los días en filas de 7 (semanas) para poder alinear cada columna
// con space-between, sin depender de que el ancho de pantalla alcance para un
// gap fijo (eso es lo que hacía que domingo se fuera a la fila de abajo)
const weekRows = [];
for (let i = 0; i < monthDays.length; i += 7) {
  weekRows.push(monthDays.slice(i, i + 7));
}

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export default function CalendarSection() {
  const { subscriptions } = useSubscriptions();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // Cobros este mes: todas las subs cobran una vez por mes (sin campo de frecuencia todavía)
  const chargeCount = subscriptions.length;
  const currentMonthLabel =
    monthNames[currentMonth][0].toUpperCase() + monthNames[currentMonth].slice(1);

  // Estados para controlar el Modal: solo guardamos el día tocado, las subs de
  // ese día se derivan en cada render (así el modal ya refleja cambios en vivo)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDay, setModalDay] = useState(null);
  const daySubs = modalDay ? subscriptions.filter((s) => s.day === modalDay) : [];
  const dayTotal = daySubs.reduce((sum, s) => sum + Number(s.price), 0);

  // Manejador al tocar un día del calendario
  const handleDayPress = (dayNumber) => {
    setSelectedDay(dayNumber);

    // Buscamos si hay suscripciones en este día específico
    const subsOnThisDay = subscriptions.filter((s) => s.day === dayNumber);

    // Si hay cobros en este día, abrimos el modal con todas las que cobran ese día
    if (subsOnThisDay.length > 0) {
      setModalDay(dayNumber);
      setModalVisible(true);
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDay(null);
  };

  return (
    <View style={styles.container}>

      {/* ===== TARJETA DEL CALENDARIO ===== */}
      <View style={styles.card}>

        {/* 1. RESUMEN DEL MES + SELECTOR */}
        <View style={styles.monthRow}>
          {chargeCount === 0 ? (
            <Text style={styles.monthSummaryEmpty}>No hay cobros este mes</Text>
          ) : (
            <Text style={styles.monthSummaryText}>
              <Text style={styles.monthSummaryMuted}>Tenes </Text>
              <Text style={styles.monthSummaryCount}>
                {chargeCount} {chargeCount === 1 ? 'cobro' : 'cobros'}
              </Text>
              <Text style={styles.monthSummaryMuted}> este mes</Text>
            </Text>
          )}

          <View style={styles.monthPill}>
            <Text style={styles.monthPillText}>{currentMonthLabel}</Text>
          </View>
        </View>

        {/* 2. CABECERA DE LOS DÍAS DE LA SEMANA */}
        <View style={styles.weekHeaderRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* 3. GRILLA DE LOS 31 DÍAS, en filas de 7 con space-between */}
        <View style={styles.gridContainer}>
          {weekRows.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((dayNumber) => {
                // Día real del mes actual vs. inexistente/pasado/hoy/futuro
                const { exists, status } = getCalendarDayInfo(currentYear, currentMonth, dayNumber, today);
                const isDisabled = !exists || status === 'past';
                const isToday = status === 'today';
                const isSelected = dayNumber === selectedDay;

                // Buscamos si hay cobros este día (nunca en días desactivados/pasados)
                const subsOnThisDay = isDisabled ? [] : subscriptions.filter((s) => s.day === dayNumber);
                const hasSubscription = subsOnThisDay.length > 0;

                // "Hoy" y "seleccionado" comparten el mismo tratamiento (fondo warm/element), pero
                // un cobro real siempre gana por sobre ese indicador
                const isHighlighted = !isDisabled && !hasSubscription && (isToday || isSelected);
                const isFuturePlain = !isDisabled && !hasSubscription && !isHighlighted;

                return (
                  <TouchableOpacity
                    key={dayNumber}
                    style={[
                      styles.dayCell,
                      isFuturePlain && styles.dayCellFuture,
                      isHighlighted && styles.dayCellHighlighted,
                      hasSubscription && styles.dayCellCharged,
                    ]}
                    onPress={() => handleDayPress(dayNumber)}
                    activeOpacity={0.7}
                    disabled={isDisabled}
                  >
                    {/* Íconos de las marcas que cobran ese día (hasta 2), arriba del número */}
                    {hasSubscription && (
                      <View style={styles.indicatorStack}>
                        {subsOnThisDay.slice(0, 2).map((sub, index) => (
                          <View
                            key={sub.id}
                            style={[styles.indicatorIconWrapper, index > 0 && styles.indicatorIconOverlap]}
                          >
                            <ServiceIcon serviceName={sub.icon || sub.name} size={16} variant="circle" background={colors.warm[0]} />
                          </View>
                        ))}
                      </View>
                    )}

                    <Text style={[
                      styles.dateNumber,
                      hasSubscription && styles.dateNumberCharged,
                      isDisabled && styles.dateNumberDisabled,
                    ]}>
                      {dayNumber}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {/* Relleno invisible en la última semana para que las columnas sigan alineadas */}
              {week.length < 7 &&
                Array.from({ length: 7 - week.length }).map((_, index) => (
                  <View key={`pad-${index}`} style={styles.dayCellPlaceholder} />
                ))}
            </View>
          ))}
        </View>
      </View>

      {/* ===== MODAL / POPUP DE COBROS DEL DÍA (se abre al tocar un día con cobro) ===== */}
      <NestedCardModal
        visible={modalVisible}
        onClose={handleCloseModal}
        title={modalDay ? `Cobros ${modalDay} de ${monthNames[currentMonth]}` : undefined}
      >
        <View style={styles.modalCardsList}>
          {daySubs.map((sub) => (
            <SubscriptionCardModal key={sub.id} subscription={sub} />
          ))}
        </View>

        <View style={styles.modalTotalRow}>
          <Text style={styles.modalTotalLabel}>Total</Text>
          <Text style={styles.modalTotalAmount}>${dayTotal.toLocaleString('es-AR')}</Text>
        </View>
      </NestedCardModal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md, // 12, lo más cerca de 14px que hay en el design system
    width: '100%',
  },

  /* --- CONTENEDOR DEL CALENDARIO (sin fondo/borde/sombra, solo layout) --- */
  card: {
    width: '100%',
    paddingHorizontal: spacing['2xl'], // 24
    paddingVertical: spacing.lg, // 16
  },

  /* --- RESUMEN DEL MES + SELECTOR --- */
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  monthSummaryText: {
    ...typography.bodyMedium, // 14px base
  },
  monthSummaryMuted: {
    ...typography.bodyMedium, // 14px, medium
    fontWeight: fontWeights.medium,
    color: semanticColors.text.secondary,
  },
  monthSummaryCount: {
    ...typography.bodyMedium, // 14px, semibold
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.primary,
  },
  monthSummaryEmpty: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.medium,
    color: semanticColors.text.secondary,
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warm[75],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  monthPillText: {
    ...typography.caption, // 12/16, un paso más grande que el badge anterior (11/14)
    color: semanticColors.text.secondary,
  },

  /* --- CABECERA DE DÍAS DE LA SEMANA --- */
  weekHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap', // nunca debe pasar a una segunda línea (eso hacía que DOM se cayera abajo)
    // 20px de gap acá (celda 32) da el mismo "pitch" de columna que 8px de gap en los días (celda 44),
    // así las columnas quedan alineadas con weekRow de abajo
    gap: spacing.xl,
    marginBottom: spacing.sm,
  },
  weekDayCell: {
    width: 32, // ancho exacto de label en Figma
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    ...typography.badge, // 11/14/semibold como base
    fontSize: 10, // Figma trae 10px acá, sin token exacto
    color: semanticColors.text.primary,
  },

  /* --- GRILLA DEL CALENDARIO --- */
  gridContainer: {
    gap: spacing.sm, // 7-8, separación vertical entre semanas
  },
  weekRow: {
    flexDirection: 'row',
    gap: spacing.sm, // 8px exactos entre cada día
  },

  dayCell: {
    width: 44, // ancho exacto de celda en Figma
    height: 44, // alto exacto de celda en Figma
    alignItems: 'center',
    justifyContent: 'flex-end', // ícono + número anclados abajo, como en Figma
    gap: spacing.xs, // separación entre ícono y número cuando hay cobro
    borderRadius: borderRadius.sm, // 8, más cercano al 10px que trae Figma
  },
  // Relleno invisible para que la última semana (menos de 7 días) no rompa la alineación de columnas
  dayCellPlaceholder: {
    width: 44,
    height: 44,
  },
  // Día futuro/habilitado, sin cobro, sin seleccionar
  dayCellFuture: {
    backgroundColor: colors.warm[50],
    borderWidth: 1,
    borderColor: colors.warm[100],
  },
  // Día actual o seleccionado (sin cobro)
  dayCellHighlighted: {
    backgroundColor: colors.surface.warmElement,
    borderWidth: 1,
    borderColor: colors.warm[100],
  },
  // Día con cobro: siempre gana por sobre cualquier otro estado
  dayCellCharged: {
    backgroundColor: colors.primary[500],
    borderWidth: 1,
    borderColor: colors.primary[500],
  },

  /* --- INDICADOR DE SUSCRIPCIÓN --- */
  indicatorStack: {
    flexDirection: 'row',
  },
  indicatorIconWrapper: {
    borderRadius: borderRadius.full,
  },
  indicatorIconOverlap: {
    marginLeft: -3, // superposición exacta de Figma entre los 2 íconos
  },

  dateNumber: {
    ...typography.bodySmall, // 13/18, coincide exacto con Figma
    fontWeight: fontWeights.medium,
    color: semanticColors.text.primary,
  },
  dateNumberCharged: {
    color: semanticColors.text.inverse,
  },
  dateNumberDisabled: {
    color: colors.warm[300],
  },

  /* --- CONTENIDO DEL MODAL (NestedCardModal se encarga del wrapper/card/header) --- */
  modalCardsList: {
    marginHorizontal: -spacing.xl, // bleed: ocupa todo el ancho del innerCard, ignorando su padding
  },
  modalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    marginHorizontal: -spacing.xl, // mismo bleed que modalCardsList, para alinear con "Cobros"
  },
  modalTotalLabel: {
    ...typography.bodyLarge, // 16px, misma tipografía que el título del modal (NestedCardModal)
    fontWeight: fontWeights.medium,
    color: semanticColors.text.secondary,
  },
  modalTotalAmount: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: semanticColors.text.primary,
  },
});
