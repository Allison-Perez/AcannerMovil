import React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from "react-native";

const LoginForm = () => {
  return (
    <View style={styles.container}>
    
    <Image source={require('./assets/logoVerde.png')} style={styles.logo} />


      
      <TextInput
        placeholder="Correo"
        style={[styles.input, { borderColor: '#C0C0C0', color: '#6c6e6b' }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      
      <TextInput
        placeholder="Password"
        style={[styles.input, { borderColor: '#C0C0C0', color: '#6c6e6b' }]}
        secureTextEntry
      />

      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.forgotPassword}>
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
    borderColor: '#C0C0C0', // Color del borde
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#C0C0C0', // Color del texto
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
