import { Domain } from 'src/domain/domain.interface';
import { IPasswordHashDomainService } from 'src/domain/services/password-hash.service';
import { IUserDomainService } from 'src/domain/services/user.service';
import { SignInApplicationDto } from '../dto/sign-in.dto';
import { TokenApplicationDto } from '../dto/token.dto';
import { UserApplicationDto } from '../dto/user.dto';
import { UseCaseException } from '../exceptions/use-case.exception';
import { IUserModel } from '../persistence/models/user.model';
import { IUserRepository } from '../persistence/repositories/user.repository';
import { IJwtApplicationService } from '../services/jwt.service';

export class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository<IUserModel>,
    private readonly domainController: Domain,
    private readonly jwtService: IJwtApplicationService,
    private readonly userService: IUserDomainService,
    private readonly passwordHashService: IPasswordHashDomainService,
  ) {}

  async execute(signInDto: SignInApplicationDto): Promise<TokenApplicationDto> {
    const isAuthenticated = await this.domainController.signIn(
      signInDto.email,
      signInDto.password,
      this.userService,
      this.passwordHashService,
    );

    if (isAuthenticated) {
      const token = new TokenApplicationDto();
      const data = await this.userRepository.findByEmail(signInDto.email);
      if (data === null) {
        throw new UseCaseException('Invalid email or password');
      }
      const user = this.mapUserModelToUserDto(data);
      token.token = await this.generateToken(user);
      return token;
    }

    throw new UseCaseException('Invalid email or password');
  }

  private async generateToken(
    data: Omit<UserApplicationDto, 'password'>,
  ): Promise<string> {
    return await this.jwtService.generateToken(data);
  }

  private mapUserModelToUserDto(user: IUserModel): UserApplicationDto {
    const userDto = new UserApplicationDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    return userDto;
  }
}
