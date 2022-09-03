import { inject, injectable } from 'inversify';
import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import UserBet from '../../../Domain/Entities/UserBet';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import PlaceBetsCommand from '../../Commands/Bets/PlaceBetsCommand';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';

@injectable()
export default class PlaceBetsHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
    @inject(INTERFACES.UserBetRepositoryInterface) private userBetRepository: UserBetRepositoryInterface,
    @inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface,
    @inject(TransactionService) private transactionService: TransactionService
  ) { }

  public async execute(command: PlaceBetsCommand): Promise<void> {
    var user = await this.userRepository.findOneById(command.getUserId());
    const bets = command.getBets();
    for (let betIndex = 0; betIndex < bets.length; betIndex++) {
      const bet = await this.betRepository.findOneById(bets[betIndex].betId);
      if (!bet || bet.status !== 'active') {//todo status enums
        continue;
      }
      let userBet = new UserBet(
        user.getId(),
        bets[betIndex].betId,
        bet.odd,
        bets[betIndex].amount,
        'open',//todo status enums
      );
      const userBetId = await this.userBetRepository.persist(userBet);
      this.transactionService.generateTransaction(
        user.getId(),
        bets[betIndex].amount,
        'bet',//todo status enums
        'completed',//todo status enums
        userBetId
      );
    }
  }
}
