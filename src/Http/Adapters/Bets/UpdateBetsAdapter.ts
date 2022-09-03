import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import UpdateBetsCommand from '../../../Application/Commands/Bets/UpdateBetsCommand';
import { updateBetsSchema } from "../../../Http/Validators/Schemas/Bets/UpdateBetsSchema";

@injectable()
export default class UpdateBetsAdapter {
    constructor(
        @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
    ) {
    }

    public from(request: Request): UpdateBetsCommand {
        const params = request.params;
        const body = request.payload;

        const error = this.validator.validate({
            body: body,
            params: params,
        }, updateBetsSchema);
        
        if (error) {
            throw new Error(error.details[0].message);
        }

        return new UpdateBetsCommand(
            params.id,
            body.status,
            body.odd
        );
    }
}
