export default class OcheNetwork {

    constructor() {
        this.socket = io.connect();
    }

    getSocket() {
         return this.socket;
    }
}