import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Importamos tus 4 pantallas reales
import HomeScreen from '../screens/HomeScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import UserScreen from '../screens/UserScreen';

// Importamos el componente del modal que creamos
import AddSubscriptionModal from '../components/AddSubscriptionModal';

export default function AppNavigator() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar el modal

  const handleSaveSubscription = (newSub) => {
    console.log('Nueva suscripción guardada:', newSub);
    // Aquí luego conectaremos con el almacenamiento o contexto general
  };

  const renderScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Subscriptions':
        return <SubscriptionsScreen />;
      case 'Analytics':
        return <AnalyticsScreen />;
      case 'User':
        return <UserScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Contenido de la pantalla activa */}
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>

        {/* Barra de navegación inferior con tus estilos originales */}
        <View style={styles.tabBar}>
          {/* 1. Inicio */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('Home')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={currentTab === 'Home' ? 'home' : 'home-outline'} 
              size={24} 
              color={currentTab === 'Home' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, currentTab === 'Home' && styles.tabLabelActive]}>
              Inicio
            </Text>
          </TouchableOpacity>

          {/* 2. Suscripciones */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('Subscriptions')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={currentTab === 'Subscriptions' ? 'card' : 'card-outline'} 
              size={24} 
              color={currentTab === 'Subscriptions' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, currentTab === 'Subscriptions' && styles.tabLabelActive]}>
              Suscripciones
            </Text>
          </TouchableOpacity>

          {/* 3. BOTÓN CENTRAL DE MÁS (+) - Abre el Modal */}
          <View style={styles.centerButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsModalVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* 4. Estadísticas */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('Analytics')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={currentTab === 'Analytics' ? 'stats-chart' : 'stats-chart-outline'} 
              size={24} 
              color={currentTab === 'Analytics' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, currentTab === 'Analytics' && styles.tabLabelActive]}>
              Estadísticas
            </Text>
          </TouchableOpacity>

          {/* 5. Ajustes / Usuario */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('User')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={currentTab === 'User' ? 'person' : 'person-outline'} 
              size={24} 
              color={currentTab === 'User' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, currentTab === 'User' && styles.tabLabelActive]}>
              Ajustes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal de adición conectado a la barra */}
        <AddSubscriptionModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveSubscription}
        />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    height: 90, // Mantenemos tu altura personalizada
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 3,
    fontWeight: '400',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});