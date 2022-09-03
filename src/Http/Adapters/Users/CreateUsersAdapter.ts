import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import CreateUsersCommand from '../../../Application/Commands/Users/CreateUsersCommand';
import bcrypt from 'bcrypt';
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { createUsersSchema } from "../../../Http/Validators/Schemas/Users/CreateUsersSchema";

@injectable()
export default class CreateUsersAdapter {
  constructor(
    @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
  ) {
  }

  public from(request: Request): CreateUsersCommand {
    const body = request.payload;
    const error = this.validator.validate(body, createUsersSchema);

    if (error) {
        throw new Error(error.details[0].message);
    }
    return new CreateUsersCommand(
      body.role,
      body.first_name,
      body.last_name,
      body.phone,
      body.email,
      body.username,
      bcrypt.hashSync(body.password, 8),//todo defaultSaltRounds
      body.address,
      body.gender,
      body.birth_date,
      body.country_id,
      body.city,
      body.category,
      body.document_id,
      body.user_state
    );
  }
}
