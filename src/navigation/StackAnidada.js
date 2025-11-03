import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import CommentsAnidado from '../screens/CommentsAnidado'

const Stack = createNativeStackNavigator();

export default function StackAnidada() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='CommentsAnidado'
                component={CommentsAnidado}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}