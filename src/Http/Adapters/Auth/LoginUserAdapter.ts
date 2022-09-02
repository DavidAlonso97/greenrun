import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import LoginUsersCommand from '../../../Application/Commands/Auth/LoginUsersCommand';

@injectable()
export default class LoginUsersAdapter {
  public from(request: Request): LoginUsersCommand {
    const body = request.payload;
    return new LoginUsersCommand(
      body.username,
      body.password,
    );
  }
}
