import { CreateUserDomainDto } from './dto/create-user.dto';
import { UserDomainDto } from './dto/user.dto';
import { IPasswordHashDomainService } from './services/password-hash.service';
import { IUserDomainService } from './services/user.service';
import { IUuidDomainService } from './services/uuid.service';

export abstract class Domain {
  abstract createUser(
    data: CreateUserDomainDto,
    uuidService: IUuidDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): UserDomainDto;
  abstract signIn(
    email: string,
    password: string,
    userService: IUserDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): Promise<boolean>;
}
