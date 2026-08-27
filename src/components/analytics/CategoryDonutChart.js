import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const SIZE = 260;
const STROKE_WIDTH = 34;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP_DEGREES = 8;

// Donut de gasto por categoría: un <Circle> por categoría usando strokeDasharray/strokeDashoffset
// sobre el mismo radio, con strokeLinecap="round" para las puntas redondeadas del diseño y un
// gap fijo entre segmentos. El <G> se rota -90° para que el primer segmento arranque arriba.
export default function CategoryDonutChart({ data, centerLabel }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const gapLength = (GAP_DEGREES / 360) * CIRCUMFERENCE;
  const availableLength = Math.max(CIRCUMFERENCE - data.length * gapLength, 0);

  let cumulative = 0;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <G rotation="-90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
          {total > 0 &&
            data.map((item) => {
              const segmentLength = (item.amount / total) * availableLength;
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
