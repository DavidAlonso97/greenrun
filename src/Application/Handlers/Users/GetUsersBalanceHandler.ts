import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import GetUsersBalanceQuery from '../../Commands/Users/GetUsersBalanceQuery';
import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import Transaction from '../../../Domain/Entities/Transaction';

@injectable()
export default class GetUsersBalanceHandler {
    public constructor(
        @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
        @inject(INTERFACES.TransactionRepositoryInterface) private transactionRepository: TransactionRepositoryInterface
    ) { }

    public async execute(command: GetUsersBalanceQuery): Promise<Transaction[]> {
        var user = await this.userRepository.findOneById(command.getUserId());
        if (!user) {
            throw new Error('Entity not found');
        }
        return await this.transactionRepository.findBy(command.getParams());
    }
}
