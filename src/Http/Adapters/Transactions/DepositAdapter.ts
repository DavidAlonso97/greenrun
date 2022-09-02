import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import DepositCommand from '../../../Application/Commands/Transactions/DepositCommand';

@injectable()
export default class DepositAdapter {
  public from(request: Request): DepositCommand {
    const body = request.payload;
    return new DepositCommand(
        body.user_id,
        body.amount,
    );
  }
}
