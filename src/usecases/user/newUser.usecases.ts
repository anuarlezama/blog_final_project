import { ILogger } from '../../domain/logger/logger.interface';
import { UsersService } from '../../infrastructure/repositories/user/users.service';
import { UserModel } from '../../domain/model/user';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { Role } from '../../domain/model/role';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';

export class NewUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userService: UsersService,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(
    newUser: UserModel,
    currentUser: UserModel,
  ): Promise<CreateUserDto> {
    if (newUser.role == Role.Admin && currentUser.role != Role.Admin) {
      throw new Error(
        'Invalid user creation, only an admin can create an admin role',
      );
    }

    const createUserDto = new CreateUserDto();
    createUserDto.email = newUser.email;
    createUserDto.first_name = newUser.first_name;
    createUserDto.last_name = newUser.last_name;
    createUserDto.username = newUser.username;
    createUserDto.password = await this.bcryptService.hash(newUser.password);
    createUserDto.role = newUser.role;
    createUserDto.is_active = true;
    const result = this.userService.create(createUserDto);
    this.logger.log('newUserUseCases execute', 'New user has been inserted');
    return result;
  }
}
