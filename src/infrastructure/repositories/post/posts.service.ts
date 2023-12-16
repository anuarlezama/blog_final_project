import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../domain/dtos/create-post.dto';
import { UpdatePostDto } from '../../../domain/dtos/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from '../../schemas/post.schema';
import { PostRepository } from '../../../domain/repositories/postRepository.interface';

@Injectable()
export class PostsService implements PostRepository {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }

  async findAll() {
    return this.postModel.find();
  }

  async findOne(id: string) {
    return this.postModel.findById(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
