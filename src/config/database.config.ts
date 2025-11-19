import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export const loadDatabaseConfig = (): DatabaseConfig => {
  try {
    const configPath = join(process.cwd(), 'application.yaml');
    const fileContents = readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContents) as any;

    return {
      host: process.env.DB_HOST || config?.database?.host || 'localhost',
      port: parseInt(process.env.DB_PORT || config?.database?.port || '5432', 10),
      username: process.env.DB_USERNAME || config?.database?.username || 'postgres',
      password: process.env.DB_PASSWORD || config?.database?.password || 'postgres',
      database: process.env.DB_DATABASE || config?.database?.database || 'wallet',
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true' || config?.database?.logging === true || false,
    };
  } catch (error) {
    // YAML 파일이 없거나 읽을 수 없는 경우 환경 변수 사용
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'wallet',
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
    };
  }
};
