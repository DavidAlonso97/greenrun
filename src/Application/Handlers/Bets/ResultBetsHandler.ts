import { inject, injectable } from 'inversify';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import ResultBetsCommand from '../../Commands/Bets/ResultBetsCommand';
import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';
import { BET_STATUSES } from '../../../Domain/Interfaces/BetStatus';
import { TRANSACCIONS_CATEGORIES } from '../../../Domain/Interfaces/TransactionCategories';
import { TRANSACCIONS_STATUSES } from '../../../Domain/Interfaces/TransactionStatus';

@injectable()
export default class ResultBetHandler {
  public constructor(
    @inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface,
    @inject(INTERFACES.UserBetRepositoryInterface) private userBetRepository: UserBetRepositoryInterface,
    @inject(TransactionService) private transactionService: TransactionService
  ) { }

  public async execute(command: ResultBetsCommand): Promise<void> {
    let bet = await this.betRepository.findOneById(command.getId());
    if (bet.status !== BET_STATUSES.ACTIVE){
      throw new Error('Status is not active');
    }
    bet.status = BET_STATUSES.SETTLED;
    bet.result = command.getResult();
    await this.betRepository.update(bet);

    const userBets = await this.userBetRepository.findBy({bet_id:1});
    for (let userBetIndex = 0; userBetIndex < userBets.length; userBetIndex++) {
      this.transactionService.generateTransaction(
        userBets[userBetIndex].user_id,
        userBets[userBetIndex].amount,
        TRANSACCIONS_CATEGORIES.BET,
        TRANSACCIONS_STATUSES.COMPLETED,
        userBets[userBetIndex].id
      );
    }
  }
}
