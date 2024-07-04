import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';
import UserSession from '../models/UserSession';

const Perfil = ({ handleLogout }) => {

  const perfil = UserSession.getUserData();
  const pedidos = UserSession.getUserPedidos();
  console.log('Pedidos en Perfil:', pedidos);

  const repartidor = {
    avatar: 'https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain'
  };

    // Función para renderizar cada item de pedido
    const renderDeliveryItem = ({ item }) => (
      <View style={styles.deliveryItem}>
        <Text style={styles.deliveryText}>Dirección: {item.address.address}</Text>
        <Text style={styles.deliveryText}>Fecha de Envío: {item.shippingDate.split("T")[0]}</Text>
        <Text style={styles.deliveryText}>ID: {item._id}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hola, {perfil.name}!</Text>
        <Image source={{ uri: repartidor.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {perfil.email}</Text>
        <Text style={styles.infoText}>Teléfono: {perfil.phoneNumber}</Text>
        <Text style={styles.infoText}>Fecha de Nacimiento: {perfil.birthDate.split("T")[0]}</Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
        <FlatList
          data={pedidos}
          renderItem={renderDeliveryItem}
          keyExtractor={item => item._id}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#d4af37',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  historyContainer: {
    marginTop: 20,
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryItem: {
    backgroundColor: '#2c2c2c',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  deliveryText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#d4af37',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Perfil;
