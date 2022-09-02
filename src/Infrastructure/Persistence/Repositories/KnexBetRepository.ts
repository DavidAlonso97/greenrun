import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { injectable } from 'inversify';
import databaseConnection from '../DatabaseConnection';
import Bet from '../../../Domain/Entities/Bet';
import BetParamsInterface from '../../../Application/Commands/Interfaces/BetParamsInterface';

@injectable()
export default class KnexBetRepository implements BetRepositoryInterface {
  private repository(): any {
    return databaseConnection<Bet>('bets');
  };

  public async findAll(): Promise<Bet[]> {
    return await this.repository();
  }

  public async findOneById(id: number): Promise<Bet> {
    return await this.repository().where('id', id).first();
  }

  public async findBy(params: BetParamsInterface): Promise<Bet[]> {
    let whereClause = {};
    if (params.event_id) {
      whereClause['event_id'] = params.event_id;
    }
    if (params.sport) {
      whereClause['sport'] = params.sport;
    }
    return await this.repository().where(whereClause);
  }

  public async persist(bet: Bet): Promise<number> {
    return await this.repository().insert(bet);
  }

  public async update(bet: Bet): Promise<void> {
    await this.repository().where('id', bet.id).update(bet);
  }

  public async delete(bet: Bet): Promise<boolean> {
    const result = await this.repository().where('id', bet.getId())
    .update({
      deleted: true,
      deleted_at: new Date()
    })

    return result && result.affected === 1;
  }
}