// Pedido.js
class Pedido {
    constructor(pedido) {
      this.pedido = pedido;
    }

    // Método para obtener la URI
    getPedido() {
      return this.pedido;
    }
  
    // Método para establecer la URI
    setPedido(pedido) {
      this.pedido = pedido;
    }

    filterById(id) {
        // Ensure this.pedido is an array
        console.log('el array es> '+this.pedido);
        console.log('id es '+id);
        if (!Array.isArray(this.pedido)) {
          throw new Error('Pedido must be an array.');
        }
    
        // Find the object in the array based on _id
        const foundObject = this.pedido.find(item => item._id === id);
    
        return foundObject; // Return the found object or undefined if not found
    }
  }
  export default Pedido;
  