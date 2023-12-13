import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AdminModule,
    CategoryModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        uri: configService.getDatabaseUrl(),
        dbName: configService.getDatabaseName(),
        user: configService.getDatabaseUser(),
        pass: configService.getDatabasePassword(),
      }),
      inject: [EnvironmentConfigService],
    }),
    ExceptionsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
