import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@app/service/config/config.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@app/service/config/config.service';

@Global()
@Module({})
export class ServiceModule {
  static register(): DynamicModule {
    const services = [
      ConfigModule.forRoot(),
      ClientsModule.registerAsync([
        {
          name: 'ALERT_MONITOR_SERVICE',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            console.log(configService.get('alert-monitor.kafka'));
            return {
              name: 'ALERT_MONITOR_SERVICE',
              transport: Transport.KAFKA,
              options: configService.get('alert-monitor.kafka'),
            };
          },
        },
        {
          name: 'ALERT_HANDLER_SERVICE',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            console.log(configService.get('alert-handler.kafka'));
            return {
              name: 'ALERT_HANDLER_SERVICE',
              transport: Transport.KAFKA,
              options: configService.get('alert-handler.kafka'),
            };
          },
        },
      ]),
      MongooseModule.forRootAsync({
        imports: [ConfigModule.forRoot()],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): MongooseModuleOptions => {
          return {
            uri: configService.get('mongodb.url'),
            dbName: configService.get('mongodb.db'),
            ...configService.get('mongodb.options'),
          };
        },
      }),
    ];
    return {
      module: ServiceModule,
      imports: services,
      exports: services,
    };
  }
}
