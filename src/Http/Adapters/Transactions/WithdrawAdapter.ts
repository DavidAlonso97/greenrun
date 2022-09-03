import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import WithdrawCommand from '../../../Application/Commands/Transactions/WithdrawCommand';
import { withdrawSchema } from "../../../Http/Validators/Schemas/Transactions/WithdrawSchema";

@injectable()
export default class WithdrawAdapter {
  constructor(
    @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
  ) {
  }

  public from(request: Request): WithdrawCommand {
    const body = request.payload;

    const error = this.validator.validate(body, withdrawSchema);

    if (error) {
        throw new Error(error.details[0].message);
    }
    
    return new WithdrawCommand(
        body.user_id,
        body.amount,
    );
  }
}
