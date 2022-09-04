import { inject, injectable } from 'inversify';
import User from '../../../Domain/Entities/User';
import CreateUsersCommand from '../../Commands/Users/CreateUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';

@injectable()
export default class CreateUsersHandler {
  public constructor(@inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface) {}

  public async execute(command: CreateUsersCommand): Promise<void> {
    const existentUserWithSameUsername = await this.userRepository.findOneBy('username', command.getUsername());
    if (existentUserWithSameUsername) {
      throw new Error('Duplicated entity with same username: ' + command.getUsername());
    }
    const existentUserWithSameEmail = await this.userRepository.findOneBy('email', command.getEmail());
    if (existentUserWithSameEmail) {
      throw new Error('Duplicated entity  with same email: ' + command.getEmail());
    }
    const existentUserWithSameDocumentId = await this.userRepository.findOneBy('document_id', command.getDocumentId());
    if (existentUserWithSameDocumentId) {
      throw new Error('Duplicated entity  with same document id: ' + command.getDocumentId());
    }
    const user = new User(
      command.getRole(),
      command.getFirstName(),
      command.getLastName(),
      command.getPhone(),
      command.getEmail(),
      command.getUsername(),
      command.getPassword(),
      command.getAddress(),
      command.getGender(),
      command.getBirthDate(),
      command.getCountryId(),
      command.getCity(),
      command.getCategory(),
      command.getDocumentId(),
    );
    this.userRepository.persist(user);
  }
}
