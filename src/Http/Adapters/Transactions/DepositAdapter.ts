import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import DepositCommand from '../../../Application/Commands/Transactions/DepositCommand';
import { depositSchema } from "../../../Http/Validators/Schemas/Transactions/DepositSchema";

@injectable()
export default class DepositAdapter {
  constructor(
    @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
  ) {
  }

  public from(request: Request): DepositCommand {
    const body = request.payload;

    const error = this.validator.validate(body, depositSchema);

    if (error) {
        throw new Error(error.details[0].message);
    }

    return new DepositCommand(
      body['user_id'],
      body['amount'],
    );
  }
}
