// Importar las bibliotecas necesarias de React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavAdmin from './NavAdmin';

// Definir el componente principal de la aplicación
const PasswordAdmin = () => {
  return (
    <View style={styles.container}>
      <NavAdmin />
      <Text style={styles.title}>Hola, aun no funciono</Text>
    </View>
  );
};

// Definir estilos con StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#088a88',
    marginBottom: 20,
  },
});

// Exportar el componente principal
export default PasswordAdmin;
