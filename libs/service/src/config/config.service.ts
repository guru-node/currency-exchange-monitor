import { Inject, Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import { merge } from 'lodash';
import fs from 'fs';
import path from 'path';

import { CONFIG_OPTIONS } from '@app/service/config/constants';
import { ConfigMap, ConfigOptions } from '@app/service/config/config.interface';
import { json5 } from '@app/service/parser/json5';

@Injectable()
export class ConfigService {
  private readonly configMap: ConfigMap;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const cwd = process.cwd();

    const envFile = path.resolve(cwd, options.folder, `local.env`);
    const envConfigMap = dotenv.config({ path: envFile }).parsed;

    const confFile = path.resolve(cwd, options.folder, 'config.json5');
    const configMap = json5.parse(fs.readFileSync(confFile).toString('utf8'));

    this.configMap = merge(configMap, envConfigMap);
    this.parse();
  }

  public get<T>(key: string): T {
    return this.configMap[key] as unknown as T;
  }

  private parse(): void {
    for (const name in this.configMap) {
      const config = this.configMap[name];
      this.merge(this.configMap, config, name);
    }
  }

  private set(configs: any, name: string, joinedKey: string): void {
    const data = this.get(joinedKey);
    const envData = process.env[joinedKey];

    data && (configs[name] = this.typeCast(data));
    envData && (configs[name] = this.typeCast(envData));
    if (!envData && (typeof data === 'string' || typeof data === 'number')) {
      process.env[joinedKey] = `${data}`;
    }
    this.configMap[joinedKey] = configs[name];
  }

  private merge(
    configs: any,
    config: any,
    name: string,
    joinedKey?: string,
  ): void {
    if (joinedKey) {
      joinedKey = `${joinedKey}.${name}`;
    } else {
      joinedKey = name;
    }
    if (typeof config !== 'object') {
      this.set(configs, name, joinedKey);
    } else if (typeof config === 'object') {
      for (const subName in config) {
        const sConfig = configs[name];
        this.set(configs, name, joinedKey);
        if (sConfig) {
          this.merge(configs[name], sConfig[subName], subName, joinedKey);
        }
      }
    }
  }

  private typeCast(data: any) {
    if (data === 'true') {
      data = true;
    }
    if (data === 'false') {
      data = false;
    }
    const swap = json5.parse(data);
    return swap || data;
  }
}
