import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import CreateBetsCommand from '../../../Application/Commands/Bets/CreateBetsCommand';

@injectable()
export default class CreateBetsAdapter {
    public from(request: Request): CreateBetsCommand {
        const payload = request.payload;
        return new CreateBetsCommand(
            payload.bet_option,
            payload.sport,
            payload.status,
            payload.name,
            payload.event_id,
            payload.odd,
            payload.result,
        );
    }
}
