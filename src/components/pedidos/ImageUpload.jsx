import React, { useState, useRef, useCallback } from 'react';
import { View, Button, Image } from 'react-native';
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
        navigation.navigate('PedidoInfo', { idPedido: 'idPedidoEjemplo', uriImagen: data.uri });
      } catch (error) {
        console.error('Error al capturar imagen:', error);
      }
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button title="Tomar Foto" onPress={takePhoto} />
      </View>
    </View>
  );
};

export default ImageUpload;
