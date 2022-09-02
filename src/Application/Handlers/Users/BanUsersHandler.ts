import { inject, injectable } from 'inversify';
import BanUsersCommand from '../../Commands/Users/BanUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';

@injectable()
export default class UpdateUsersHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface
  ) { }

  public async execute(command: BanUsersCommand): Promise<void> {
    var user = await this.userRepository.findOneById(command.getId());
    user.setUserState('blocked');//todo states
    this.userRepository.update(user);
  }
}
