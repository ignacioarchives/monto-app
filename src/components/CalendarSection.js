import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

// Días de la semana para la cabecera de las columnas
const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// Generamos automáticamente los 31 días del mes
const monthDays = Array.from({ length: 31 }, (_, index) => {
  const dayNumber = index + 1;

  return {
    id: dayNumber,
    date: String(dayNumber),
    isSelected: dayNumber === 10, // 👈 Día 10 seleccionado en azul por defecto
  };
});

export default function CalendarSection() {
  return (
    <View style={styles.container}>
      
      {/* ===== CONTENEDOR GENERAL DEL CALENDARIO ===== */}
      <View style={styles.calendarWrapper}>

        {/* 1. CABECERA DE LOS DÍAS DE LA SEMANA */}
        <View style={styles.weekHeaderRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* 2. GRILLA DE LOS 31 DÍAS */}
        <View style={styles.gridContainer}>
          {monthDays.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.dayCell, 
                item.isSelected && styles.dayCellSelected
              ]}
            >
              {/* Espacio central libre para iconos de apps */}

              {/* Número del día anclado bien abajo */}
              <Text style={[
                styles.dateNumber, 
                item.isSelected && styles.dateNumberSelected
              ]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',    
    paddingHorizontal: 16,   
  },

  /* --- CONTENEDOR PRINCIPAL DEL CALENDARIO --- */
  calendarWrapper: {
    width: 364,              
    alignSelf: 'center',    
    marginLeft: 15,         // 👈 Probemos desplazándolo 12 píxeles hacia la izquierda para ver el impacto visual
  },

  /* --- CABECERA DE DÍAS DE LA SEMANA --- */
  weekHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,                 
    marginBottom: 8,
  },
  weekDayCell: {
    width: 44,              
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    fontSize: 13,           
    fontWeight: 'bold',     
    color: '#2563EB',       
  },

  /* --- GRILLA DEL CALENDARIO --- */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',       
    gap: 7,                 
  },
  
  // Celda individual de cada día
  dayCell: {
    width: 44,              
    height: 52,             
    position: 'relative',   
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  
  // Celda seleccionada (Azul pleno)
  dayCellSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  // Número del día
  dateNumber: {
    position: 'absolute',
    bottom: 4,              
    fontSize: 15,           
    fontWeight: '500',      
    color: colors.textPrimary,
  },
  dateNumberSelected: {
    color: '#FFFFFF',       
  },
});