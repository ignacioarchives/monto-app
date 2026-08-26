import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Gear } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export default function HomeTopBar({ title, showConfigButton = true }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {title ? (
          <Text style={styles.greetingName}>{title}</Text>
        ) : (
          <>
            <Text style={styles.greetingMuted}>Buen dia, </Text>
            <Text style={styles.greetingName}>Ignacio.</Text>
          </>
        )}
      </Text>

      {showConfigButton && (
        <TouchableOpacity style={styles.configButton} activeOpacity={0.7}>
          <Gear weight="bold" size={20} color={colors.warm[700]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'], // 24, mismo padding horizontal que Header/CalendarSection
  },
  greeting: {
    ...typography.h3,
  },
  greetingMuted: {
    color: semanticColors.text.secondary,
  },
  greetingName: {
    color: semanticColors.text.primary,
  },
  configButton: {
    width: 34, // ancho exacto del círculo en Figma (Ellipse 37)
    height: 28, // alto exacto del círculo en Figma
    borderRadius: borderRadius.full,
    backgroundColor: colors.warm[150],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
