import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

class Socket {
    #instanceSocket; 
    emitter;
    constructor(port, emitter) {
        this.emitter = emitter;
        this.#instantiateSocket(port, emitter);
    }

    #instantiateSocket(port) {
        this.#instanceSocket = dgram.createSocket('udp4');
        
        this.#instanceSocket.on('error', (err) => {
            console.error(`server error:\n${err.stack}`);
            this.#instanceSocket.close();
        });
        
        this.#instanceSocket.on('message', (msg, rinfo) => {
            //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            let message = JSON.parse(msg);
            this.emitter.emit('newMessageFromSocket', message, rinfo.address, rinfo.port);
        });
        
        this.#instanceSocket.on('listening', () => {
            const address = this.#instanceSocket.address();
            //console.log(`[SOCKET] Listening on ${address.address}:${address.port}`);
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