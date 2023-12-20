import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import NavAdmin from './NavAdmin'; 

// Define el tipo para los usuarios
type Usuario = {
  correo: string;
  primer_nombre: string;
  primer_apellido: string;
  ficha: string;
  rol: string;
};

const roles = [
  { label: 'Instructor', value: '1' },
  { label: 'Aprendiz', value: '2' },
  { label: 'Administrador', value: '3' },
];

const ActualizarAdmin = () => {
  const route = useRoute();
  const { usuario } = route.params as { usuario: Usuario };
  const navigation = useNavigation();

  const [primerNombre, setPrimerNombre] = useState(usuario.primer_nombre);
  const [primerApellido, setPrimerApellido] = useState(usuario.primer_apellido);
  const [ficha, setFicha] = useState(usuario.ficha);
  const [rol, setRol] = useState(usuario.rol);

  useEffect(() => {
    console.log('Estado actualizado:', {
      primerNombre,
      primerApellido,
      ficha,
      rol,
    });
  }, [primerNombre, primerApellido, ficha, rol]);

  const handleGuardarCambios = async () => {
    try {
      console.log('Guardando cambios...');
      
      const apiUrl = 'http://localhost:3000/api/modificar-usuarios';
      const updatedUserData = {
        primer_nombre: primerNombre,
        primer_apellido: primerApellido,
        ficha: ficha,
        rol: rol,
      };

      console.log('Datos del usuario actualizado:', updatedUserData);

      await axios.post<{}, { data: string }>(apiUrl, {
        email: usuario.correo,
        updatedUser: updatedUserData,
      });

      console.log('Cambios guardados correctamente.');

      // ... (manejo de éxito, retroceso a la pantalla anterior, etc.)
      setTimeout(() => {
        navigation.navigate('ListarUsuarios' as never);
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      // ... (manejo de error)
    }
  };

  return (
    <View style={styles.container}>
      <NavAdmin />
      <Text style={styles.title}>Actualizar Información</Text>
      <TextInput
        style={styles.input}
        value={primerNombre}
        onChangeText={(text) => setPrimerNombre(text)}
        placeholder="Primer Nombre"
      />
      <TextInput
        style={styles.input}
        value={primerApellido}
        onChangeText={(text) => setPrimerApellido(text)}
        placeholder="Primer Apellido"
      />
      <TextInput
        style={styles.input}
        value={ficha}
        onChangeText={(text) => setFicha(text)}
        placeholder="Ficha"
        editable={false}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Rol:</Text>
        <Picker
          selectedValue={rol}
          onValueChange={(itemValue) => setRol(itemValue.toString())}
          style={styles.picker}
        >
          {roles.map((role) => (
            <Picker.Item key={role.value} label={role.label} value={role.value} />
          ))}
        </Picker>
      </View>
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
    backgroundColor: '#fff',
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
    borderColor: '#088a88',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#088a88',
  },
  picker: {
    height: 40,
    width: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#088a88',
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

export default ActualizarAdmin;
