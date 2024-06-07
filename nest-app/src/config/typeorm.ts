import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Horse } from '../horses/entities/horse.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'hufpflege',
  password: 'hufpflege',
  database: 'hufpflege',
  entities: [Horse], //['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
