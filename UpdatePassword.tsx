import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import NavAdmin from './NavAdmin';

const UpdatePassword = ({ route }: { route: { params: { correo: string } } }) => {
  const { correo } = route.params;
  const [passwordAnterior, setPasswordAnterior] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensajeState] = useState<{ texto: string; exito: boolean } | null>(null);

  const cambiarContrasena = async () => {
    try {
      if (nuevaPassword !== confirmarPassword) {
        setMensajeState({ texto: 'Las contraseñas no coinciden', exito: false });
        return;
      }

      if (nuevaPassword.length < 8) {
        setMensajeState({ texto: 'La nueva contraseña debe tener al menos 8 caracteres', exito: false });
        return;
      }

      const response = await fetch('http://localhost:3000/api/cambiar-contrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo,
          passwordAnterior,
          nuevaPassword,
        }),
      });

      if (response.ok) {
        setMensajeState({ texto: 'Contraseña cambiada con éxito', exito: true });
      } else {
        const errorData = await response.json();
        setMensajeState({ texto: errorData.message || 'Error al cambiar la contraseña', exito: false });
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setMensajeState({ texto: 'Error al cambiar la contraseña', exito: false });
    }
  };

  const limpiarMensaje = () => {
    setMensajeState(null);
  };

  return (
    <View style={styles.container}>
    <NavAdmin />
      {mensaje && (
        <View style={[styles.mensajeContainer, { backgroundColor: mensaje.exito ? '#95c799' : '#ff7b5a' }]}>
          <Text style={styles.mensaje}>{mensaje.texto}</Text>
          {mensaje.exito && (
            <TouchableOpacity onPress={limpiarMensaje}>
              <Text style={styles.limpiarMensaje}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.formContainer}>
        <Text style={styles.title}>Cambiar Contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Contraseña anterior"
          secureTextEntry
          onChangeText={(text) => setPasswordAnterior(text)}
          value={passwordAnterior}
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          secureTextEntry
          onChangeText={(text) => setNuevaPassword(text)}
          value={nuevaPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          onChangeText={(text) => setConfirmarPassword(text)}
          value={confirmarPassword}
        />

        <TouchableOpacity style={styles.btnPrimary} onPress={cambiarContrasena}>
          <Text style={styles.btnText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
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
  mensajeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  mensaje: {
    color: 'white',
    fontSize: 16,
  },
  limpiarMensaje: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  btnPrimary: {
    backgroundColor: '#088a88',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdatePassword;
