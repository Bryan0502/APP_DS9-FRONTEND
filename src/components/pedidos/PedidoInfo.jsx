import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PedidoInfo = ({ route, navigation }) => {
  const { idPedido } = route.params; // Obtenemos el id del pedido desde las params

  // Aquí deberías cargar los datos del pedido según el id

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre del Pedido</Text>
      <Image source={require('../../images/map.jpg')} style={styles.mapa} />
      <Text style={styles.subtitle}>Info:</Text>
      {/* Aquí muestra la información del pedido */}
      <Text>Información del pedido...</Text>
      <Text style={styles.subtitle}>Imagen:</Text>
      {/* Aquí puedes permitir al usuario cargar una imagen */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cargar Imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pedidos')}>
        <Text style={styles.buttonText}>Entregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD414',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  mapa: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFD414',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PedidoInfo;
