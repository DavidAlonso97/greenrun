import { Request } from "@hapi/hapi";
import { injectable } from 'inversify';
import UpdateUsersCommand from '../../../Application/Commands/Users/UpdateUsersCommand';

@injectable()
export default class UpdateUsersAdapter {
    public from(request: Request): UpdateUsersCommand {
        const body = request.payload;
        const id = request.params.id;
        return new UpdateUsersCommand(
            id,
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
