import { IPasswordHashDomainService } from '../services/password-hash.service';
import { IUserDomainService } from '../services/user.service';
import { IUuidDomainService } from '../services/uuid.service';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  private readonly _errors: Map<string, boolean>;
  private readonly _passwordHashService: IPasswordHashDomainService;

  constructor(
    passwordHashService: IPasswordHashDomainService,
    data?: {
      id?: string;
      name?: string;
      email?: string;
      password?: string;
    },
  ) {
    this._errors = new Map();
    this._passwordHashService = passwordHashService;

    if (data?.id) {
      this.id = data.id;
    }

    if (data?.name) {
      this.name = data.name;
    }

    if (data?.email) {
      this.email = data.email;
    }

    if (data?.password) {
      this.password = passwordHashService.hash(data.password);
    }
  }

  public create(
    data: {
      name: string;
      email: string;
      password: string;
    },
    uuidService: IUuidDomainService,
  ): this {
    this.id = uuidService.generate();
    this.name = data.name;
    this.email = data.email;
    this.password = this._passwordHashService.hash(data.password);
    return this;
  }

  public signIn(userService: IUserDomainService): Promise<boolean> {
    return userService.validateUserAndPassword(this.email, this.password);
  }

  public validate(uuidService?: IUuidDomainService): this {
    if (
      uuidService &&
      this.id.length > 0 &&
      this.validateId(uuidService) === false
    ) {
      this._errors.set('id', false);
    }

    if (this.name && this.validateName() === false) {
      this._errors.set('name', false);
    }

    if (this.email.length > 0 && this.validateEmail() === false) {
      this._errors.set('email', false);
    }

    if (this.password.length > 0 && this.validatePassword() === false) {
      this._errors.set('password', false);
    }

    return this;
  }

  public isValid(): boolean {
    return this._errors.size === 0;
  }

  public getErrors(): Map<string, boolean> {
    return this._errors;
  }

  private validateId(uuidService: IUuidDomainService): boolean {
    return uuidService.validate(this.id);
  }

  private validateName(): boolean {
    if (this.name && this.name.length > 0) {
      return true;
    }
    return false;
  }

  private validateEmail(): boolean {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (this.email && pattern.test(this.email)) {
      return true;
    }
    return false;
  }

  private validatePassword(): boolean {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (this.password && pattern.test(this.password)) {
      return true;
    }
    return false;
  }
}
