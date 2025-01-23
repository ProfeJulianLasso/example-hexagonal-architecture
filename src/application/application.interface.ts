import { IPasswordHashDomainService } from 'src/domain/services/password-hash.service';
import { IUserDomainService } from 'src/domain/services/user.service';
import { IUuidDomainService } from 'src/domain/services/uuid.service';
import { UserApplicationDto } from './dto/user.dto';
import { IJwtApplicationService } from './services/jwt.service';

export abstract class Application {
  abstract newUser(
    name: string,
    email: string,
    password: string,
    uuidService: IUuidDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): Promise<UserApplicationDto>;
  abstract signIn(
    email: string,
    password: string,
    jwtService: IJwtApplicationService,
    userService: IUserDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): Promise<string>;
}
