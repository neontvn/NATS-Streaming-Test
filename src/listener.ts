import nats,{ Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import TicketCreatedListener from './events/ticket-created-listener';
console.clear();

// client
const stan = nats.connect("ticketing",randomBytes(4).toString('hex'),{
    url : "http://localhost:4222"
})

stan.on('connect',()=>{

    console.log("Listener connected to NATS");
    
    // End the process and exit
    stan.on('close',()=>{
        console.log("NATS connection closed!");
        process.exit();
    })
    
    // Now only implements the specific the listener 
    new TicketCreatedListener(stan).listen();
});

// interrupt or terminate requests
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

