import { Module } from '@nestjs/common';
import { UsersService } from '../repositories/user/users.service';
import { CategoryService } from '../repositories/category/category.service';
import { PostsService } from '../repositories/post/posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { CategorySchema } from '../schemas/category.schema';
import { PostSchema } from '../schemas/post.schema';

@Module({
  providers: [UsersService, CategoryService, PostsService],
  controllers: [],
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Post', schema: PostSchema },
    ]),
  ],
  exports: [UsersService, CategoryService, PostsService],
})
export class RepositoriesModule {}
