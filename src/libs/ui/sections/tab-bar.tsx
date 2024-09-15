import React from 'react';

import { BarChart, CircleDollarSign, House, Plus } from 'lucide-react-native';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const navigationIcons = {
  home: ({ focused }: { focused: boolean }) => (
    <House className={`${focused ? 'text-foreground-primary' : 'text-background-primary'}`} size={20} />
  ),
  stats: ({ focused }: { focused: boolean }) => (
    <BarChart className={`${focused ? 'text-foreground-primary' : 'text-background-primary'}`} size={20} />
  ),
  bill: ({ focused }: { focused: boolean }) => (
    <CircleDollarSign className={`${focused ? 'text-foreground-primary' : 'text-background-primary'}`} size={20} />
  ),
};

const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View className="flex flex-row absolute bottom-6 bg-foreground-primary rounded-full px-1 w-3/5 mx-3">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} className="flex-1 justify-center items-center my-2 rounded-full ">
            <Pressable
              onPress={onPress}
              className={`rounded-full h-full  mx-1 ${
                isFocused ? 'bg-background-primary p-2' : 'bg-foreground-primary'
              }`}
            >
              <View className="flex-1 flex-row justify-center items-center rounded-full">
                {navigationIcons[route.name as keyof typeof navigationIcons]({ focused: isFocused })}
                {isFocused && <Text className="text-foreground-primary ml-1  font-NunitoBold">{label}</Text>}
              </View>
            </Pressable>
          </View>
        );
      })}
      <TouchableOpacity className="absolute -right-[120px] flex justify-center items-center  h-12 w-12 bg-foreground-primary rounded-full">
        <Plus className="text-background-primary" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default TabBar;
