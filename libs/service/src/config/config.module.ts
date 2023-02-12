import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@app/service/config/config.service';
import { CONFIG_OPTIONS } from '@app/service/config/constants';

export interface ConfigModuleOptions {
  folder?: string;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    options.folder = options.folder || './configs';
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
