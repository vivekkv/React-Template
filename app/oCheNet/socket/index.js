export default class Socket {

    constructor() {
        this.socket = null;
    }

    init() {
        this.socket = io.connect();
        this.socket.on('hi baby', function(data){
            
        });
        this.socket.emit("sayHello", { message: "poo" })
    }

    getSocket() {
        return this.socket
    }
}