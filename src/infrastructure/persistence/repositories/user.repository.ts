import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserApplicationDto } from 'src/application/dto/user.dto';
import { IUserRepository } from 'src/application/persistence/repositories/user.repository';
import { IsNull, Repository } from 'typeorm';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository implements IUserRepository<UserModel> {
  constructor(
    @InjectRepository(UserModel)
    readonly repository: Repository<UserModel>,
  ) {}

  async create(user: UserApplicationDto): Promise<UserModel> {
    const data = this.mapUserApplicationDtoToUserModel(user);
    const email = await this.findByEmail(data.email);
    if (email !== null) {
      throw new Error('Email already exists');
    }
    return await this.repository.save(data);
  }

  async update(user: UserApplicationDto): Promise<UserModel> {
    const dataUser = this.mapUserApplicationDtoToUserModel(user);
    const data = await this.findById(dataUser.id);
    if (data === null) {
      throw new Error('User not found');
    }

    const updatedData = {
      ...data,
      ...dataUser,
      updatedAt: new Date(),
    };

    return await this.repository.save(updatedData);
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.findById(id);
    if (data === null) {
      throw new Error('User not found');
    }

    return await this.repository.softDelete(id).then(() => true);
  }

  async findById(id: string): Promise<UserModel | null> {
    return await this.repository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await this.repository.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    });
  }

  async findAll(): Promise<UserModel[]> {
    return await this.repository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  async findOneByEmailAndPassword(options: {
    email: string;
    password: string;
  }): Promise<UserModel | null> {
    return await this.repository.findOne({
      where: {
        ...options,
        deletedAt: IsNull(),
      },
    });
  }

  private mapUserApplicationDtoToUserModel(
    data: UserApplicationDto,
  ): UserModel {
    const user = new UserModel();
    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    return user;
  }
}
