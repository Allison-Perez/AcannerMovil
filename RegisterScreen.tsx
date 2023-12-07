import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "",
    fechaNacimiento: "",
    correo: "",
    preguntaSeguridad: "",
    numeroDocumento: "",
    numeroFicha: "2558104",
    contrasena: "",
    respuestaSeguridad: "",
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
          ...formData,
          tipoDocumento: selectedTipoDocumento,
          fechaNacimiento: date.toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
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
            <TextInput placeholder="Primer nombre" style={styles.input} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Segundo nombre" style={styles.input} />
          </View>


          <View style={styles.inputContainer}>
            <TextInput placeholder="Primer apellido" style={styles.input} />
          </View>


          <View style={styles.inputContainer}>
            <TextInput placeholder="Segundo apellido" style={styles.input} />
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
            <TextInput placeholder="Número de documento" style={styles.input} />
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
              onValueChange={(itemValue) => setSelectedNumeroFicha(itemValue)}
              style={{ height: 50, width: 200 }}
            >
              <Picker.Item label="Número de ficha" value="" />
              <Picker.Item label="2558104" value="2558104" />
            </Picker>
          </View>


          <View style={styles.inputContainer}>
            <TextInput placeholder="Correo" style={styles.input} />
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              secureTextEntry
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
              <Picker.Item label="Nombre de tu primera mascota" value="1" />
              <Picker.Item label="Ciudad donde naciste" value="2" />
              <Picker.Item label="Nombre de tu mejor amigo" value="3" />
              <Picker.Item label="Cantante favorito" value="4" />
              <Picker.Item label="Comida favorita" value="5" />
              <Picker.Item label="Nombre de tu profesor favorito" value="6" />
            </Picker>
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Respuesta de seguridad"
              style={styles.input}
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
