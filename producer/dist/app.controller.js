"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
let AppController = class AppController {
    constructor(appService, client) {
        this.appService = appService;
        this.client = client;
    }
    async onModuleInit() {
        ['medium.rocks'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
        await this.client.connect();
    }
    async onModuleDestroy() {
        await this.client.close();
    }
    getHello() {
        return this.appService.getHello();
    }
    testKafka() {
        return this.client.emit('medium.rocks', { foo: 'bar', data: new Date().toString() });
    }
    testKafkaWithResponse() {
        return this.client.send('medium.rocks', { foo: 'bar', data: new Date().toString() });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('kafka-test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testKafka", null);
__decorate([
    (0, common_1.Get)('kafka-test-with-response'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testKafkaWithResponse", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('any_name_i_want')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientKafka])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map