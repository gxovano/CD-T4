import { EventEmitter  } from 'node:events';

class EventBus extends EventEmitter  {
    constructor(id, connections) {
        super();
        this.id = id;
        this.connections = connections;
    }

    remote() {
      return this.connections.find(current => Number(current.id) !== Number(this.id));
    }
}

export default EventBus; 