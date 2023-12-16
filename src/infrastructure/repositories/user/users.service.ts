import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../../domain/dtos/update-user.dto';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../../../domain/repositories/userRepository.interface';

@Injectable()
export class UsersService implements UserRepository {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return this.userModel
      .findOne({ username: username })
      .select('+password +hash_refresh_token');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async updatePassword(id: string, updatePassword: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      { password: updatePassword.password },
      { new: true },
    );
  }

  async updateLastLogin(id: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { last_login: Date.now() },
      { new: true },
    );
  }

  async updateRefreshToken(id: string, updateRefreshToken: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { hash_refresh_token: updateRefreshToken },
      { new: true },
    );
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
