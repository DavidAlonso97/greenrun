import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import GetTransactionQuery from '../../../Application/Commands/Transactions/GetTransactionQuery';
import { getTransactionSchema } from '../../../Http/Validators/Schemas/Transactions/GetTransactionSchema';

@injectable()
export default class GetTransactionAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): GetTransactionQuery {
    const params = request.query;

    const error = this.validator.validate(params, getTransactionSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: 412,
        data: error.details[0].message,
      });
    }

    return new GetTransactionQuery(params['user_id'], params['category']);
  }
}
