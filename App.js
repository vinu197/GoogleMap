import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import MapScreen from './src/Components/MapScreen';
import Dashboard from './src/Components/Dashboard';
import { ImagePickerIOS } from 'react-native';
import {COLORS,FONTS} from './src/Constants/theme'

const Stack = createNativeStackNavigator ();

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
        backgroundColor: COLORS.blue
       },
          headerTintColor: COLORS.black,
          headerTitleStyle: {
          ...FONTS.appIconFont,
          fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;