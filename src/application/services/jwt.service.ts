import { UserApplicationDto } from '../dto/user.dto';

export interface IJwtApplicationService {
  generateToken(payload: Omit<UserApplicationDto, 'password'>): Promise<string>;
  verify(token: string): Promise<boolean>;
}
