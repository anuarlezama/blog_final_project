import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDocument } from '../../infrastructure/schemas/user.schema';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<any>;

  findAll(): Promise<any>;

  findOne(id: string): Promise<any>;

  update(id: string, updateUserDto: UpdateUserDto): Promise<any>;

  updatePassword(id: string, updatePassword: UpdateUserDto): Promise<any>;

  remove(id: string): any;

  findByUsername(username: string): Promise<UserDocument>;

  updateLastLogin(id: string): Promise<UserDocument>;

  updateRefreshToken(
    id: string,
    updateRefreshToken: string,
  ): Promise<UserDocument>;
}
