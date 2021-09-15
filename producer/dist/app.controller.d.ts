import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit, OnModuleDestroy {
    private readonly appService;
    private readonly client;
    constructor(appService: AppService, client: ClientKafka);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getHello(): string;
    testKafka(): import("rxjs").Observable<any>;
    testKafkaWithResponse(): import("rxjs").Observable<any>;
}
