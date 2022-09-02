import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import WithdrawCommand from '../../../Application/Commands/Transactions/WithdrawCommand';

@injectable()
export default class WithdrawAdapter {
  public from(request: Request): WithdrawCommand {
    const body = request.payload;
    return new WithdrawCommand(
        body.user_id,
        body.amount,
    );
  }
}
