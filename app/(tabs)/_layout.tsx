import { useAuth } from '@/features/auth/selectors/useAuth';
import { Redirect, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return (
      <SafeAreaView className="flex-1 bg-background text-white justify-center items-center">
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/Login" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 30 : 20,
            left: 30,          
            right: 30,
            borderRadius: 24,
            backgroundColor: '#1E293B', // background.card
            height: 60,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            marginHorizontal:25
          },
        }}
      >
        <Tabs.Screen
          name="Dashboard"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name="home" size={24} color={focused ? '#007BFF' : '#94A3B8'} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="Usage"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name="bar-chart-2" size={24} color={focused ? '#007BFF' : '#94A3B8'} />
            ),
          }}
        />
        <Tabs.Screen
          name="Tips"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name="zap" size={24} color={focused ? '#FFB800' : '#94A3B8'} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name="user" size={24} color={focused ? '#007BFF' : '#94A3B8'} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
