import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Provider Global
import { SubscriptionProvider } from '../context/SubscriptionContext';

import HomeScreen from '../screens/HomeScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import BottomNavBar from '../components/BottomNavBar';

const TAB_ROUTES = ['Home', 'Subscriptions', 'Analytics'];

const SCREENS = {
  Home: HomeScreen,
  Subscriptions: SubscriptionsScreen,
  Analytics: AnalyticsScreen,
};

export default function AppNavigator() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Objeto "navigation" mínimo, compatible con la firma que espera BottomNavBar ({ state, navigation })
  const navigation = {
    navigate: (routeName) => {
      if (routeName === 'AddSubscriptionModal') {
        setIsAddModalVisible(true);
      } else if (TAB_ROUTES.includes(routeName)) {
        setCurrentTab(routeName);
      }
    },
  };

  const state = {
    index: TAB_ROUTES.indexOf(currentTab),
    routes: TAB_ROUTES.map((name) => ({ key: name, name })),
  };

  const CurrentScreen = SCREENS[currentTab];

  return (
    <SubscriptionProvider>
      <View style={styles.container}>
        <CurrentScreen />

        <BottomNavBar state={state} navigation={navigation} />

        <AddSubscriptionModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
        />
      </View>
    </SubscriptionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
