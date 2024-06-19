import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';

const Perfil = ({ handleLogout }) => {

  const repartidor = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+507 6000-0000',
    birthday: 'June 1st, 2000',
    avatar: 'https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain',
    deliveryHistory: [
      { id: '1', date: '2024-06-01', time: '10:30 AM', address: 'Calle 123, Ciudad de Panamá'},
      { id: '2', date: '2024-06-02', time: '2:15 PM', address: 'Avenida 456, Ciudad de Panamá'},
      { id: '3', date: '2024-06-02', time: '2:15 PM', address: 'Avenida 456, Ciudad de Panamá'},
      { id: '4', date: '2024-06-02', time: '2:15 PM', address: 'Avenida 456, Ciudad de Panamá'},

    ],
  };

  const renderDeliveryItem = ({ item }) => (
    <View style={styles.deliveryItem}>
      <Text style={styles.deliveryText}>Fecha: {item.date}</Text>
      <Text style={styles.deliveryText}>Hora: {item.time}</Text>
      <Text style={styles.deliveryText}>Dirección: {item.address}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hola, {repartidor.name}!</Text>
        <Image source={{ uri: repartidor.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {repartidor.email}</Text>
        <Text style={styles.infoText}>Teléfono: {repartidor.phone}</Text>
        <Text style={styles.infoText}>Fecha de Nacimiento: {repartidor.birthday}</Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
        <FlatList
          data={repartidor.deliveryHistory}
          renderItem={renderDeliveryItem}
          keyExtractor={item => item.id}
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
