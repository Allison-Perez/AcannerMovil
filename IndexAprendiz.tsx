import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const IndexAprendiz = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido Aprendiz</Text>
      <Image source={require('./assets/aprendiz.png')} style={styles.image} />
      <Text style={styles.description}>
        Bienvenido a ACANNER, una plataforma que busca mejorar la gestión del tiempo y el
        control de tus actividades pendientes. Destacamos por nuestra colaboración con el SENA
        (Servicio Nacional de Aprendizaje), lo que te proporciona acceso a recursos educativos
        para enriquecer tu crecimiento personal y profesional.
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
    width: 100, // Ajusta el tamaño según tus necesidades
    height: 100, // Ajusta el tamaño según tus necesidades
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

export default IndexAprendiz;
