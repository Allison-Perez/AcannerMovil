import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { Pdf } from 'react-native-pdf';

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
    try {
      console.log('Antes de fetch');
    
      if (!archivo) {
        Alert.alert('Alerta', 'Por favor, selecciona un archivo.');
        return;
      }
    
      const formData = new FormData();
      const archivoBlob = new Blob([archivo], { type: 'application/pdf' });
    
      formData.append('archivo', archivoBlob, 'nombre-archivo.pdf');
      formData.append('nombreArchivo', titulo);
      formData.append('comentario', contenido);
    
      console.log('FormData:', formData);
    
      const response = await fetch('http://localhost:3000/api/actividad/create', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      console.log('Código de estado de la respuesta:', response.status);
      console.log('Cuerpo de la respuesta:', await response.text());
    
      if (response.ok) {
        console.log('Respuesta exitosa:', await response.text());
      } else {
        console.error('Error en la respuesta:', await response.text());
      }
    } catch (error) {
      console.error('Error en handleGuardar:', error);
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
        {archivo && <Text>{archivo.name || archivo.uri.split('/').pop()}</Text>}
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