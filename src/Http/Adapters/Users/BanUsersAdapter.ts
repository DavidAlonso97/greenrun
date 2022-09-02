import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import BanUsersCommand from '../../../Application/Commands/Users/BanUsersCommand';

@injectable()
export default class BanUsersAdapter {
  public from(request: Request): BanUsersCommand {
    const id = request.params.id;
    return new BanUsersCommand(id);
  }
}
