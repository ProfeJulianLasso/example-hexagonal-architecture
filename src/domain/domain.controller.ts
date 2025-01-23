import { Domain } from './domain.interface';
import { CreateUserDomainDto } from './dto/create-user.dto';
import { UserDomainDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { InvalidDataException } from './exceptions/invalid-data.exception';
import { IPasswordHashDomainService } from './services/password-hash.service';
import { IUserDomainService } from './services/user.service';
import { IUuidDomainService } from './services/uuid.service';

export class DomainController extends Domain {
  createUser(
    data: CreateUserDomainDto,
    uuidService: IUuidDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): UserDomainDto {
    const user = new UserEntity(passwordHashService, data);
    user.validate();
    if (user.isValid() === false) {
      throw new InvalidDataException('Invalid user data', user.getErrors());
    }
    return user.create(data, uuidService);
  }

  signIn(
    email: string,
    password: string,
    userService: IUserDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): Promise<boolean> {
    const user = new UserEntity(passwordHashService, { email, password });
    user.validate();
    if (user.isValid() === false) {
      throw new InvalidDataException('Invalid user data', user.getErrors());
    }
    return user.signIn(userService);
  }
}
