import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    fecha_nacimiento: "",
    correo: "",
    pregunta_seguridad: "",
    id_usuario: "",
    ficha: "2558104",
    password: "",
    respuesta_seguridad: "",
  });

  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");
  const [selectedNumeroFicha, setSelectedNumeroFicha] = useState("2558104");
  const [selectedPreguntaSeguridad, setSelectedPreguntaSeguridad] =useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);


  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePicker();
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:19006",  
        },
        body: JSON.stringify({
          primer_nombre: formData.primer_nombre,
          segundo_nombre: formData.segundo_nombre,
          primer_apellido: formData.primer_apellido,
          segundo_apellido: formData.segundo_apellido,
          tipo_documento: selectedTipoDocumento,
          fecha_nacimiento: date.toISOString().split("T")[0],
          correo: formData.correo,
          pregunta_seguridad: selectedPreguntaSeguridad,
          id_usuario: formData.id_usuario,
          ficha: selectedNumeroFicha,
          password: formData.password,
          respuesta_seguridad: formData.respuesta_seguridad,
        }),
      });

      if (response.ok) {
        Alert.alert("Registro exitoso", "Usuario registrado exitosamente", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log("Usuario registrado exitosamente");
      } else {
        console.error("Error al registrar el usuario");
      const errorData = await response.json();
      console.error("Detalles del error:", errorData);
      }
    } catch (error) {
      console.error("Error de red al registrar el usuario", error);
      
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>¡Regístrate!</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Primer nombre"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, primer_nombre: text })
              }
              value={formData.primer_nombre}
            />
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Segundo nombre"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, segundo_nombre: text })
              }
              value={formData.segundo_nombre}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Primer apellido"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, primer_apellido: text })
              }
              value={formData.primer_apellido}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Segundo apellido"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, segundo_apellido: text })
              }
              value={formData.segundo_apellido}
            />
          </View>


          <View style={styles.inputContainer}>
            <Picker
              selectedValue={selectedTipoDocumento}
              onValueChange={(itemValue) => setSelectedTipoDocumento(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Selecciona tipo de documento" value="" />
              <Picker.Item label="CC" value="1" />
              <Picker.Item label="TI" value="2" />
              <Picker.Item label="CE" value="3" />
            </Picker>
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Número de documento"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, id_usuario: text })
              }
              value={formData.id_usuario}
            />
          </View>


          <View style={styles.inputContainer}>
            {!showPicker && (
              <TouchableWithoutFeedback onPress={toggleDatePicker}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInputLabel}>Fecha de Nacimiento</Text>
                  <Text style={styles.dateInputValue}>
                    {showPicker ? "Selecciona una fecha" : date.toDateString()}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
              />
            )}
          </View>


          <View style={styles.inputContainer}>
            <Picker
              selectedValue={selectedNumeroFicha}
              onValueChange={(itemValue) =>
                setSelectedNumeroFicha(itemValue)
              }
              style={{ height: 40, width: 150 }}
            >
              <Picker.Item label="Número de ficha" value="" />
              <Picker.Item label="2558104" value="2558104" />
            </Picker>
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Correo"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, correo: text })
              }
              value={formData.correo}
            />
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              secureTextEntry
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              value={formData.password}
            />
          </View>


          <View style={styles.inputContainer}>
            <Picker
              selectedValue={selectedPreguntaSeguridad}
              onValueChange={(itemValue) =>
                setSelectedPreguntaSeguridad(itemValue)
              }
              style={styles.input}
            >
              <Picker.Item label="Pregunta de seguridad" value="" />
              <Picker.Item
                label="Nombre de tu primera mascota"
                value="1"
              />
              <Picker.Item
                label="Ciudad donde naciste"
                value="2"
              />
              <Picker.Item
                label="Nombre de tu mejor amigo"
                value="3"
              />
              <Picker.Item label="Cantante favorito" value="4" />
              <Picker.Item label="Comida favorita" value="5" />
              <Picker.Item
                label="Nombre de tu profesor favorito"
                value="6"
              />
            </Picker>
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Respuesta de seguridad"
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, respuesta_seguridad: text })
              }
              value={formData.respuesta_seguridad}
            />
          </View>


        </View>
        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>


      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "sans-serif",
    color: "#088a88",
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  formContainer: {
    width: "100%",
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#000", 
  },
  dateInputContainer: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  dateInputLabel: {
    color: "#6c6e6b",
  },
  dateInputValue: {
    color: "#C0C0C0",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 12,
  },
  button: {
    backgroundColor: "#088a88",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
