import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import UriEntrega from '../../models/UriEntrega';
import Pedido from '../../models/Pedido';

const PedidoInfo = ({ route, navigation }) => {
  const { idPedido, uriImagen, pedidoActual } = route.params; // Obtenemos el id del pedido desde las params
  const [image, setImage] = useState(uriImagen);
  const [pedido, setPedido] = useState(null);
  const [pedidoactual, setPedidoActual] = useState(null);

  // Logs para verificar los valores de las props
  console.log("ID del pedido:", pedido);
  console.log("Pedido del item:", pedidoactual);

  //console.log("Pedido filtrado:", filteredPedido);

    // Cargar id del pedido al montar el componente
    useEffect(() => {
      // Verificar si idPedido tiene un valor válido
      if (idPedido) {
        setPedido(idPedido); // Solo actualizar el estado del pedido si idPedido es válido
        setPedidoActual(pedidoActual);
      }
      // Si idPedido no es válido (undefined, null), no hacer nada
    }, [idPedido]); // Dependencia: idPedido


  // Utilizando useCallback para definir la función que se pasará a useFocusEffect
  const handleFocusEffect = React.useCallback(() => {
    // Resetear la imagen cuando el componente está enfocado
    setImage(uriImagen); // Actualizar la imagen cuando cambie uriImagen
    const imagenInstance = new UriEntrega(uriImagen);
    imagenInstance.setUri(uriImagen);




    return () => {
      // Limpiar cualquier limpieza necesaria cuando el componente pierda el foco
      setImage(null);
      imagenInstance.clearUri();
    };
  }, [uriImagen]); // Dependencia: uriImagen
  

  // Usar useFocusEffect con la función definida por useCallback
  useFocusEffect(handleFocusEffect);

  // Aquí deberías cargar los datos del pedido según el id
  // Función para navegar a ImageUpload
  const handleCargarImagen = () => {
    navigation.navigate('ImageUpload');
  }

    // Función para abrir Google Maps con las coordenadas proporcionadas
    const handleOpenGoogleMaps = () => {
      const { lat, lng } = pedidoactual.address;
      const url = `http://maps.google.com/maps?q=${lat},${lng}`;
      Linking.openURL(url);
    };

    const handleSubmit= async () => {

      const imagenInstance = new UriEntrega(uriImagen);
      const url = await imagenInstance.uploadImage();


        console.log(uriImagen)
        console.log(url)
        try {
            const response = await fetch('https://app-ds-9-backend.vercel.app/pedidos/'+pedido, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagen: url}),
            });

            if (response.ok) {
                const data = await response.json();
                // Manejar la respuesta del backend según sea necesario
                console.log(data);

              // Mostrar un toast indicando que el pedido se ha completado
              ToastAndroid.show('Pedido completado', ToastAndroid.SHORT);
              navigation.navigate('PedidosScreen', { refresh: true });

            } else {
                // Manejar errores de autenticación
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Mapa del Pedido</Text>
          <TouchableOpacity onPress={handleOpenGoogleMaps} style={styles.mapContainer}>
            <Image source={require('../../images/map.jpg')} style={styles.mapa} />
          </TouchableOpacity>
          <Text style={styles.subtitle}>Info:</Text>
          {pedidoactual ? (
            <View style={styles.infoContainer}> 
              <Text style={styles.infoText}>Dirección: {pedidoactual.address ? pedidoactual.address.address : 'No especificada'}</Text>
              <Text style={styles.infoText}>Descripción: {pedidoactual.address.description}</Text>
              <Text style={styles.infoText}>Fecha de envío: {pedidoactual.shippingDate.split('T')[0]}</Text>
              <Text style={styles.infoText}>Nombre del Cliente: {pedidoactual.user.name + ' ' + pedidoactual.user.lastName}</Text>
              <Text style={styles.infoText}>Teléfono: {pedidoactual.user.phoneNumber}</Text>
              <Text style={styles.subtitle}>Cervezas:</Text>
              <View style={styles.beerContainer}>
                {pedidoactual.beers.map((beer, index) => (
                  <View key={index} style={styles.beerItem}>
                    <Image source={{ uri: beer.beer.image }} style={styles.beers} />
                    <Text style={styles.infoText}>{beer.beer.name} - Cantidad: {beer.quantity}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.infoText}>Información del pedido no disponible.</Text>
          )}
          <Text style={styles.subtitle}>Imagen:</Text>
          <TouchableOpacity style={styles.button} onPress={handleCargarImagen}>
            <Text style={styles.buttonText}>Cargar Imagen</Text>
          </TouchableOpacity>
          {image && (
            <View style={{ flex: 1 }}>
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            </View>
          )}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Entregar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#121212',
    },
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingTop: 20,
    },
    title: {
      color: '#d4af37',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    infoContainer: {
      backgroundColor: '#1c1c1c',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    infoText: {
      color: '#fff',
      fontSize: 18,
      marginBottom: 10,
    },
    mapContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    mapa: {
      width: '90%',
      height: 150,
      borderRadius: 10,
    },
    beerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    beerItem: {
      width: '48%',
      marginBottom: 10,
    },
    beers: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#d4af37',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    submitButton: {
      marginTop: 20,
      backgroundColor: '#d4af37',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 30,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    uploadedImage: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginTop: 10,
    },
  });

export default PedidoInfo;
