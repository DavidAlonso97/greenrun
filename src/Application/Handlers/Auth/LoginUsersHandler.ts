import { inject, injectable } from 'inversify';
import LoginUsersCommand from '../../Commands/Auth/LoginUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import bcrypt from 'bcrypt';
import User from '../../../Domain/Entities/User';

@injectable()
export default class LoginUsersHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface
  ) { }

  public async execute(command: LoginUsersCommand): Promise<User|null> {
    let user = await this.userRepository.findOneByUsername(command.getUsername());
    
    if (!user) {
      throw new Error('User not found');
    }

    return bcrypt.compare(command.getPassword(), user.getPassword()) ? user : null;
  }
}
