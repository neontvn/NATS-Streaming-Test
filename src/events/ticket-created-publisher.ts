import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

// This class extends abstract class Publisher ( base-publisher.ts ) which
// has a abstract data subject and the publish function implementation which 
// the isntance of client and data. This is done in publisher.ts where we create a new instance
// of this class with param as the client and then call the publish function with the data

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
