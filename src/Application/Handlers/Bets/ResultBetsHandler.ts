import { inject, injectable } from 'inversify';
import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import ResultBetsCommand from '../../Commands/Bets/ResultBetsCommand';
import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import Transaction from '../../../Domain/Entities/Transaction';

@injectable()
export default class ResultBetHandler {
  public constructor(
    @inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface,
    @inject(INTERFACES.TransactionRepositoryInterface) private transactionRepository: TransactionRepositoryInterface,
    @inject(INTERFACES.UserBetRepositoryInterface) private userBetRepository: UserBetRepositoryInterface
  ) { }

  public async execute(command: ResultBetsCommand): Promise<void> {
    let bet = await this.betRepository.findOneById(command.getId());
    if (bet.status !== 'active'){
      throw new Error('Status is not active');
    }
    bet.status = 'finished';
    bet.result = command.getResult();
    await this.betRepository.update(bet);

    const userBets = await this.userBetRepository.findBy({bet_id:1});
    for (let userBetIndex = 0; userBetIndex < userBets.length; userBetIndex++) {
      const transaction = new Transaction(
        userBets[userBetIndex].user_id,
        userBets[userBetIndex].amount,
        'bet',
        'completed',
        userBets[userBetIndex].id
      );
      this.transactionRepository.persist(transaction);
    }
  }
}
