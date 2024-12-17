import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import ParkingFinderScreen from '../screens/ParkingFinderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ParkingView from '../screens/ParkingView';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ParkingStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ParkingFinder"
                component={ParkingFinderScreen}
            />
            <Stack.Screen
                name="ParkingView"
                component={ParkingView}
            />
        </Stack.Navigator>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Otopark') {
                        iconName = focused ? 'car' : 'car-outline';
                    } else if (route.name === 'Profil') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 4,
                    height: 60,
                },
            })}
        >
            <Tab.Screen
                name="Otopark"
                component={ParkingStackNavigator}
                options={{
                    title: 'Otopark'
                }}
            />
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    title: 'Profil'
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;