import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import NavAdmin from './NavAdmin';

// Define el tipo para los usuarios
type Usuario = {
  correo: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  ficha: string;
  rol: string;
};

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Utiliza un tipo genérico para useState

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const apiUrl = 'http://localhost:3000/api/usuarios';
        const response = await axios.get<Usuario[]>(apiUrl); // Indica el tipo de respuesta esperado
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        // Manejo de error
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <View style={styles.container}>
        <NavAdmin />
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.correo}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Correo: ${item.correo}`}</Text>
            <Text>{`Nombre: ${item.primer_nombre} ${item.segundo_nombre} ${item.primer_apellido} ${item.segundo_apellido}`}</Text>
            <Text>{`Ficha: ${item.ficha}`}</Text>
            <Text>{`Rol: ${item.rol}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#088a88',
    marginBottom: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ListarUsuarios;
