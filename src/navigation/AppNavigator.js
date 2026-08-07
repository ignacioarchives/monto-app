import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Provider Global
import { SubscriptionProvider } from '../context/SubscriptionContext';

import HomeScreen from '../screens/HomeScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import UserScreen from '../screens/UserScreen';
import AddSubscriptionModal from '../components/AddSubscriptionModal';

export default function AppNavigator() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <SubscriptionProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={styles.screenContainer}>{renderScreen()}</View>

          {/* Barra de navegación inferior */}
          <View style={styles.tabBar}>
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
              <Text
                style={[
                  styles.tabLabel,
                  currentTab === 'Subscriptions' && styles.tabLabelActive,
                ]}
              >
                Suscripciones
              </Text>
            </TouchableOpacity>

            <View style={styles.centerButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

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

          <AddSubscriptionModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        </View>
      </NavigationContainer>
    </SubscriptionProvider>
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
    height: 90,
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