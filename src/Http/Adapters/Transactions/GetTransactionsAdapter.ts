import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import GetTransactionQuery from '../../../Application/Commands/Transactions/GetTransactionQuery';

@injectable()
export default class GetTransactionAdapter {
  public from(request: Request): GetTransactionQuery {
    const params = request.query;
    return new GetTransactionQuery(
      params.user_id,
      params.category,
    );
  }
}
