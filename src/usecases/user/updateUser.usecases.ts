import { ILogger } from '../../domain/logger/logger.interface';
import { UsersService } from '../../infrastructure/repositories/user/users.service';
import { UserModel } from '../../domain/model/user';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { Role } from '../../domain/model/role';

export class UpdateUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userService: UsersService,
  ) {}
  async execute(id: string, user: UserModel, currentUser: UserModel) {
    const updateUserDto = new UpdateUserDto();
    if (id) {
      throw new Error('Invalid update for user, ID not provided');
    }
    if (
      user.role &&
      user.role == Role.Admin &&
      currentUser.role != Role.Admin
    ) {
      throw new Error(
        'Invalid user update, only an admin can update to an admin role',
      );
    }
    updateUserDto.email = user.email;
    updateUserDto.first_name = user.first_name;
    updateUserDto.last_name = user.last_name;
    updateUserDto.username = user.username;
    updateUserDto.role = user.role;
    updateUserDto.is_active = user.isActive;
    const result = this.userService.update(user.id, updateUserDto);
    this.logger.log(
      'updateUserUseCases execute',
      `User with id ${user.id} has been updated`,
    );
    return result;
  }
}
