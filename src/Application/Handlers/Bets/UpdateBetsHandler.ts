import { inject, injectable } from 'inversify';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import UpdateBetsCommand from '../../Commands/Bets/UpdateBetsCommand';

@injectable()
export default class UpdateBetsHandler {
  public constructor(
    @inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface
  ) { }

  public async execute(command: UpdateBetsCommand): Promise<void> {
    let bet = await this.betRepository.findOneById(command.getId());
    bet.status = command.getStatus();
    bet.odd = command.getOdd();
    bet.result = command.getResult();
    this.betRepository.update(bet);
  }
}
