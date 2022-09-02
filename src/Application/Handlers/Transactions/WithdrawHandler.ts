import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import DepositCommand from '../../Commands/Transactions/DepositCommand';

@injectable()
export default class WithdrawHandler {
    public constructor(
        @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
        @inject(TransactionService) private transactionService: TransactionService
    ) { }

    public async execute(command: DepositCommand): Promise<void> {
        var user = await this.userRepository.findOneById(command.getUserId());
        if (!user) {
            throw new Error('Entity not found');
        }
        this.transactionService.generateTransaction(
            user,
            command.getAmount(),
            'withdraw',//todo status enums
            'completed',//todo status enums
        );

    }
}
