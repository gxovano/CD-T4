import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

class Socket {
    #instanceSocket; 
    eventBus;
    constructor(port, eventBus) {
        this.eventBus = eventBus;
        this.#instantiateSocket(port, eventBus);
    }

    #instantiateSocket(port) {
        this.#instanceSocket = dgram.createSocket('udp4');
        
        this.#instanceSocket.on('error', (err) => {
            console.error(`server error:\n${err.stack}`);
            this.#instanceSocket.close();
        });
        
        this.#instanceSocket.on('message', (msg, rinfo) => {
            let message = JSON.parse(msg);
            this.eventBus.emit('newMessageFromSocket', message, rinfo.address, rinfo.port);
        });
        
        this.#instanceSocket.on('listening', () => {
            const address = this.#instanceSocket.address();
        });

        this.eventBus.on('sendToAnotherNode', (message) => {
            this.send(message, this.eventBus.remote().ip, this.eventBus.remote().port);
        });
        
        this.#instanceSocket.bind(port);
    }

    send(message, ip, port) {
        let messageBuffer = Buffer.from(JSON.stringify(message));
        this.#instanceSocket.send(messageBuffer, port, 'localhost', (err)=> {
            console.log(err);
        });
    }
}

export default Socket; 