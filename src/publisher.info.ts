// This file is created to give a detailed overview of how a publisher communicates with the 
// NATS streaming server. 

// NOTE : CHECK publisher.ts FOR THE ACTUAL IMPLEMENTATION



import nats from 'node-nats-streaming';
console.clear();

// client is often reffered to as stan. stan is nats read backwards
// connect to the nats streaming server

const stan = nats.connect("ticketing","abc",{
    url : "http://localhost:4222", // This is the url of nats-streaming server which is currently inside the k8s cluster
});                                // We need to somehow get access to the server pod for the same


/* 
    1. One of the ways to do this is to expose the pod as a clusterIP service to ingress-nginx and then access
    by reaching out to ingress

    2. Another way is to create NodePort service to expose the nats pod directly to the external world We can easily remove the 
    service. However this still requires a write of config file.

    3. This option strictly works in a development environment wherein we port forward a specific pod

    This is how we do it : 
        > kubectl port-forward nats-depl-654ffc757b-qjtmj 4222:4222

        here,
             the first 4222 is the localhost port we will be accessing to get at the pod
             the second 4222 is the porton the pod that is being accessed

    And now we can connect to the nats pod using the publisher
*/

// Wait for stan/client to connect to nats streaming server
// Event driven approach - after the client successfully connects to the streaming server
// It emits a connect event. Listen for that event

stan.on('connect',()=>{
    console.log("publisher connected to nats")
    
    // Publishing an event to a channel
    // Note : Event is often referred to as MESSAGE in the docs
    const data = JSON.stringify({
        id : "234423",
        title : "concert",
        price : 1200
    });

    // call the publish function with data and channel
    stan.publish("ticket:created",data,()=>{
        //callback function
        console.log("Event Published")        
    })

})



