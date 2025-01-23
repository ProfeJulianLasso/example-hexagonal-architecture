export interface IPasswordHashDomainService {
  hash(password: string): string;
}
