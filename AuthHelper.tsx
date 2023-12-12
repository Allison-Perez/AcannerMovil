// AuthHelper.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarCorreoUsuario = async (correo: string) => {
  try {
    await AsyncStorage.setItem('correo_usuario', correo);
    console.log('Correo del usuario guardado en AsyncStorage.');
  } catch (error) {
    console.error('Error al guardar el correo del usuario:', error);
  }
};

export const obtenerCorreoUsuario = async (): Promise<string | null> => {
  try {
    const correo = await AsyncStorage.getItem('correo_usuario');
    console.log('Correo del usuario obtenido desde AsyncStorage:', correo);
    return correo;
  } catch (error) {
    console.error('Error al obtener el correo del usuario desde AsyncStorage:', error);
    return null;
  }
};
