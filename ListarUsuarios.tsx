import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavAdmin from './NavAdmin';
import { StackScreenProps } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';


type RootStackParamList = {
  ListarUsuarios: undefined;
  ActualizarAdmin: { usuario: Usuario };
};

type Usuario = {
  correo: string;
  primer_nombre: string;
  primer_apellido: string;
  ficha: string;
  rol: string;
};

type ListarUsuariosProps = StackScreenProps<RootStackParamList, 'ListarUsuarios'>;

const ListarUsuarios: React.FC<ListarUsuariosProps> = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const apiUrl = 'http://localhost:3000/api/usuarios';
        const response = await axios.get<Usuario[]>(apiUrl);
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleEditarUsuario = (usuario: Usuario) => {
    // Navegar a la pantalla de edición y pasar el usuario como parámetro
    navigation.navigate('ActualizarAdmin', { usuario });
  };

  return (
    <View style={styles.container}>
      <NavAdmin />
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.correo}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleEditarUsuario(item)}
          >
            <Icon name="pencil" size={20} color="#088a88" style={styles.icon} />
            <View style={styles.userInfo}>
              <Text style={styles.userText}>{`Correo: ${item.correo}`}</Text>
              <Text style={styles.userText}>{`Nombre: ${item.primer_nombre} ${item.primer_apellido}`}</Text>
              <Text style={styles.userText}>{`Ficha: ${item.ficha}`}</Text>
              <Text style={styles.userText}>{`Rol: ${item.rol}`}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />
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
  title: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#088a88',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userText: {
    marginBottom: 5,
  },
  flatList: {
    marginBottom: 30, // Ajusta este valor según sea necesario
  },
});

export default ListarUsuarios;
