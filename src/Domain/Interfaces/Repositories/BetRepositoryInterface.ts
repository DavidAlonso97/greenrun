import BetParamsInterface from '../../../Application/Commands/Interfaces/BetParamsInterface';
import Bet from '../../Entities/Bet';

export default interface BetRepositoryInterface {
  findAll(): Promise<Bet[]>;
  findOneById(id: number): Promise<Bet>;
  findBy(params: BetParamsInterface): Promise<Bet[]>;
  persist(bet: Bet): Promise<number>;
  update(bet: Bet): Promise<void>;
  delete(bet: Bet): Promise<boolean>;
}