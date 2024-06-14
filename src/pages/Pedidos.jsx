import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PedidoInfo from '../components/pedidos/PedidoInfo';

const Stack = createStackNavigator();

// Definimos pedidos fuera de la función Pedidos
const pedidos = [
  { id: 1, nombre: 'Pedido 1', ubicacion: 'Ubicación 1' },
  { id: 2, nombre: 'Pedido 2', ubicacion: 'Ubicación 2' },
  { id: 3, nombre: 'Pedido 3', ubicacion: 'Ubicación 3' },
  // Puedes agregar más pedidos aquí según sea necesario
];

const Pedidos = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PedidosScreen" options={{ headerShown: false }}>
        {(props) => <PedidosScreen {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="PedidoInfo" component={PedidoInfo} />
    </Stack.Navigator>
  );
};

const PedidosScreen = ({ navigation }) => {
  // Renderizar un elemento de pedido
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>{item.ubicacion}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PedidoInfo', { idPedido: item.id })}
      >
        <Text style={styles.buttonText}>Entregar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Pedidos</Text>
      {/* Utilizamos FlatList con renderItem */}
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD414',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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

export default Pedidos;
