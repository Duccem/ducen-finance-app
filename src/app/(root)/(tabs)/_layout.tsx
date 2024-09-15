import TabBar from '@/src/libs/ui/sections/tab-bar';
import { Tabs } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Tabs initialRouteName="home" tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bill"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default Layout;
