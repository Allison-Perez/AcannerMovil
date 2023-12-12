// Importar las bibliotecas necesarias de React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definir el componente principal de la aplicación
const PasswordAdmin = () => {
  return (
    <View style={styles.container}>
      <Text>Hola Mundo</Text>
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
});

// Exportar el componente principal
export default PasswordAdmin;
