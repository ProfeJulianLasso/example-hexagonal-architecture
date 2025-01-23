import { UserApplicationDto } from 'src/application/dto/user.dto';
import { IUserModel } from '../models/user.model';

export interface IUserRepository<User extends IUserModel> {
  create(user: UserApplicationDto): Promise<User>;
  update(user: UserApplicationDto): Promise<User>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
