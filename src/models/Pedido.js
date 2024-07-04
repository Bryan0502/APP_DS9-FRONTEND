class Pedido {
  constructor( ) {
    this.pedido = null;
  }

  // Método para obtener los pedidos
  getPedido() {
    return this.pedido;
  }

  // Método para establecer los pedidos
  setPedido(pedido) {
    this.pedido = pedido;
  }

  // Método para filtrar por ID
  filterById(id) {
      if (!Array.isArray(this.pedido)) {
        throw new Error('Pedido must be an array.');
      }
  
      const foundObject = this.pedido.find(item => item._id === id);
  
      return foundObject;
  }
}

export default Pedido;