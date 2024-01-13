import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { PDFView } from 'react-native-pdf';

const GuiasInstructor: React.FC = () => {
  const navigation = useNavigation();
  const [guias, setGuias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [archivo, setArchivo] = useState<any>(null);
  const [contenido, setContenido] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/actividad/list'); 
      const data = await response.json();
      setGuias(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleOpenPDF = (archivoUrl: string) => {
    // Navegar a la pantalla que muestra el PDF
    navigation.navigate('VistaPDF', { archivoUrl });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEliminar = async (id_guia: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/actividad/delete/${id_guia}`, {
        method: 'DELETE',
      });
      const deleted = await response.json();

      if (deleted) {
        fetchData();
      } else {
        Alert.alert('Error', 'Fallo al eliminar la guía');
      }
    } catch (error) {
      console.error('Error al eliminar la guía:', error);
    }
  };

  const handleGuardar = async () => {
    if (!archivo) {
      Alert.alert('Alerta', 'Por favor, selecciona un archivo.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('archivo', archivo);

      formData.append('nombreArchivo', titulo);
      formData.append('comentario', contenido);

      const response = await fetch('http://localhost:3000/api/actividad/create', {
        method: 'POST',
        body: formData,
      });

      const saved = await response.json();

      if (saved) {
        fetchData();
        Alert.alert('Éxito', 'Guía guardada exitosamente');
      } else {
        Alert.alert('Error', 'Fallo al guardar la guía');
      }
    } catch (error) {
      console.error('Error al guardar la guía:', error);
    }

    setTitulo('');
    setArchivo(null);
    setContenido('');
  };

  const handleEditar = (guia: any) => {
    navigation.navigate('EditarGuiaInstructor', { guia });
  };
  

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.type === 'success') {
        setArchivo(result);
      }
    } catch (err) {
      console.error('Error al seleccionar el documento:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Nueva Guía</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <Button title="Seleccionar Archivo" onPress={pickDocument} />
        {archivo && <Text>{archivo.name}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Contenido"
          multiline
          value={contenido}
          onChangeText={setContenido}
        />
        <Button title="Guardar" onPress={handleGuardar} />
      </View>
      <Text style={styles.title}>Guías del Instructor</Text>
      <ScrollView style={styles.scrollView}>
        {guias.map((guia: any) => (
          <View key={guia.id} style={styles.guiaContainer}>
            <Text style={styles.guiaTitulo}>{guia.titulo}</Text>
            <Button title="Editar" onPress={() => handleEditar(guia)} />
            <Button title="Eliminar" onPress={() => handleEliminar(guia.id)} />
            <Button title="Abrir PDF" onPress={() => handleOpenPDF(guia.archivoUrl)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    marginBottom: 16,
  },
  guiaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  guiaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
});

export default GuiasInstructor;