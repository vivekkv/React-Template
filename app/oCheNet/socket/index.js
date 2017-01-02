export default class Socket {

    constructor() {
        this.socket = null;
    }

    connect() {
        var socket = io.connect();
        socket.on('hi baby', function(data){
        });
        socket.emit("sayHello", { message: "poo" })
    }

    
}