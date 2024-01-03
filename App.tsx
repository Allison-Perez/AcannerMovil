// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './IndexScreen';
import LoginForm from './LoginForm';
import RegisterScreen from './RegisterScreen';
import IndexAdmin from './IndexAdmin';
import IndexAprendiz from './IndexAprendiz';
import IndexInstructor from './IndexInstructor';
import PerfilAdmin from './PerfilAdmin';
import RegistroAdmin from './RegistroAdmin';
import PasswordAdmin from './PasswordAdmin';
import EditarAdmin from './EditarAdmin';
import ListarUsuarios from './ListarUsuarios';
import ActualizarAdmin from './ActualizarAdmin';
import NavAdmin from './NavAdmin';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="NavAdmin" component={NavAdmin} />
        <Stack.Screen name="IndexAdmin" component={IndexAdmin} />
        <Stack.Screen name="IndexAprendiz" component={IndexAprendiz} />
        <Stack.Screen name="IndexInstructor" component={IndexInstructor} />
        <Stack.Screen name="PerfilAdmin" component={PerfilAdmin} />
        <Stack.Screen name="RegistroAdmin" component={RegistroAdmin} />
        <Stack.Screen name="PasswordAdmin" component={PasswordAdmin} />
        <Stack.Screen name="EditarAdmin" component={EditarAdmin} />
        <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} />
        <Stack.Screen name="ActualizarAdmin" component={ActualizarAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
