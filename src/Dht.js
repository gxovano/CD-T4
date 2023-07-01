class Dht {

   constructor(id, eventBus) {
      this.id = id;
      this.elements = {};
      this.eventBus = eventBus;
      this.allocation = eventBus.connections[id].allocation;
      this.instanceElements();
   }
    
   instanceElements() {
      for (var i = 0; i < this.allocation; i++) {
         this.elements[i] = '';
      }
   }

   handleOperation(message) {
      if ( message.op == 'insert') {
         this.insert(message.data, message.hash);
      }
      else if ( message.op == 'search' ) {
         this.eventBus.emit('sendToAnotherNode',{ op: 'answer', data: this.search(message.data, message.hash)});
      }
      else if( message.op == 'answer') {
         console.log(message.data);
      }
   }
    
   isPresent(hash) {
      return this.elements[hash] !== undefined;
   }

   hash(rg) {
      return rg % this.allocation + 1 ;
   }

   insert(item, position = null) {
      let rg = item.rg;
      let hash = position || this.hash(rg);

      if (!this.isPresent(hash)) {
         return this.eventBus.emit('sendToAnotherNode', { op: 'insert', hash: hash, data: item });
      }
      
      if (this.elements[hash] !== ''){
         return this.insert(item, hash + 1); 
      }

      this.elements[hash] = item;
   }

   search(rg, position = null) {
      let hash = position || this.hash(rg);

      if (!this.isPresent(hash)) {
         return this.eventBus.emit('sendToAnotherNode', { op: 'search', hash: hash, data: rg });
      }

      if(this.elements[hash].rg === rg) {
         return this.elements[hash];
      }
      
      return this.search(rg, hash + 1);
   }

}

export default Dht; 