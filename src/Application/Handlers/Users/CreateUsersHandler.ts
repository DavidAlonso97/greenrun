import { inject, injectable } from 'inversify';
import User from '../../../Domain/Entities/User';
import CreateUsersCommand from '../../Commands/Users/CreateUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';

@injectable()
export default class CreateUsersHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface
  ) { }

  public execute(command: CreateUsersCommand): void {
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
      command.getDocumentId()
    );
    this.userRepository.persist(user);
  }
}
