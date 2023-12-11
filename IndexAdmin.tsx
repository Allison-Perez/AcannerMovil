import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import BarraNav from './BarraNav'; 

const IndexAdmin = () => {
  return (
    <View style={styles.container}>
       <BarraNav />
      <Image
        source={require('./assets/imagenAdmin.png')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>
        ¡Bienvenido, administrador de la página web Acanner! Nos complace darle la bienvenida a bordo, asumiendo el papel clave de gestionar y administrar la información de nuestros usuarios. Su responsabilidad y flexibilidad son fundamentales para garantizar un entorno seguro y eficiente para todos nuestros usuarios. Confiamos en que su experiencia y habilidades profesionales contribuirán al continuo crecimiento y éxito de nuestra plataforma.
      </Text>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default IndexAdmin;
