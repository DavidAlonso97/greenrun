import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
import GetUsersHandler from '../../../Application/Handlers/Users/GetUsersHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class GetUsersAction {
  public readonly ROUTE_PATH = '/users';
  public constructor(
    @inject(GetUsersHandler) private handler: GetUsersHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    if (request.current_user.role !== USER_ROLES.ADMIN) {
      throw new Error('Unauthorized user');
    }
    const result = await this.handler.execute();
    return h.response(result).code(HTTP_CODES.OK);
  }
}
