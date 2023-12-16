import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../../domain/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../../domain/dtos/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from '../../schemas/category.schema';
import { CategoryRepository } from '../../../domain/repositories/categoryRepository.interface';

@Injectable()
export class CategoryService implements CategoryRepository {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
