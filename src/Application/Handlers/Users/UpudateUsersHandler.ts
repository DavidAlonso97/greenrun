import { inject, injectable } from 'inversify';
import UpdateUsersCommand from '../../Commands/Users/UpdateUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';

@injectable()
export default class UpdateUsersHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface
  ) { }

  public async execute(command: UpdateUsersCommand): Promise<void> {
    var user = await this.userRepository.findOneById(command.getId());
    user.setRole(command.getRole());
    user.setFirstName(command.getFirstName());
    user.setLastName(command.getLastName());
    user.setPhone(command.getPhone());
    user.setEmail(command.getEmail());
    user.setUsername(command.getUsername());
    user.setAddress(command.getAddress());
    user.setGender(command.getGender());
    user.setBirthDate(command.getBirthDate());
    user.setCountryId(command.getCountryId());
    user.setCity(command.getCity());
    user.setCategory(command.getCategory());
    user.setDocumentId(command.getDocumentId());

    this.userRepository.update(user);
  }
}
