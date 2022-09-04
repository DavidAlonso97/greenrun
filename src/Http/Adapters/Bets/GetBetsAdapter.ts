import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import GetBetsQuery from '../../../Application/Commands/Bets/GetBetsQuery';
import { getBetsSchema } from '../../../Http/Validators/Schemas/Bets/GetBetsSchema';

@injectable()
export default class GetBetsAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): GetBetsQuery {
    const params = request.query;
    const error = this.validator.validate(params, getBetsSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: 412,
        data: error.details[0].message
      })
    }

    return new GetBetsQuery(Object(params));
  }
}
