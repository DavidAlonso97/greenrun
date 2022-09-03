import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import { updateUsersSchema } from "../../../Http/Validators/Schemas/Users/UpdateUsersSchema";
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import UpdateUsersCommand from '../../../Application/Commands/Users/UpdateUsersCommand';

@injectable()
export default class UpdateUsersAdapter {
    constructor(
        @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
      ) {
      }

    public from(request: Request): UpdateUsersCommand {
        const body = request.payload;
        const params = request.params;

        const error = this.validator.validate({
            body: body,
            params: params,
        }, updateUsersSchema);
        
        if (error) {
            throw new Error(error.details[0].message);
        }

        return new UpdateUsersCommand(
            params.id,
            body.role,
            body.first_name,
            body.last_name,
            body.phone,
            body.email,
            body.username,
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
