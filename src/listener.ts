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
    
    const subscription = stan.subscribe('ticket:created','listenerQueueGroup'); // subscribe to a channel and a name of Queue Group
    subscription.on('message',(msg : Message)=>{           // msg is of type Message to get the details 
                                                           // out of the data
        console.log("received")    
        const data = msg.getData();
        if(typeof data === 'string'){
            console.log(`Received event #${msg.getSequence()} with data : ${data}`);
        }
    })
})