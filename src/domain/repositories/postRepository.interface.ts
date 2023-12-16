import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostDocument } from '../../infrastructure/schemas/post.schema';

export interface PostRepository {
  create(createPostDto: CreatePostDto): any;

  findAll(): any;

  findOne(id: string): Promise<PostDocument | null>;

  update(id: string, updatePostDto: UpdatePostDto): any;

  remove(id: string): any;
}
