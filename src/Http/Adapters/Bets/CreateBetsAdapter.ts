import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import CreateBetsCommand from '../../../Application/Commands/Bets/CreateBetsCommand';
import { createBetsSchema } from "../../Validators/Schemas/Bets/CreateBetsSchema";

@injectable()
export default class CreateBetsAdapter {
    constructor(
        @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
    ) {
    }

    public from(request: Request): CreateBetsCommand {
        const body = request.payload;
        const error = this.validator.validate(body, createBetsSchema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        return new CreateBetsCommand(
            body.bet_option,
            body.sport,
            body.name,
            body.event_id,
            body.odd
        );
    }
}
