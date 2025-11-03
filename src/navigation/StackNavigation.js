import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import React from 'react'

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='TabNavigator'
                component={TabNavigator}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
  )
}

export default StackNavigation