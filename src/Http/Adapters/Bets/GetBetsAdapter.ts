import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import GetBetsQuery from '../../../Application/Commands/Bets/GetBetsQuery';

@injectable()
export default class GetBetsAdapter {
    public from(request: Request): GetBetsQuery {
        const params = request.query;
        return new GetBetsQuery(params);
    }
}
