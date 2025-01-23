import { Injectable } from '@nestjs/common';
import { IUuidDomainService } from 'src/domain/services/uuid.service';
import { v4, validate, version } from 'uuid';

@Injectable()
export class UuidService implements IUuidDomainService {
  generate(): string {
    const uuid = v4();
    return uuid;
  }

  validate(uuid: string): boolean {
    return validate(uuid) && version(uuid) === 4;
  }
}
