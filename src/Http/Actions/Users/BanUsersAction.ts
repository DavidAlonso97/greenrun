import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
import BanUsersCommand from '../../../Application/Commands/Users/BanUsersCommand';
import BanUsersAdapter from '../../Adapters/Users/BanUsersAdapter';
import BanUsersHandler from '../../../Application/Handlers/Users/BanUsersHandler';

@injectable()
export default class BanUsersAction {
  public constructor(
    @inject(BanUsersAdapter) private adapter: BanUsersAdapter,
    @inject(BanUsersHandler) private handler: BanUsersHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const command: BanUsersCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  }
}
