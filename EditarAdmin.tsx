import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import NavAdmin from './NavAdmin';

// Importa el tipo RouteProp para definir el tipo de la ruta
type EditarAdminRouteProp = RouteProp<Record<string, EditarAdminParams>, 'EditarAdmin'>;

// Define los parámetros esperados en la ruta 'EditarAdmin'
type EditarAdminParams = {
  usuario: {
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    correo: string;
    // Añade otros campos según sea necesario
  };
};

const EditarAdmin = () => {
  const route = useRoute<EditarAdminRouteProp>(); // Usa el tipo de ruta personalizado
  const { usuario } = route.params;

  const navigation = useNavigation();

  const [primerNombre, setPrimerNombre] = useState(usuario.primer_nombre);
  const [segundoNombre, setSegundoNombre] = useState(usuario.segundo_nombre);
  const [primerApellido, setPrimerApellido] = useState(usuario.primer_apellido);
  const [segundoApellido, setSegundoApellido] = useState(usuario.segundo_apellido);

  const handleGuardarCambios = async () => {
    try {
      const apiUrl = 'http://localhost:3000/api/actualizar-usuario';
      const updatedUserData = {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
      };

      // Realiza la solicitud de actualización
      await axios.post(apiUrl, updatedUserData, { params: { correo: usuario.correo } });
      setTimeout(() => {
        navigation.navigate('PerfilAdmin' as never);
      }, 3000);

    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      // ... (manejo de error)
    }
  };

  return (
    <View style={styles.container}>
      <NavAdmin />
      <Text style={styles.title}>Editar Información</Text>
      <TextInput
        style={styles.input}
        value={primerNombre}
        onChangeText={setPrimerNombre}
        placeholder="Primer Nombre"
      />
      <TextInput
        style={styles.input}
        value={segundoNombre}
        onChangeText={setSegundoNombre}
        placeholder="Segundo Nombre"
      />
      <TextInput
        style={styles.input}
        value={primerApellido}
        onChangeText={setPrimerApellido}
        placeholder="Primer Apellido"
      />
      <TextInput
        style={styles.input}
        value={segundoApellido}
        onChangeText={setSegundoApellido}
        placeholder="Segundo Apellido"
      />
      <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
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
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#088a88',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditarAdmin;
