import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import NavAdmin from './NavAdmin'; 

const IndexAdmin = () => {
  return (
    <View style={styles.container}>
       <NavAdmin />
       <Text style={styles.title}>Bienvenido Administrador</Text>
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#088a88',
    marginBottom: 10,
  },
  
  welcomeText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default IndexAdmin;
