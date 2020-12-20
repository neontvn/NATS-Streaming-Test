import nats,{ Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();

// client
const stan = nats.connect("ticketing",randomBytes(4).toString('hex'),{
    url : "http://localhost:4222"
})

/* 
    NOTE: 

    "randomBytes(4).toString('hex')" : Client Id to the service be it publisher or listener

    Now that there are unique client id associated to the copies of a particular service, there arises an
    issue wherein updation of data might occur in database due to each of the subscriber listens to the channel 
    for the message.
    
    This somehow is undesirable and we would want to limit it to a single instance of the same service. 
    This is achieved using Queue Group ( built in node-nats-streaming ) 
    Inside the channel we create a queue group ( can be multiple QG in channel as well ) and random selection of service is done

*/

stan.on('connect',()=>{

    console.log("Listener connected to NATS");
    
    // End the process and exit
    stan.on('close',()=>{
        console.log("NATS connection closed!");
        process.exit();
    })

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
    
    const subscription = stan.subscribe('ticket:created','listenerQueueGroup'); // subscribe to a channel and a name of Queue Group
    subscription.on('message',(msg : Message)=>{           // msg is of type Message to get the details 
                                                           // out of the data
        
        console.log("received")
        // NATS gets to know that the event has been received by the client but it may happen that
        // there is an error that results in loss of the event completely. This is the default behaviour
        // and it can be changed by setting the options - setManualAckMode to true
        // With this the node-nats-streaming will not automatically acknowledge the event received. Has to be
        // done manually.

            
        const data = msg.getData();
        if(typeof data === 'string'){
            console.log(`Received event #${msg.getSequence()} with data : ${data}`);
        }
        msg.ack();
    });
});

// interrupt or terminate requests
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());