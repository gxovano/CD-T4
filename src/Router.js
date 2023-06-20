import Queue from "./Queue.js";
import Socket from "./Socket.js";

class Router {
    connectionInfo;
    eventBus; 
    inputQueue; 
    outputQueue; 
    inputSocket; 

    constructor(connectionInfo, eventBus) {
        this.connectionInfo = connectionInfo;
        this.eventBus = eventBus; 
        this.inputQueue = new Queue();
        this.outputQueue = new Queue();
        this.inputSocket = new Socket(connectionInfo.port, this.eventBus);
        this.#defineEvents(); 
    }

    #defineEvents() {
        // Enfileira mensagens do socket  
        this.eventBus.on('newMessageFromSocket', (message, ip, port) => {
            console.log(`Enfileirando mensagem de ${ip}:${port}`);
            this.inputQueue.enqueue(message);
        });
        // Envia mensagem para destino  
        this.eventBus.on('newMessageToOutput', (message,ip,port) => {
            this.inputSocket.send(message, ip, port);
        });
        // Envia mensagem para toda a lista de hosts  
        this.eventBus.on('newMessageToOutputToAll', (message,connections) => {
            connections.forEach(element => {
                this.inputSocket.send(message, element.ip, element.port);
            });
        });
        // Exibe as mensagens na fila de entrada  
        this.eventBus.on('displayMessages', () => {
            console.log(this.inputQueue);
        });
    }
}
export default Router;