import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PedidoInfo from '../components/pedidos/PedidoInfo';

const Stack = createStackNavigator();

// pedidos quemados
const pedidosData = [
  { id: 1, nombre: 'Pedido 1', ubicacion: 'Ubicación 1', estado: 'nuevo' },
  { id: 2, nombre: 'Pedido 2', ubicacion: 'Ubicación 2', estado: 'pendiente' },
  { id: 3, nombre: 'Pedido 3', ubicacion: 'Ubicación 3', estado: 'completado' },
  { id: 4, nombre: 'Pedido 4', ubicacion: 'Ubicación 1', estado: 'nuevo' },
  { id: 5, nombre: 'Pedido 5', ubicacion: 'Ubicación 2', estado: 'pendiente' },
  { id: 6, nombre: 'Pedido 6', ubicacion: 'Ubicación 3', estado: 'completado' },
];

const Pedidos = ({ navigation }) => {
  const [pedidos, setPedidos] = useState(pedidosData);
  const [filtro, setFiltro] = useState('nuevo');

  // filtrar pedidos por estados
  const filtrarPedidos = (estado) => {
    if (estado === 'nuevo') {
      setPedidos(pedidosData.filter(pedido => pedido.estado === 'nuevo'));
    } else if (estado === 'pendiente') {
      setPedidos(pedidosData.filter(pedido => pedido.estado === 'pendiente'));
    } else {
      setPedidos(pedidosData.filter(pedido => pedido.estado === 'completado'));
    }
    setFiltro(estado);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="PedidosScreen" options={{ headerShown: false }}>
        {(props) => <PedidosScreen {...props} navigation={navigation} pedidos={pedidos} filtrarPedidos={filtrarPedidos} filtro={filtro} />}
      </Stack.Screen>
      <Stack.Screen name="PedidoInfo" component={PedidoInfo} />
    </Stack.Navigator>
  );
};

// ppara renderizar los pedidos, ver el listado
const PedidosScreen = ({ navigation, pedidos, filtrarPedidos, filtro }) => {
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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filtro === 'nuevo' && styles.filterButtonSelected]}
          onPress={() => filtrarPedidos('nuevo')}
        >
          <Text style={[styles.filterButtonText, filtro === 'nuevo' && styles.filterButtonTextSelected]}>Nuevos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filtro === 'pendiente' && styles.filterButtonSelected]}
          onPress={() => filtrarPedidos('pendiente')}
        >
          <Text style={[styles.filterButtonText, filtro === 'pendiente' && styles.filterButtonTextSelected]}>Pendientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filtro === 'completado' && styles.filterButtonSelected]}
          onPress={() => filtrarPedidos('completado')}
        >
          <Text style={[styles.filterButtonText, filtro === 'completado' && styles.filterButtonTextSelected]}>Completados</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ffd414',
  },
  item: {
    backgroundColor: '#d4af37',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  button: {
    backgroundColor: '#121212',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  filterButton: {
    backgroundColor: '#212121',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
  filterButtonSelected: {
    backgroundColor: '#d4af37',
  },
  filterButtonTextSelected: {
    color: '#000',
  },
});

export default Pedidos;