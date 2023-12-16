import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;
@Schema()
export class Post extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Reference to User document
  author: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] }) // Reference to Category documents
  categories: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
