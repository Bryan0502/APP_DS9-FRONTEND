/* eslint-disable prettier/prettier */
// Perfil.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Perfil = ({ handleLogout }) => {




  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hola, Perfil!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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

export default Perfil;