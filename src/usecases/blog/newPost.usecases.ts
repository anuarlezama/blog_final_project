import { PostsService } from '../../infrastructure/repositories/post/posts.service';
import { CreatePostDto } from '../../domain/dtos/create-post.dto';
import { PostModel } from '../../domain/model/post';
import { UserModel } from '../../domain/model/user';
import { CategoryModel } from '../../domain/model/category';
import { Types } from 'mongoose';
import { ILogger } from '../../domain/logger/logger.interface';
import { UsersService } from '../../infrastructure/repositories/user/users.service';

export class NewPostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postService: PostsService,
    private readonly userService: UsersService,
  ) {}

  async execute(
    blog: PostModel,
    author: UserModel,
    categories: [CategoryModel],
  ): Promise<CreatePostDto> {
    const categoriesInfo = categories.map((c) => {
      return new Types.ObjectId(c.id);
    });
    const post = new CreatePostDto();
    post.content = blog.content;
    post.title = blog.title;
    post.categories = categoriesInfo;
    post.author = new Types.ObjectId(author.id);
    const result = await this.postService.create(post);
    this.logger.log('NewPostUseCases execute', 'New post has been inserted');
    return result;
  }
}
