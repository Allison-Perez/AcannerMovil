import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { guardarCorreoUsuario } from './AuthHelper'; 



const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<any>>();


  // ...

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password } as Record<string, any>),
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        const userRole = responseData.rol;
        guardarCorreoUsuario(correo);
  
        switch (userRole) {
          case 1:
            // Redirigir al componente IndexInstructor
            navigation.navigate('IndexInstructor');
            break;
          case 2:
            // Redirigir al componente IndexAprendiz
            navigation.navigate('IndexAprendiz');
            break;
          case 3:
            // Redirigir al componente IndexAdmin
            navigation.navigate('IndexAdmin');
            break;
          default:
            // Puedes manejar otros roles o casos aquí si es necesario
            break;
        }
  
        // También puedes hacer algo más aquí, como mostrar una alerta o navegar a la pantalla principal
      } else {
        alert("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Error en el inicio de sesión");
    }
  };
  
  const handleRecuperarP = () => {
    navigation.navigate('RecuperarP'); // Asegúrate de que coincide con el nombre de la pantalla en tus rutas
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
      <TouchableOpacity style={styles.forgotPassword} onPress={handleRecuperarP}>
        <Text style={styles.forgotPasswordText}>Restablecer Contraseña</Text>
      </TouchableOpacity>
    </View>
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

export default LoginForm;
