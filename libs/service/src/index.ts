import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

export * from '@app/service/service.module';
import { ConfigService } from '@app/service/config/config.service';
import { json5 } from '@app/service/parser/json5';

export const server = async (
  app: NestExpressApplication,
  mod: any,
  confPref: string,
) => {
  const configs = app.get(ConfigService);
  const logger = new Logger(mod.name);
  const appConf = configs.get<any>(confPref);
  const transports = configs.get<string[]>(`${confPref}.transports`);

  app.useLogger([configs.get<LogLevel>('app.logging')]);
  app.useGlobalPipes(new ValidationPipe());

  transports.includes('kafka') &&
    appConf.kafka &&
    app.connectMicroservice<MicroserviceOptions>(
      { transport: Transport.KAFKA, options: appConf.kafka },
      { inheritAppConfig: true },
    );

  await app.startAllMicroservices();
  await app.listen(0);
  logger.log(`Service is running`);
};

export const startApp = async (mod: any, confPref: string) => {
  const app = await NestFactory.create<NestExpressApplication>(mod);

  await server(app, mod, confPref);
};
