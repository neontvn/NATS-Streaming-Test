import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

// Generic class implementation
export abstract class Publisher<T extends Event>{

    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    // Manually, A Promise has to be returned if we want to have a asynchronous call while publishing the event
    publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                // this call back function is called when the publish takes place

                if (err) {
                    return reject(err); // If any error return
                }

                console.log("Event published to subject ", this.subject);
                resolve(); // Else resolve
            });
        })
    }

}