import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/Login';
import Verification from './src/screens/Verification';
import CreatePassword from './src/screens/CreatePassword';
import Home from './src/screens/Home';
import LoginP2 from './src/screens/LoginP2';
import LockersMap from './src/screens/LockersMap';
import Payment from './src/screens/Payment';
import { UserContextProvider } from './src/contexts/UserContext';

export default function App() {
    const { Navigator, Screen } = createStackNavigator();
    const { gemail, setGemail } = createStackNavigator();

    return (
        <UserContextProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle="dark-content"
                    translucent
                // backgroundColor="black"
                />
                <Navigator
                // headerMode="none"
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
                        cardStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                >

                    <Screen name="Login" component={Login} />
                    <Screen name="Verification" component={Verification} />
                    <Screen name="CreatePassword" component={CreatePassword} />
                    <Screen name="Home" component={Home} />
                    <Screen name="LoginP2" component={LoginP2} />
                    <Screen name="LockersMap" component={LockersMap} />
                    <Screen name="Payment" component={Payment} />
                </Navigator>
            </NavigationContainer>
        </UserContextProvider>
    );
}

const styles = StyleSheet.create({});
