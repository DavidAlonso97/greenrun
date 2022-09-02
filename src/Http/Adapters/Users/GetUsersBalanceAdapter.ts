import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import GetUsersBalanceQuery from '../../../Application/Commands/Users/GetUsersBalanceQuery';
@injectable()
export default class GetUsersBalanceAdapter {
  public from(request: Request): GetUsersBalanceQuery {
    const params = request.query;
    return new GetUsersBalanceQuery(
        params.user_id
    );
  }
}
