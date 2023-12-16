import { Role } from './role';

export class UserModel {
  id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
}
