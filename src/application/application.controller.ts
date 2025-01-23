import { Domain } from 'src/domain/domain.interface';
import { IPasswordHashDomainService } from 'src/domain/services/password-hash.service';
import { IUserDomainService } from 'src/domain/services/user.service';
import { IUuidDomainService } from 'src/domain/services/uuid.service';
import { Application } from './application.interface';
import { UserApplicationDto } from './dto/user.dto';
import { IUserModel } from './persistence/models/user.model';
import { IUserRepository } from './persistence/repositories/user.repository';
import { IJwtApplicationService } from './services/jwt.service';
import { NewUserUseCase } from './use-cases/new-user.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';

export class ApplicationController extends Application {
  constructor(
    private readonly userRepository: IUserRepository<IUserModel>,
    private readonly domainController: Domain,
  ) {
    super();
  }

  newUser(
    name: string,
    email: string,
    password: string,
    uuidService: IUuidDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): Promise<UserApplicationDto> {
    const useCase = new NewUserUseCase(
      this.userRepository,
      this.domainController,
      uuidService,
      passwordHashService,
    );
    return useCase.execute({ name, email, password });
  }

  async signIn(
    email: string,
    password: string,
    jwtService: IJwtApplicationService,
    userService: IUserDomainService,
    passwordHashService: IPasswordHashDomainService,
  ): Promise<string> {
    const useCase = new SignInUseCase(
      this.userRepository,
      this.domainController,
      jwtService,
      userService,
      passwordHashService,
    );
    const data = await useCase.execute({ email, password });
    return data.token;
  }
}
