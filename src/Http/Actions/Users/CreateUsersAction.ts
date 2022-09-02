import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
import CreateUsersCommand from '../../../Application/Commands/Users/CreateUsersCommand';
import CreateUsersAdapter from '../../Adapters/Users/CreateUsersAdapter';
import CreateUsersHandler from '../../../Application/Handlers/Users/CreateUsersHandler';

@injectable()
export default class CreateUsersAction {
  public constructor(
    @inject(CreateUsersAdapter) private adapter: CreateUsersAdapter,
    @inject(CreateUsersHandler) private handler: CreateUsersHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const command: CreateUsersCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.CREATED);
  }
}
