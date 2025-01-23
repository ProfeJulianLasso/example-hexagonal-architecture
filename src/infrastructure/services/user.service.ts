import { Injectable } from '@nestjs/common';
import { IUserDomainService } from 'src/domain/services/user.service';
import { UserRepository } from '../persistence/repositories/user.repository';

@Injectable()
export class UserService implements IUserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUserAndPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    const data = await this.userRepository.findOneByEmailAndPassword({
      email,
      password,
    });
    return data !== null;
  }
}
