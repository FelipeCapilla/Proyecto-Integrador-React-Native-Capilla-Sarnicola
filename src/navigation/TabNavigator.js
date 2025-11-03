import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile';
import StackAnidada from './StackAnidada';
import CrearPosteo from '../screens/CrearPosteo';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name='StackAnidada'
        component={StackAnidada}
        options={{
            headerShown: false
        }}
        />
        <Tab.Screen
        name='Crearposteo'
        component={CrearPosteo}
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