import { UserApplicationDto } from 'src/application/dto/user.dto';
import { IJwtApplicationService } from 'src/application/services/jwt.service';

export class JwtService implements IJwtApplicationService {
  generateToken(
    payload: Omit<UserApplicationDto, 'password'>,
  ): Promise<string> {
    return Promise.resolve('token-' + JSON.stringify(payload));
  }
  verify(token: string): Promise<boolean> {
    return token.length > 0 ? Promise.resolve(true) : Promise.resolve(false);
  }
}
