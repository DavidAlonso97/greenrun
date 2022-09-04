import { Request } from '@hapi/hapi';
import { inject, injectable } from 'inversify';
import { loginUserSchema } from '../../Validators/Schemas/Auth/LoginUserSchema';
import LoginUsersCommand from '../../../Application/Commands/Auth/LoginUsersCommand';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';

@injectable()
export default class LoginUsersAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}
  public from(request: Request): LoginUsersCommand {
    const body = request.payload;
    const error = this.validator.validate(body, loginUserSchema);

    if (error) {
      throw new Error(error.details[0].message);
    }

    return new LoginUsersCommand(body['username'], body['password']);
  }
}
