import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../../category/dto/category.schema';
import { User } from '../../users/dto/user.schema';

@Schema()
export class Post extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  author: User;

  @Prop({ type: [Category] })
  categories: Category[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
