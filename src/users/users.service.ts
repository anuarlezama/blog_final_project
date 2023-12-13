import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './dto/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return this.userModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
  }

  async updateActive(id: string, updateActive: UpdateActiveDto) {
    return this.userModel.findByIdAndUpdate(id, updateActive, { new: true });
  }

  async updatePassword(id: string, updatePassword: UpdatePasswordDto) {
    return this.userModel.findByIdAndUpdate(id, updatePassword, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
