import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { CategoryController } from './category/category.controller';
import { PostsController } from './post/posts.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxyModule } from '../usecases-proxy/usecase-proxy.module';
import { AuthController } from './auth/auth.controller';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';

@Module({
  providers: [],
  controllers: [
    UsersController,
    CategoryController,
    PostsController,
    AuthController,
  ],
  imports: [
    RepositoriesModule,
    LoggerModule,
    ExceptionsModule,
    EnvironmentConfigModule,
    UseCaseProxyModule.register(),
  ],
})
export class ControllersModule {}
