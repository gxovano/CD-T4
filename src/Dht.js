class Dht {

   constructor(id, eventBus) {
      this.id = id;
      this.elements = {};
      this.eventBus = eventBus;
      this.instanceElements();
   }
    
   instanceElements() {
      // Calcula o valor de início das chaves
      var inicio = ((this.id - 1) * 10) + 1;

      for (var i = inicio; i < inicio + 10; i++) {
         this.elements[i] = '';
      }
   }

   handleOperation(message) {
      if ( message.op == 'insert') {
         this.insert(message.data)
      }

      else {
         console.log('search')
      }
   }
    
   isPresent(hash) {
      return this.elements[hash] !== undefined;
   }

   hash(rg) {
      return rg % 20 + 1 ;
   }

   insert(item) {
      let rg = item.rg;
      let hash = this.hash(rg);

      if (this.isPresent(hash)) {
         this.elements[hash] = item; 
      }
      else {
         this.eventBus.emit('storeInAnotherNode', { op: 'insert', data: item });
      }
   }
}

export default Dht; 