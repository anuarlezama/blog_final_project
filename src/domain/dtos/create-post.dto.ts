import { Types } from 'mongoose';

export class CreatePostDto {
  title: string;
  content: string;
  author: Types.ObjectId;
  categories: Types.ObjectId[];
}
