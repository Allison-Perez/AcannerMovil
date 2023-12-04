import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import ApiService from './ApiService'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await ApiService.login({ correo, password });

      if (response.status === 200) {
       
        const email = correo;
        console.log(email);
        alert("Inicio de sesión exitoso");
        
        const userRole = response.rol;


      } else {
        // Autenticación fallida
        alert("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Error en el inicio de sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logoVerde.png')} style={styles.logo} />
      <TextInput
        placeholder="Correo"
        style={[styles.input, { borderColor: '#C0C0C0', color: '#6c6e6b' }]}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setCorreo(text)}
      />
      <TextInput
        placeholder="Password"
        style={[styles.input, { borderColor: '#C0C0C0', color: '#6c6e6b' }]}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Restablecer Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppNavigator = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name="Login" component={LoginForm} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#C0C0C0',
  },
  loginButton: {
    backgroundColor: '#088a88',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#088a88',
  },
});

export default App;
