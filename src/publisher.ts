import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

// client is often reffered to as stan. stan is nats read backwards
// connect to the nats streaming server
const stan = nats.connect("ticketing","abc",{
    url : "http://localhost:4222", 
});                                


stan.on('connect', async ()=>{
    console.log("publisher connected to nats")
    
    // Publishing an event to a channel
    const data = {
        id : "234423",
        title : "concert",
        price : 1200
    }

    // call the publish function with data and channel to create a ticket
    const publisher = new TicketCreatedPublisher(stan);
    await publisher.publish(data);
})



