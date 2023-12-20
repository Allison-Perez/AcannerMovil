import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginForm from './LoginForm'
import RegisterScreen from './RegisterScreen'

const IndexScreen = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  const navigateToRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("./assets/logoVerde.png") as ImageSourcePropType} style={styles.logo} />
        <Text style={styles.title}>ACANNER</Text>
        <Text style={styles.paragraph}>
          Bienvenido a Acanner, tu compañero en la planificación académica
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={navigateToRegister}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
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
    backgroundColor: "#F4FCFF",
  },
  logo: {
    width: 130,
    height: 130,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    color: '#088a88',
  },
  paragraph: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#088a88",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "90%",
  },
  registerButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#088a88",
    padding: 15,
    borderRadius: 5,
    width: "90%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  registerButtonText: {
    color: "#056b69",
    textAlign: "center",
    fontSize: 16,
  },
});

export default IndexScreen;
