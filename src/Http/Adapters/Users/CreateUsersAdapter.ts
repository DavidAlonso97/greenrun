import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import CreateUsersCommand from '../../../Application/Commands/Users/CreateUsersCommand';
import bcrypt from 'bcrypt';

@injectable()
export default class CreateUsersAdapter {
  public from(request: Request): CreateUsersCommand {
    const body = request.payload;
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
