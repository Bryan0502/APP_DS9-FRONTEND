/* eslint-disable prettier/prettier */
// Login.js
import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';

const Login = ({ onLogin }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aqui se agrega la logica de inicio de sesion
        onLogin();
      };

  return (
    <View style={styles.container}>
        
      <Text style={styles.text}>Hola, Logeate!</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD414',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Ajusta el margen según sea necesario
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;
