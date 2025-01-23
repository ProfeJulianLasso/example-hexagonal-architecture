export interface IUuidDomainService {
  generate(): string;
  validate(uuid: string): boolean;
}
