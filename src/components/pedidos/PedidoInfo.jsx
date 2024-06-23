import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import UriEntrega from '../../models/UriEntrega';

const PedidoInfo = ({ route, navigation }) => {
  const { idPedido, uriImagen } = route.params; // Obtenemos el id del pedido desde las params
  const [image, setImage] = useState(uriImagen);

  // Utilizando useCallback para definir la función que se pasará a useFocusEffect
  const handleFocusEffect = React.useCallback(() => {
    // Resetear la imagen cuando el componente está enfocado
    setImage(uriImagen); // Actualizar la imagen cuando cambie uriImagen
    return () => {
      // Limpiar cualquier limpieza necesaria cuando el componente pierda el foco
      setImage(null);
    };
  }, [uriImagen]); // Dependencia: uriImagen

  // Usar useFocusEffect con la función definida por useCallback
  useFocusEffect(handleFocusEffect);

  // Aquí deberías cargar los datos del pedido según el id
  // Función para navegar a ImageUpload
  const handleCargarImagen = () => {
    navigation.navigate('ImageUpload');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre del Pedido</Text>
      <Image source={require('../../images/map.jpg')} style={styles.mapa} />
      <Text style={styles.subtitle}>Info:</Text>
      {/* Aquí muestra la información del pedido */}
      <Text>Información del pedido...</Text>
      <Text style={styles.subtitle}>Imagen:</Text>
      {/* Aquí puedes permitir al usuario cargar una imagen */}
      <TouchableOpacity style={styles.button} onPress={handleCargarImagen}>
        <Text style={styles.buttonText}>Cargar Imagen</Text>
      </TouchableOpacity>
      {image && (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        </View>
      )}
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
