import { inject, injectable } from 'inversify';
import BanUsersCommand from '../../Commands/Users/BanUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import { USER_STATUSES } from '../../../Domain/Interfaces/UserStatus';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class UpdateUsersHandler {
  public constructor(@inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface) {}

  public async execute(command: BanUsersCommand): Promise<void> {
    var user = await this.userRepository.findOneByIdOrFail(command.getId());
    if (user.role === USER_ROLES.ADMIN) {
      throw new Error('Admins do not have permissions to ban others admins');
    }
    user.setUserState(USER_STATUSES.BLOCKED);
    this.userRepository.update(user);
  }
}
