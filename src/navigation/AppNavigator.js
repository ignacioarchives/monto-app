import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas
import HomeScreen from '../screens/HomeScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import UserScreen from '../screens/UserScreen';
import AddSubscriptionModal from '../screens/AddSubscriptionModal';

// Tu BottomNavBar que acabamos de adaptar
import BottomNavBar from '../components/BottomNavBar';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
        <RootStack.Screen 
          name="AddSubscriptionModal" 
          component={AddSubscriptionModal} 
          options={{ 
            presentation: 'transparentModal',
            animation: 'slide_from_bottom'
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}