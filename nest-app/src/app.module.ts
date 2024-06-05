import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorsesModule } from './horses/horses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: true,
      autoLoadEntities: true,
    }),
    HorsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//API_BASE_URL=http://nest:8082/
