// UserSession.js
class UserSession {
    constructor() {
        this.userId = null;
        this.userData = null;
        this.userPedidos = null;
    }

    setUserId(id) {
        this.userId = id;
    }

    getUserId() {
        return this.userId;
    }

    clearUserId() {
        this.userId = null;
    }

    setUserData(data) {
        this.userData = data;
    }

    getUserData() {
        return this.userData;
    }

    setUserPedidos(pedidos) {
        this.userPedidos = pedidos;
    }

    getUserPedidos() {
        return this.userPedidos;
    }
}

export default new UserSession(); // Singleton instance
