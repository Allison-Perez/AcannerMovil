import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { obtenerCorreoUsuario } from './AuthHelper'; 
import NavAdmin from './NavAdmin';
import { useNavigation } from '@react-navigation/native';

const PerfilAdmin = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerInformacionUsuario = async () => {
      try {
        const correo = await obtenerCorreoUsuario();
        if (correo) {
          const apiUrl = 'http://localhost:3000/api/obtener-usuario';
          axios.get(apiUrl, { params: { correo } })
            .then(response => {
              setUsuario(response.data);
            })
            .catch(error => {
              console.error('Error al obtener el usuario:', error);
            });
        }
      } catch (error) {
        console.error('Error al obtener el correo del usuario:', error);
      }
    };

    obtenerInformacionUsuario();
  }, []);

  const handleEditar = () => {
    navigation.navigate('EditarAdmin' as never, { usuario } as never);
  };

  const handleCambiarContraseña = () => {
    navigation.navigate('PasswordAdmin' as never); 
  };

  return (
    <View style={styles.container}>
      <NavAdmin />
      <Text style={styles.title}>Perfil Administrador</Text>
      <View style={styles.imageContainer}>
        {usuario && <Image source={require('./assets/perfil.jpg')} style={styles.image} />}
      </View>
      <View style={styles.content}>
        {usuario && (
          <>
            <Text style={styles.label}>Primer Nombre:</Text>
            <Text style={styles.detail}>{usuario.primer_nombre}</Text>

            <Text style={styles.label}>Segundo Nombre:</Text>
            <Text style={styles.detail}>{usuario.segundo_nombre}</Text>

            <Text style={styles.label}>Primer Apellido:</Text>
            <Text style={styles.detail}>{usuario.primer_apellido}</Text>

            <Text style={styles.label}>Segundo Apellido:</Text>
            <Text style={styles.detail}>{usuario.segundo_apellido}</Text>

            <Text style={styles.label}>Ficha:</Text>
            <Text style={styles.detail}>{usuario.ficha}</Text>

            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.detail}>{usuario.correo}</Text>
          </>
        )}
      </View>
      {/* Botones */}
      <TouchableOpacity style={styles.buttonEditar} onPress={handleEditar}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCambiar} onPress={handleCambiarContraseña}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
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
    marginTop: 20,
    fontFamily: 'Montserrat',
  },
  imageContainer: {
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
  buttonEditar: {
    backgroundColor: '#088a88',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonCambiar: {
    backgroundColor: '#088a88',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginBottom: 35,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PerfilAdmin;
