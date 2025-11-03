import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name='Home'
        component={Home}
        options={{
            headerShown: false
        }}
        />
        <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
            headerShown: false
        }}
        />
    </Tab.Navigator>
  )
}