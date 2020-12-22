import { Subjects } from "./subjects";

// Interface that strictly binds the TicketCreated event to a data object
export interface TicketCreatedEvent {
    subject : Subjects.TicketCreated;
    data :{
        id : string,
        title : string,
        price : number
    }
}