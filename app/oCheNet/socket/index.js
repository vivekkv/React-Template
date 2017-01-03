export default class Socket {

    constructor() {
        this.socket = null;
    }

    init() {
        this.socket = io.connect();
    }

    getSocket() {
        return this.socket
    }
}