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
import RecuperarP from './RecuperarP';
import ValidacionP from './ValidacionP';
import UpdatePassword from './UpdatePassword';
import BlogInstructor from './BlogInstructor'; 
import EditarBlogInstructor from './EditarBlogInstructor';
import GuiasInstructor from './GuiasInstructor';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RecuperarP" component={RecuperarP} />
        <Stack.Screen name="ValidacionP" component={ValidacionP} />
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
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="BlogInstructor" component={BlogInstructor} /> 
        <Stack.Screen name="EditarBlogInstructor" component={EditarBlogInstructor} />
        <Stack.Screen name="GuiasInstructor" component={GuiasInstructor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
