import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";

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
    numeroFicha: "",
    contrasena: "",
    respuestaSeguridad: "",
  });

  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tipoDocumento: selectedTipoDocumento,
        }),
      });

      if (response.ok) {
        // Registro exitoso, manejar según sea necesario
        console.log("Usuario registrado exitosamente");
      } else {
        // Manejar errores del servidor
        console.error("Error al registrar el usuario");
      }
    } catch (error) {
      // Manejar errores de red o cualquier otro tipo
      console.error("Error de red al registrar el usuario", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Regístrate!</Text>
      <View style={styles.formContainer}>
        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Primer nombre"
              style={[
                styles.input,
                { borderColor: "#C0C0C0", color: "#6c6e6b" },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Segundo nombre"
              style={[
                styles.input,
                { borderColor: "#C0C0C0", color: "#6c6e6b" },
              ]}
            />
          </View> 
        </View>
        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Primer apellido"
              style={[
                styles.input,
                { borderColor: "#C0C0C0", color: "#6c6e6b" },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Segundo apellido"
              style={[
                styles.input,
                { borderColor: "#C0C0C0", color: "#6c6e6b" },
              ]}
            />
          </View>
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
          <DatePicker
            style={{ width: 200 }}
            date={formData.fechaNacimiento}
            mode="date"
            placeholder="Fecha de nacimiento"
            format="YYYY-MM-DD"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                borderColor: "#C0C0C0",
              },

              dateText: {
                color: "#6c6e6b",
              },
            }}
            onDateChange={(date) =>
              setFormData({ ...formData, fechaNacimiento: date })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Correo"
            style={[styles.input, { borderColor: "#C0C0C0", color: "#6c6e6b" }]}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Pregunta de seguridad"
            style={[styles.input, { borderColor: "#C0C0C0", color: "#6c6e6b" }]}
          />
        </View>
        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Número de documento"
              style={[
                styles.input,
                { borderColor: "#C0C0C0", color: "#6c6e6b" },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Número de ficha"
              style={[
                styles.input,
                { borderColor: "#C0C0C0", color: "#6c6e6b" },
              ]}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Contraseña"
            style={[styles.input, { borderColor: "#C0C0C0", color: "#6c6e6b" }]}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Respuesta de seguridad"
            style={[styles.input, { borderColor: "#C0C0C0", color: "#6c6e6b" }]}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#088a88",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    margin: 2,
  },
  input: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#088a88",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
