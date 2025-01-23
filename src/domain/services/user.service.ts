export interface IUserDomainService {
  validateUserAndPassword(email: string, password: string): Promise<boolean>;
}
