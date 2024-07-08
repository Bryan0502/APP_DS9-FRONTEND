import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PedidoInfo from '../components/pedidos/PedidoInfo';
import ImageUpload from '../components/pedidos/ImageUpload';
import UserSession from '../models/UserSession';
import Pedido from '../models/Pedido';

const Stack = createStackNavigator();

let bryan = 0;

// Función para obtener los pedidos desde el backend
async function fetchShipments(userId) {
  try {
    const response = await fetch('https://app-ds-9-backend.vercel.app/pedidos/'+userId);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

const Pedidos = ({ navigation }) => {
  const [pedidosData, setPedidosData] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('pending');

  useEffect(() => {
    if (bryan === 0) {
      bryan = 1;
      const userId = UserSession.getUserId();
      fetchShipments(userId)
        .then(data => {
          const pedidoInstance = new Pedido();
          pedidoInstance.setPedido(data);
          UserSession.setUserPedidos(data);
          console.log('Pedidos traidos de Pedido.js:', pedidoInstance.getPedido());
          setPedidos(data);
          setPedidosData(data);
          filtrarPedidos(filtro, data);
        })
        .catch(error => console.error('Error:', error));
    } else {
      setPedidos(pedidosData);
      filtrarPedidos(filtro, pedidosData);
    }
  }, [filtro]);

  const refreshShipments = () => {
    console.log('Refreshing shipments...');
    const userId = UserSession.getUserId();
    fetchShipments(userId)
      .then(data => {
        console.log(data);
        setPedidosData(data);
        filtrarPedidos(filtro, data);  // Filter the new data based on current filtro state
      })
      .catch(error => console.error('Error:', error));
  };

  const filtrarPedidos = (status, data = pedidos) => {
    if (status === 'pending') {
      setPedidos(data.filter(pedido => pedido.status === 'pending'));
    } else if (status === 'completed') {
      setPedidos(data.filter(pedido => pedido.status === 'completed'));
    }
    setFiltro(status);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="PedidosScreen" options={{ headerShown: false }}>
        {(props) => <PedidosScreen {...props} navigation={navigation} pedidos={pedidos} filtrarPedidos={filtrarPedidos} filtro={filtro} refreshShipments={refreshShipments} />}
      </Stack.Screen>
      <Stack.Screen name="PedidoInfo">
        {(props) => <PedidoInfo {...props} refreshShipments={refreshShipments} />}
      </Stack.Screen>
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
    </Stack.Navigator>
  );
};

const PedidosScreen = ({ navigation, route, pedidos, filtrarPedidos, filtro, refreshShipments }) => {
  
  useEffect(() => {
    if (route.params?.refresh) {
      refreshShipments();
    }
  }, [route.params?.refresh]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nombre}>Dirección: {item.address ? item.address.address : 'No especificada'}</Text>
      <Text>Fecha de envío: {item.shippingDate.split("T")[0]}</Text>
      <Text>ID: {item._id}</Text>
      {item.status !== 'completed' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PedidoInfo', { idPedido: item._id, pedidoActual: item, refreshShipments })}
        >
          <Text style={styles.buttonText}>Entregar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Pedidos</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filtro === 'pending' && styles.filterButtonSelected]}
          onPress={() => filtrarPedidos('pending')}
        >
          <Text style={[styles.filterButtonText, filtro === 'pending' && styles.filterButtonTextSelected]}>Pendientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filtro === 'completed' && styles.filterButtonSelected]}
          onPress={() => filtrarPedidos('completed')}
        >
          <Text style={[styles.filterButtonText, filtro === 'completed' && styles.filterButtonTextSelected]}>Completados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={refreshShipments}
        >
          <Text style={styles.refreshButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}  // Handle undefined ids
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
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  filterButton: {
    backgroundColor: '#212121',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
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
  refreshButton: {
    backgroundColor: '#212121',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#ffd414',
    fontWeight: 'bold',
  },
});

export default Pedidos;
