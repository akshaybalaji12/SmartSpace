import React from 'react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return(

      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  inititalRouteName: "Login",
                  headerShown: false,
                  animation:'slide_from_right'
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
      </Provider>

  )

}