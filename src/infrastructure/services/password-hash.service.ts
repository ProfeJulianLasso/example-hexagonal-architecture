import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { IPasswordHashDomainService } from 'src/domain/services/password-hash.service';

@Injectable()
export class PasswordHashDomainService implements IPasswordHashDomainService {
  hash(password: string): string {
    return createHash('sha512').update(password).digest('hex');
  }
}
