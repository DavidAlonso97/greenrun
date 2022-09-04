import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import PlaceBetsCommand from '../../../Application/Commands/Bets/PlaceBetsCommand';
import { placeBetsSchema } from '../../../Http/Validators/Schemas/Bets/PlaceBetsAdapter';

@injectable()
export default class PlaceBetsAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): PlaceBetsCommand {
    const body = request.payload;
    const error = this.validator.validate(body, placeBetsSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: 412,
        data: error.details[0].message,
      });
    }

    return new PlaceBetsCommand(body['userId'], body['bets']);
  }
}
