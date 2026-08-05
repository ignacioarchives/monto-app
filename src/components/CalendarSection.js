import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

// Días de la semana para la cabecera de las columnas
const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// Generamos automáticamente los 31 días del mes
const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);

export default function CalendarSection() {
  // Estado para el día seleccionado (por defecto el día 10)
  const [selectedDay, setSelectedDay] = useState(10);

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
          {monthDays.map((dayNumber) => {
            const isSelected = dayNumber === selectedDay;

            return (
              <TouchableOpacity 
                key={dayNumber} 
                style={[
                  styles.dayCell, 
                  isSelected && styles.dayCellSelected
                ]}
                onPress={() => setSelectedDay(dayNumber)}
                activeOpacity={0.7}
              >
                {/* Espacio central libre para iconos de apps */}

                {/* Número del día anclado bien abajo */}
                <Text style={[
                  styles.dateNumber, 
                  isSelected && styles.dateNumberSelected
                ]}>
                  {dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    marginLeft: 15,
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
  
  // 🌟 Celda seleccionada/activa (Tus especificaciones exactas)
  dayCellSelected: {
    backgroundColor: '#E0F0FF', // Fondo azul claro
    borderColor: '#DBEDFF',     // Borde de 1px azul suave
    borderWidth: 1,
  },

  // Número del día inactivo
  dateNumber: {
    position: 'absolute',
    bottom: 4,              
    fontSize: 15,           
    fontWeight: '500',      
    color: colors.textPrimary,
  },

  // 🌟 Número del día seleccionado (Tus especificaciones exactas)
  dateNumberSelected: {
    color: '#0088FF',    // Texto azul
    fontWeight: 'bold',  // En negrita (bold)
  },
});