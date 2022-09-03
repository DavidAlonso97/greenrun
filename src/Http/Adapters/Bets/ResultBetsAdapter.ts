import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import ResultBetsCommand from '../../../Application/Commands/Bets/ResultBetsCommand';

@injectable()
export default class ResultBetsAdapter {
    public from(request: Request): ResultBetsCommand {
        const params = request.params;
        const payload = request.payload;
        return new ResultBetsCommand(
            params.id,
            payload.result
        );
    }
}
