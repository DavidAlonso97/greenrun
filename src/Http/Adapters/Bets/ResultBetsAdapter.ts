import { Request } from "@hapi/hapi";
import { inject, injectable } from 'inversify';
import ValidatorInterface from "../../../Http/Validators/ValidatorInterface";
import { INTERFACES } from "../../../Infrastructure/DI/Interfaces.types";
import ResultBetsCommand from '../../../Application/Commands/Bets/ResultBetsCommand';
import { resultBetsSchema } from "../../../Http/Validators/Schemas/Bets/ResultBetsSchema";

@injectable()
export default class ResultBetsAdapter {
    constructor(
        @inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface
    ) {
    }

    public from(request: Request): ResultBetsCommand {
        const params = request.params;
        const body = request.payload;

        const error = this.validator.validate({
            body: body,
            params: params,
        }, resultBetsSchema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        return new ResultBetsCommand(
            params.id,
            body.result
        );
    }
}
