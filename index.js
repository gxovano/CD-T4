import { readFile } from 'fs/promises';                      

import Router from './src/Router.js';                   
import Terminal from './src/Terminal.js';   
import EventBus from './src/EventBus.js';
import Dht from './src/Dht.js';

const configFileName = './assets/config.json';    
    

const getConnections = async (configFileName) => JSON.parse(                          
  await readFile(                                         
    new URL(configFileName, import.meta.url)             
  )
);

const connections = getConnections(configFileName);

connections.then(
  (conn) => { 
    const eventBus = new EventBus(process.argv[2] , conn);  
    const dht = new Dht(process.argv[2], eventBus); 
    const replyLoop = new Terminal(eventBus, dht); 
    const a = new Router( conn.find( c => c.id == process.argv[2] ), eventBus, dht); 
  }
);














const testSendMessages = async (connections) => {
  await new Promise(r => setTimeout(r, 3000));
  let message = {type: 'msg', description: 'dep100'}; 
  eventBus.emit('newMessageToOutputToAll', message, connections);
  await new Promise(r => setTimeout(r, 1000));
  eventBus.emit('displayMessages');
}