import React, { Component, useRef } from 'react';
import { View, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

class ImageCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
    };
    this.cameraRef = useRef(null);
  }

  takePhoto = async () => {
    if (this.cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await this.cameraRef.current.takePictureAsync(options);
        console.log('URI de la imagen capturada:', data.uri);
        this.setState({ imageUri: data.uri });
      } catch (error) {
        console.error('Error al capturar imagen:', error);
      }
    }
  };

  render() {
    const { imageUri } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <RNCamera
            ref={this.cameraRef}
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Tomar Foto" onPress={this.takePhoto} />
        </View>
        {imageUri && (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
          </View>
        )}
      </View>
    );
  }
}

export default ImageCapture;
