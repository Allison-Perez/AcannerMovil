import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BlogInstructor = () => {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [blogs, setBlogs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Función para cargar los blogs
    const cargarBlogs = async () => {
      try {
        const apiUrl = 'http://localhost:3000/api/blog/list';
        const response = await axios.get(apiUrl);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error al cargar los blogs:', error);
      }
    };

    // Cargar blogs al montar el componente
    cargarBlogs();
  }, []);

  const handleSubirBlog = async () => {
    try {
      const apiUrl = 'http://localhost:3000/api/blog/create';
      await axios.post(apiUrl, { titulo, comentario });

      // Recargar blogs después de subir uno nuevo
      setTitulo('');
      setComentario('');
      cargarBlogs();
    } catch (error) {
      console.error('Error al subir el blog:', error);
    }
  };

  const handleEditarBlog = (id_noticias) => {
    // Navegar a la pantalla de edición con el ID del blog
    navigation.navigate('EditarBlogInstructor', { id_noticias });
  };

  const handleEliminarBlog = async (id_noticias) => {
    try {
      const apiUrl = `http://localhost:3000/api/blog/delete/${id_noticias}`;
      await axios.delete(apiUrl);

      // Recargar blogs después de eliminar uno
      cargarBlogs();
    } catch (error) {
      console.error('Error al eliminar el blog:', error);
    }
  };

  const renderBlog = ({ item }) => (
    <View style={styles.blogContainer}>
      <Text style={styles.blogTitle}>{item.titulo}</Text>
      <Text style={styles.blogContent}>{item.contenido}</Text>
      <View style={styles.blogButtons}>
        <TouchableOpacity style={styles.blogButton} onPress={() => handleEditarBlog(item.id_noticias)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blogButton} onPress={() => handleEliminarBlog(item.id_noticias)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog del Instructor</Text>
      <TextInput
        style={styles.input}
        placeholder="Título del blog"
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario del blog"
        value={comentario}
        onChangeText={(text) => setComentario(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubirBlog}>
        <Text style={styles.buttonText}>Subir Blog</Text>
      </TouchableOpacity>
      <FlatList
        data={blogs}
        renderItem={renderBlog}
        keyExtractor={(item) => item.id_noticias.toString()}
      />
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
  blogContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  blogContent: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
  blogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogButton: {
    backgroundColor: '#088a88',
    padding: 8,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
});

export default BlogInstructor;
