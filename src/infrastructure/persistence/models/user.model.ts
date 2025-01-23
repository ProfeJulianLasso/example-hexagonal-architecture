import { IUserModel } from 'src/application/persistence/models/user.model';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Index('idx_user_email', ['email', 'deletedAt'], { unique: true })
@Index('idx_user_deleted_at', ['deletedAt'])
@Entity('user')
export class UserModel implements IUserModel {
  @PrimaryColumn('text', { name: 'id', length: 32 })
  id: string;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'password' })
  password: string;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
