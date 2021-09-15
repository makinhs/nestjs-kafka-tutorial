import { KafkaContext } from '@nestjs/microservices';
export declare class AppController {
    constructor();
    readMessage(message: any, context: KafkaContext): string;
}
