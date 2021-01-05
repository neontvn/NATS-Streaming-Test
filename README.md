# NATS-Streaming-Test

A test project that was done as a part of [Ticketing Application](https://github.com/neontvn/TicketingApp) to understand the basic of NATS-streaming-server and how the event/data flows between the publisher and the listener.

This project highlights the meaning of how a NATS-streaming server can be setup that listens for changes from the client and helps in updating data that is dependent among different services.

The client service publishes an event/data to a particular channel on the NATS-streaming server alongwith the queue group name and the same is sent to the service that is listening on a particular channel to which the data is published.

Read more about NATS streaming [here](https://docs.nats.io/nats-streaming-concepts/intro)
Read more about the **node-nats-streaming** package that is used in this project [here](https://www.npmjs.com/package/node-nats-streaming)