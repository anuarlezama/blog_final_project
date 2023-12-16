import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserModel } from '../../domain/model/user';
import { UserDocument } from '../../infrastructure/schemas/user.schema';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}
  async execute(username: string): Promise<UserModel> {
    const user: UserDocument =
      await this.adminUserRepo.findByUsername(username);
    if (!user) {
      return null;
    }
    const { password, ...info } = user.toObject();
    return info;
  }
}
