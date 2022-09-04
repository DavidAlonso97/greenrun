import * as jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/Interfaces.types';
import { RedisConnectionInterface } from '../../Infrastructure/Persistence/RedisConnectionInterface';
import UserRepositoryInterface from '../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { Request } from "@hapi/hapi";
import { AuthMiddlewareInterface } from './AuthMiddlewareInterface';

@injectable()
export default class AuthMiddleware implements AuthMiddlewareInterface {

    constructor(
        @inject(INTERFACES.RedisConnectionInterface) private redisConection: RedisConnectionInterface,
        @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface
    ) {
    }

    public async check(request: Request): Promise<Request> {
        const token = request.headers.authorization;
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            throw new Error('Unauthorized');
        }
        const user_id = await this.redisConection.getConnection().get(token);
        const user = await this.userRepository.findOneByIdOrFail(Number(user_id));
        request['current_user'] = user;
        return request;
    }
}
