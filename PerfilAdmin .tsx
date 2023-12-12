import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { obtenerCorreoUsuario } from './AuthHelper'; 
import NavAdmin from './NavAdmin'; 

const PerfilAdmin = () => {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const obtenerInformacionUsuario = async () => {
      try {
        const correo = await obtenerCorreoUsuario();
        console.log('Correo obtenido:', correo);

        if (correo) {
          const apiUrl = 'http://localhost:3000/api/obtener-usuario';
          console.log('Haciendo solicitud a la API:', apiUrl);

          axios.get(apiUrl, { params: { correo } })
            .then(response => {
              console.log('Respuesta de la API:', response.data);
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

    console.log('Antes de llamar a obtenerInformacionUsuario');
    obtenerInformacionUsuario();
    console.log('Después de llamar a obtenerInformacionUsuario');
  }, []);

  console.log('Renderizando componente con usuario:', usuario);

  return (
    <View style={styles.container}>
      <NavAdmin />
      <Text style={styles.title}>Perfil</Text>
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
  },
  imageContainer: {
    marginBottom: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default PerfilAdmin;
