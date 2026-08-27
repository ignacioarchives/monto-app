import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const SIZE = 260;
const STROKE_WIDTH = 40;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// Gap grande entre segmentos, para el look de "blobs" separados del diseño (no una cinta continua)
const GAP_DEGREES = 25;
// Largo mínimo de arco por categoría (en grados) — solo lo justo para que, con montos muy
// desparejos, un segmento chico no colapse en un punto por el strokeLinecap="round".
const MIN_ARC_DEGREES = 14;

// Donut de gasto por categoría: un <Circle> por categoría usando strokeDasharray/strokeDashoffset
// sobre el mismo radio, con strokeLinecap="round" para las puntas redondeadas del diseño y un
// gap fijo entre segmentos. El <G> se rota -90° para que el primer segmento arranque arriba.
export default function CategoryDonutChart({ data, centerLabel, style }) {
  const visibleData = data.filter((item) => item.amount > 0);
  const total = visibleData.reduce((sum, item) => sum + item.amount, 0);

  const gapLength = (GAP_DEGREES / 360) * CIRCUMFERENCE;
  const availableLength = Math.max(CIRCUMFERENCE - visibleData.length * gapLength, 0);
  const idealMinLength = (MIN_ARC_DEGREES / 360) * CIRCUMFERENCE;
  // Si hay tantas categorías que ni el mínimo entra, se reparte availableLength en partes iguales
  const minLength = visibleData.length > 0 ? Math.min(idealMinLength, availableLength / visibleData.length) : 0;
  const remainingLength = Math.max(availableLength - visibleData.length * minLength, 0);

  let cumulative = 0;

  return (
    <View style={[styles.container, style]}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <G rotation="-90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
          {visibleData.map((item) => {
            const proportionalLength = total > 0 ? (item.amount / total) * remainingLength : 0;
            const segmentLength = minLength + proportionalLength;
            const dashOffset = -cumulative;
            cumulative += segmentLength + gapLength;

            return (
              <Circle
                key={item.key}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke={item.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${segmentLength} ${CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </G>
      </Svg>
      <View style={styles.centerOverlay} pointerEvents="none">
        <Text style={styles.centerLabel}>{centerLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centerOverlay: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    ...typography.displayLarge,
    color: semanticColors.text.primary,
  },
});
