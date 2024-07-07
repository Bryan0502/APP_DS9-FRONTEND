// UriEntrega.js
class UriEntrega {
  constructor(uri) {
    this.uri = uri;
  }

  // Método para obtener la URI
  getUri() {
    return this.uri;
  }

  // Método para establecer la URI
  setUri(uri) {
    this.uri = uri;
  }

  clearUri() {
    this.uri = null;
  }

  // Método para subir la imagen
  async uploadImage() {
    console.log('Entra a upload Image');
    if (!this.uri) return;

    console.log('Hay imagen');
    const formData = new FormData();
    formData.append('image', {
      uri: this.uri,
      type: 'image/jpeg', // Puedes cambiar el tipo según el tipo de imagen que subas
      name: this.uri.split('/').pop(),
    });

    try {
      const response = await fetch('https://app-ds-9-backend.vercel.app/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Imagen subida y accesible en:', data.url);
      return data.url; // Puedes devolver la URL de la imagen subida si lo necesitas
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error; // Lanza el error para manejarlo donde se llama a uploadImage
    }
  }

}

export default UriEntrega;
