import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const RecuperarP = () => {
  const [correo, setCorreo] = useState('');
  const [showError, setShowError] = useState(false);
  const navigation = useNavigation(); 

  const handleRecuperarSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/recuperar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Origin": "http://localhost:19006", 
        },
        body: JSON.stringify({ correo }),
      });

      console.log('Respuesta de fetch:', response);

      if (response.status === 200) {
        console.log('Funciona');
        
        navigation.navigate('ValidacionP' as never, { correo } as never);
           
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error en la recuperación de contraseña:', error);
      setShowError(true);
    }
  };

  console.log('Renderizando componente RecuperarP');

  return (
    <View style={styles.container}>
      <View style={styles.containerFormRecover}>
        <Text style={styles.titleRecover}>Recuperar Cuenta</Text>
        <Text style={styles.lead}>Ingresa tu correo electrónico para buscar tu cuenta.</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(text) => setCorreo(text)}
          value={correo}
          keyboardType="email-address"
        />

        <View style={styles.containerLinkForm}>
          <TouchableOpacity onPress={handleRecuperarSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Buscar Cuenta</Text>
          </TouchableOpacity>
        </View>

        {showError && (
          <View style={styles.alert}>
            <Text style={styles.alertText}>Credenciales inválidas. El correo no existe.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFormRecover: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '80%',
  },
  titleRecover: {
    color: '#088a88',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lead: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  containerLinkForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#088a88',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alert: {
    marginTop: 16,
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 4,
  },
  alertText: {
    color: '#fff',
  },
});

export default RecuperarP;
