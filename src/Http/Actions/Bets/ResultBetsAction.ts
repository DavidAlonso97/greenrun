import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject} from "@hapi/hapi";
import ResultBetsCommand from '../../../Application/Commands/Bets/ResultBetsCommand';
import ResultBetsAdapter from '../../Adapters/Bets/ResultBetsAdapter';
import ResultBetsHandler from '../../../Application/Handlers/Bets/ResultBetsHandler';

@injectable()
export default class ResultBetsAction {
  public constructor(
    @inject(ResultBetsAdapter) private adapter: ResultBetsAdapter,
    @inject(ResultBetsHandler) private handler: ResultBetsHandler,
  ) {}

  public execute = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const command: ResultBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  }
}
