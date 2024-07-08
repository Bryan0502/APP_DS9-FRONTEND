import React, { useState, useRef, useCallback } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import UriEntrega from '../../models/UriEntrega';

const ImageUpload = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const uriEntrega = new UriEntrega(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log('URI de la imagen capturada:', data.uri);
        uriEntrega.setUri(data.uri);
        navigation.navigate('PedidoInfo', {uriImagen: data.uri });
      } catch (error) {
        console.error('Error al capturar imagen:', error);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Tomar Foto" onPress={takePhoto} color="#d4af37" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
});


export default ImageUpload;
