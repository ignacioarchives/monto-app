import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      
      {/* 1. Inicio / Home */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setActiveTab('home')}
      >
        <Ionicons 
          name={activeTab === 'home' ? 'grid' : 'grid-outline'} 
          size={22} 
          color={activeTab === 'home' ? '#2563EB' : '#94A3B8'} 
        />
        <Text style={[
          styles.navLabel, 
          activeTab === 'home' && styles.navLabelActive
        ]}>
          Inicio
        </Text>
      </TouchableOpacity>

      {/* 2. Calendario / Suscripciones */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setActiveTab('calendar')}
      >
        <Ionicons 
          name={activeTab === 'calendar' ? 'calendar' : 'calendar-outline'} 
          size={22} 
          color={activeTab === 'calendar' ? '#2563EB' : '#94A3B8'} 
        />
        <Text style={[
          styles.navLabel, 
          activeTab === 'calendar' && styles.navLabelActive
        ]}>
          Calendario
        </Text>
      </TouchableOpacity>

      {/* 3. Botón Central "+" (Agregar Suscripción) */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* 4. Estadísticas / Análisis */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setActiveTab('stats')}
      >
        <Ionicons 
          name={activeTab === 'stats' ? 'stats-chart' : 'stats-chart-outline'} 
          size={22} 
          color={activeTab === 'stats' ? '#2563EB' : '#94A3B8'} 
        />
        <Text style={[
          styles.navLabel, 
          activeTab === 'stats' && styles.navLabelActive
        ]}>
          Métricas
        </Text>
      </TouchableOpacity>

      {/* 5. Perfil / Ajustes */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setActiveTab('profile')}
      >
        <Ionicons 
          name={activeTab === 'profile' ? 'person' : 'person-outline'} 
          size={22} 
          color={activeTab === 'profile' ? '#2563EB' : '#94A3B8'} 
        />
        <Text style={[
          styles.navLabel, 
          activeTab === 'profile' && styles.navLabelActive
        ]}>
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingBottom: 6, // Respiro inferior para barras de navegación
    
    // Sombras para darle elevación sobre el contenido
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
  },
  navLabelActive: {
    color: '#2563EB',
    fontWeight: '700',
  },

  /* --- BOTÓN CENTRAL FLOTANTE (+) --- */
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20, // Lo eleva ligeramente por encima de la barra
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
});