import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

interface ValidacionPProps {
  route: {
    params: {
      correo: string;
    };
  };
}

const ValidacionP: React.FC<ValidacionPProps> = ({ route }) => {
  const { correo } = route.params;
  const navigation = useNavigation();
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [seIntentoValidar, setSeIntentoValidar] = useState(false);
  const [esValido, setEsValido] = useState(false);
  const [descripcionP, setDescripcionP] = useState('');
  const [contrasenaTemporal, setContrasenaTemporal] = useState('');

  const obtenerPreguntaSeguridad = async () => {
    try {
      console.log('Correo:', correo);
      const response = await fetch(`http://localhost:3000/api/preguntaSeguridad/${correo}`);
      if (response.ok) {
        const responseData = await response.json();
        setDescripcionP(responseData.descripcion);
      } else {
        console.error('Error al obtener pregunta de seguridad:', response.status);
        Alert.alert('Error', 'Error al obtener pregunta de seguridad');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      Alert.alert('Error', 'Error al realizar la petición');
    }
  };

  const validarRespuesta = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/verificarRespuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          respuesta: respuestaUsuario,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.esValido) {
          setEsValido(true);
          setContrasenaTemporal(responseData.contrasenaTemporal);
        } else {
          setSeIntentoValidar(true);
          setEsValido(false);
        }
      } else {
        console.error('Error al validar respuesta:', response.status);
        Alert.alert('Error', 'Error al validar respuesta');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      Alert.alert('Error', 'Error al realizar la petición');
    }
  };

  useEffect(() => {
    obtenerPreguntaSeguridad();
  }, []);


  console.log('Descripcion de Pregunta:', descripcionP);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Validación de Seguridad</Text>
      <Text>Por favor, responde la pregunta de seguridad:</Text>
      <Text style={styles.question}>{descripcionP}</Text>
      <TextInput
        value={respuestaUsuario}
        onChangeText={(text) => setRespuestaUsuario(text)}
        placeholder="Ingrese su respuesta"
        style={styles.input}
      />
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={validarRespuesta}>
          <Text style={styles.buttonText}>Validar Respuesta</Text>
        </TouchableOpacity>
      </View>
  
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.link}>Regresar a Login</Text>
      </TouchableOpacity>
  
      {seIntentoValidar && !esValido && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>La respuesta es incorrecta.</Text>
        </View>
      )}
  
      {esValido && (
        <View style={styles.successAlert}>
          <Text style={styles.alertText}>¡La respuesta es válida!</Text>
          <Text>Tu contraseña temporal es: {contrasenaTemporal}</Text>
        </View>
      )}
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
  heading: {
    color: '#088a88',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  question: {
    fontSize: 15,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontWeight: 'bold', 
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  link: {
    color: '#088a88',
  },
  button: {
    backgroundColor: '#088a88',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: '#ffdddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  successAlert: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  alertText: {
    color: '#721c24',
  },
});

export default ValidacionP;