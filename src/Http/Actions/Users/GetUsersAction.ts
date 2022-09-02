import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
// import CreateUserCommand from '../../../Application/Commands/Users/CreateUserCommand';
// import CreateUserAdapter from '../../../Http/Adapters/Users/CreateUserAdapter';
import GetUsersHandler from '../../../Application/Handlers/Users/GetUsersHandler';

@injectable()
export default class getUsersAction {
  public constructor(
    // @inject(CreateUserAdapter) private adapter: CreateUserAdapter,
    @inject(GetUsersHandler) private handler: GetUsersHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    // const command: CreateUserCommand = this.adapter.from(request.body);
    console.log(request.body);
    const result = await this.handler.execute();//todo should pass throw presenter
    return h.response(result).code(HTTP_CODES.OK);
  }
}
