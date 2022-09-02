import { inject, injectable } from 'inversify';
import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import User from '../../../Domain/Entities/User';
import Transaction from '../../../Domain/Entities/Transaction';

@injectable()
export default class TransactionService {

    constructor(
        @inject(INTERFACES.TransactionRepositoryInterface) private transactionRepository: TransactionRepositoryInterface,
    ) {
    }

    public generateTransaction(
        user: User,
        amount: number,
        category: string,
        status: string,
        user_bet_id?: number|null,
    ): void {
        this.transactionRepository.persist(
            new Transaction(
                user.getId(),
                amount,
                category,
                status,
                user_bet_id
            )
        )
    }
}
