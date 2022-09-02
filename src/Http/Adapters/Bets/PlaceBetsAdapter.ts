import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import PlaceBetsCommand from '../../../Application/Commands/Bets/PlaceBetsCommand';

@injectable()
export default class PlaceBetsAdapter {
    public from(request: Request): PlaceBetsCommand {
        const payload = request.payload;
        return new PlaceBetsCommand(payload.userId, payload.bets);
    }
}
