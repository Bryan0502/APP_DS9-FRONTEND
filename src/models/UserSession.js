// UserSession.js
class UserSession {
    constructor() {
        this.userId = null;
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
}

export default new UserSession(); // Singleton instance
