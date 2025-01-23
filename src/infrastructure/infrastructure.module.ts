import { Module } from '@nestjs/common';
import { ApplicationController } from 'src/application/application.controller';
import { Application } from 'src/application/application.interface';
import { DomainController } from 'src/domain/domain.controller';
import { Domain } from 'src/domain/domain.interface';
import { SecurityController } from './controllers/security.controller';
import { PersistenceModule } from './persistence/persistence.module';
import { UserRepository } from './persistence/repositories/user.repository';
import { JwtService } from './services/jwt.service';
import { PasswordHashDomainService } from './services/password-hash.service';
import { UserService } from './services/user.service';
import { UuidService } from './services/uuid.service';

@Module({
  imports: [PersistenceModule],
  controllers: [SecurityController],
  providers: [
    JwtService,
    PasswordHashDomainService,
    UserService,
    UuidService,
    {
      provide: Domain,
      useClass: DomainController,
    },
    {
      provide: Application,
      inject: [UserRepository, Domain],
      useFactory: (userRepository: UserRepository, domainController: Domain) =>
        new ApplicationController(userRepository, domainController),
    },
  ],
})
export class InfrastructureModule {}
