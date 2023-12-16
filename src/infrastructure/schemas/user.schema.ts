import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../domain/model/role';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  first_name: string;

  @Prop({ required: true, type: String })
  last_name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String, select: false })
  password: string;

  @Prop({ type: String, default: Role.User })
  role: Role;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Date })
  last_login: Date;

  @Prop({ type: String, select: false })
  hash_refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
