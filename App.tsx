import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './IndexScreen';
import LoginForm from './LoginForm';
import RegisterScreen from './RegisterScreen';
import IndexAdmin from './IndexAdmin';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="IndexAdmin" component={IndexAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
