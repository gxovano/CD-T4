import { readFile } from 'fs/promises';                      

import Router from './src/Router.js';                   
import Terminal from './src/Terminal.js';   
import EventBus from './src/EventBus.js';

const configFileName = './assets/config.json';    
const eventBus = new EventBus();      

const getConnections = async (configFileName) => JSON.parse(                          
  await readFile(                                         
    new URL(configFileName, import.meta.url)             
  )
);

const connections = getConnections(configFileName);

connections.then(
  (conn) => { 
    const a = new Router( conn.find( c => c.id == process.argv[2] ), eventBus ); 
    testSendMessages(conn);
  }
);

const testSendMessages = async (connections) => {
  await new Promise(r => setTimeout(r, 3000));
  let message = {type: 'msg', description: 'dep100'}; 
  eventBus.emit('newMessageToOutputToAll', message, connections);
  await new Promise(r => setTimeout(r, 1000));
  eventBus.emit('displayMessages');
}

//const replyLoop = new Terminal(eventBus); 