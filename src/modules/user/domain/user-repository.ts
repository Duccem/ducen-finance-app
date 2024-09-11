import { User } from './user';

export interface UserRepository {
  createUser(user: User): Promise<void>;
}
