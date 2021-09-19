import {Controller, Get, Inject, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { AppService } from './app.service';
import {ClientKafka, Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy{
  constructor(
    private readonly appService: AppService,
    @Inject('any_name_i_want') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    ['medium.rocks'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kafka-test')
  testKafka(){
    return this.client.emit('medium.rocks', {foo:'bar', data: new Date().toString()})
  }


  @Get('kafka-test-with-response')
  testKafkaWithResponse(){
    return this.client.send('medium.rocks', {foo:'bar', data: new Date().toString()})
  }

  @MessagePattern('medium.rocks')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
      `Receiving a new message from topic: medium.rocks: ` +
      JSON.stringify(originalMessage.value);
    return response;
  }

}
