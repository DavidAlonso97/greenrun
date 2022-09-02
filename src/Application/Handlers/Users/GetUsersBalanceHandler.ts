import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import GetUsersBalanceQuery from '../../Commands/Users/GetUsersBalanceQuery';
import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';

@injectable()
export default class GetUsersBalanceHandler {
    public constructor(
        @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
        @inject(INTERFACES.TransactionRepositoryInterface) private transactionRepository: TransactionRepositoryInterface,
        @inject(INTERFACES.UserBetRepositoryInterface) private userBetRepository: UserBetRepositoryInterface
    ) { }

    public async execute(command: GetUsersBalanceQuery): Promise<number> {
        var user = await this.userRepository.findOneById(command.getUserId());
        if (!user) {
            throw new Error('Entity not found');
        }
        const result = await this.transactionRepository.findBy(command.getParams());
        let balance = 0;
        for (let transactionIndex = 0; transactionIndex < result.length; transactionIndex++) {
            const transaction = result[transactionIndex];
            let transactionAmount = transaction.amount;
            if(transaction.status !== 'completed') {
                continue;
            }
            if (transaction.category === 'withdraw') {
                balance -= transactionAmount;
                continue;
            }
            if (transaction.category === 'bet') {
                const userBet = await this.userBetRepository.findOneById(transaction.user_bet_id);
                if (userBet.state === 'won') {
                    balance += (userBet.odd * transactionAmount);
                } else {
                    balance -= transactionAmount;
                }
                continue;
            }
            if (transaction.category === 'deposit' || transaction.category === 'winning') {
                balance += transactionAmount;
            }
        }

        return balance;
    }
}
