import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
import UpdateBetsCommand from '../../../Application/Commands/Bets/UpdateBetsCommand';
import UpdateBetsAdapter from '../../Adapters/Bets/UpdateBetsAdapter';
import UpdateBetsHandler from '../../../Application/Handlers/Bets/UpdateBetsHandler';

@injectable()
export default class UpdateBetsAction {
  public constructor(
    @inject(UpdateBetsAdapter) private adapter: UpdateBetsAdapter,
    @inject(UpdateBetsHandler) private handler: UpdateBetsHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const command: UpdateBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  }
}
