import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UsersService } from '../../repositories/user/users.service';
import { UseCaseProxyModule } from '../../usecases-proxy/usecase-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecase-proxy';
import { NewUserUseCases } from '../../../usecases/user/newUser.usecases';
import { UserModel } from '../../../domain/model/user';
import { UpdateUserUseCases } from '../../../usecases/user/updateUser.usecases';
import { ChangePassword } from '../../../domain/model/changePassword';
import { UpdateUserPasswordUseCases } from '../../../usecases/user/updateUserPassword.usecases';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(UseCaseProxyModule.POST_NEW_USER_PROXY)
    private readonly postNewUserProxy: UseCaseProxy<NewUserUseCases>,
    @Inject(UseCaseProxyModule.PATCH_UPDATE_USER_PROXY)
    private readonly patchUpdateUserProxy: UseCaseProxy<UpdateUserUseCases>,
    @Inject(UseCaseProxyModule.PATCH_UPDATE_USER_PASSWORD_PROXY)
    private readonly patchUpdateUserPasswordProxy: UseCaseProxy<UpdateUserPasswordUseCases>,
  ) {}

  @Post()
  create(@Body() userModel: UserModel) {
    return this.postNewUserProxy.getInstance().execute(userModel, userModel);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userModel: UserModel) {
    return this.patchUpdateUserProxy
      .getInstance()
      .execute(id, userModel, userModel);
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() changePassword: ChangePassword,
  ) {
    return this.patchUpdateUserPasswordProxy
      .getInstance()
      .execute(id, changePassword, new UserModel());
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
