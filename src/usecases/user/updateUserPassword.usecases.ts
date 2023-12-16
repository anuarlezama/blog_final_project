import { ILogger } from '../../domain/logger/logger.interface';
import { UsersService } from '../../infrastructure/repositories/user/users.service';
import { UserModel } from '../../domain/model/user';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { Role } from '../../domain/model/role';
import { ChangePassword } from '../../domain/model/changePassword';

export class UpdateUserPasswordUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userService: UsersService,
  ) {}
  async execute(
    id: string,
    changePassword: ChangePassword,
    currentUser: UserModel,
  ) {
    const updateUserDto = new UpdateUserDto();
    if (!id) {
      throw new Error('Invalid password update for user, ID not provided');
    }
    if (id != currentUser.id && currentUser.role != Role.Admin) {
      throw new Error(
        `Invalid password update for user, only admin can update other user's passwords`,
      );
    }
    updateUserDto.password = changePassword.newPassword;
    const result = this.userService.update(id, updateUserDto);
    this.logger.log(
      'updateUserPasswordUseCases execute',
      `Password for user with id ${id} has been updated`,
    );
    return result;
  }
}
