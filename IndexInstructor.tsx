import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NavInstructor from './NavInstructor'; 

const IndexInstructor = () => {
  return (
    <View style={styles.container}>
      <NavInstructor />
      <Text style={styles.title}>Bienvenido Instructor</Text>
      <Image source={require('./assets/software.png')} style={styles.image} />
      <Text style={styles.description}>
        Bienvenido a ACANNER, una plataforma que te va a facilitar el manejo de tu tiempo.
        Tendrás una mejor organización en tus actividades y estamos vinculados con el SENA
        (Servicio Nacional de Aprendizaje).
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
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#088a88',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default IndexInstructor;
