import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
import CreateBetsCommand from '../../../Application/Commands/Bets/CreateBetsCommand';
import CreateBetsAdapter from '../../Adapters/Bets/CreateBetsAdapter';
import CreateBetsHandler from '../../../Application/Handlers/Bets/CreateBetsHandler';

@injectable()
export default class CreateBetsAction {
  public constructor(
    @inject(CreateBetsAdapter) private adapter: CreateBetsAdapter,
    @inject(CreateBetsHandler) private handler: CreateBetsHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const command: CreateBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  }
}
