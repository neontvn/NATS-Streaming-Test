import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

// Extends the Abstract class Listener having abstract
// subject, queueGroupName and onMessage function
// Here the Listener is a generic class and it expects an argument that
// describes the event that we expect to receive inside the listener, which is the listener we created
// TicketCreatedEvent

class TicketCreatedListener extends Listener<TicketCreatedEvent>  {

    // Now there is strict type annotation that the subject has to be ticket created and there is
    // only once that we have to write the meaning to TicketCreated variable ie in the Subjects enum

    subject: Subjects.TicketCreated = Subjects.TicketCreated;   // No more typos :)
    queueGroupName = "payments-service";

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log("Event data", data);
        msg.ack();
    }
}

export default TicketCreatedListener;