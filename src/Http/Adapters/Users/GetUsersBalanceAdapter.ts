import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import { getUsersSchema } from "../../../Http/Validators/Schemas/Users/GetUsersSchema";
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import GetUsersBalanceQuery from '../../../Application/Commands/Users/GetUsersBalanceQuery';
@injectable()
export default class GetUsersBalanceAdapter {
  constructor(
    @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
  ) {
  }

  public from(request: Request): GetUsersBalanceQuery {
    const params = request.query;
    const error = this.validator.validate(params, getUsersSchema);

    if (error) {
        throw new Error(error.details[0].message);
    }

    return new GetUsersBalanceQuery(
        params.user_id
    );
  }
}
