import { ILogger } from '../../domain/logger/logger.interface';
import { PostRepository } from '../../domain/repositories/postRepository.interface';
import { PostModel } from '../../domain/model/post';
import { CategoryModel } from '../../domain/model/category';
import { UpdatePostDto } from '../../domain/dtos/update-post.dto';
import { IException } from '../../domain/exceptions/exceptions.interface';
import { Types } from 'mongoose';
import { UserModel } from '../../domain/model/user';
import { Role } from '../../domain/model/role';

export class UpdatePostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
    private readonly exception: IException,
  ) {}

  async execute(
    post: PostModel,
    categories: CategoryModel[],
    user: UserModel,
  ): Promise<UpdatePostDto> {
    if (!post.id) {
      this.exception.badRequestException({
        message: 'Invalid Post update ID not provided',
        code_error: InternalErrorCodes.InvalidBlogUpdate,
      });
    }
    if (user.role != Role.Admin) {
      const originalPost = await this.postRepository.findOne(post.id);
      if (originalPost) {
        if (
          originalPost.author &&
          originalPost.author.id.toString() != user.id
        ) {
          this.exception.badRequestException({
            message:
              'Invalid Post update, updating author is different from original post author',
            code_error: InternalErrorCodes.InvalidBlogUpdate,
          });
        }
      }
    }
    const categoriesInfo = categories.map((c) => {
      return new Types.ObjectId(c.id);
    });
    const updatePostDTo = new UpdatePostDto();
    updatePostDTo.content = post.content;
    updatePostDTo.title = post.title;
    updatePostDTo.categories = categoriesInfo;
    const result = this.postRepository.update(post.id, updatePostDTo);
    this.logger.log(
      'updateBlogUseCase execute',
      `The post with ${post.id} has been updated`,
    );
    return result;
  }
}
