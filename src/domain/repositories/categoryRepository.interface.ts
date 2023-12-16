import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export interface CategoryRepository {
  create(createCategoryDto: CreateCategoryDto): any;

  findAll(): any;

  findOne(id: string): any;

  update(id: string, updateCategoryDto: UpdateCategoryDto): any;

  remove(id: string): any;
}
