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

}

export default UriEntrega;
