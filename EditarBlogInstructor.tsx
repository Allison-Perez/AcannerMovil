import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import NavInstructor from './NavInstructor';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditarBlogInstructor: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const { id_noticias } = route.params;

  useEffect(() => {
    // Cargar el blog específico al montar el componente
    cargarBlog();
  }, []);

  const cargarBlog = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/blog/${id_noticias}`;
      const response = await axios.get(apiUrl);

      // Actualizar el estado con los datos del blog
      setTitulo(response.data.titulo);
      setContenido(response.data.contenido);
    } catch (error) {
      //console.error('Error al cargar el blog:', error);
    }
  };

  const handleEditarBlog = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/blog/update/${id_noticias}`;
      await axios.put(apiUrl, { titulo, contenido });

      // Regresar a la pantalla de BlogInstructor después de editar
      navigation.navigate('BlogInstructor');
    } catch (error) {
      console.error('Error al editar el blog:', error);
    }
  };

  return (
    <View style={styles.container}>
      <NavInstructor />
      <Text style={styles.title}>Editar Blog</Text>
      <TextInput
        style={styles.input}
        placeholder="Título del blog"
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contenido"
        value={contenido}
        onChangeText={(text) => setContenido(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleEditarBlog}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#088a88',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#088a88',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditarBlogInstructor;
