import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import UpdateBetsCommand from '../../../Application/Commands/Bets/UpdateBetsCommand';

@injectable()
export default class UpdateBetsAdapter {
    public from(request: Request): UpdateBetsCommand {
        const params = request.params;
        const payload = request.payload;
        return new UpdateBetsCommand(
            params.id,
            payload.status,
            payload.odd
        );
    }
}
