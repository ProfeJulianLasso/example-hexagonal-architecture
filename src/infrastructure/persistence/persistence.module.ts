import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.db',
      synchronize: true,
      logging: 'all',
      entities: [UserModel],
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class PersistenceModule {}
